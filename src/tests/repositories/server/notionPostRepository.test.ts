import { take } from 'rxjs/operators';
import {NotionPostRepository} from "../../../infrastructure/repositories/server/notionPostRepository";
import {Post} from "@/core/models";
import {loadEnvVariables} from "../../testHelpers/envLoader";
import {delay} from "../../testHelpers/utils";

describe('NotionPostRepository Integration Test', () => {
    let notionPostRepository: NotionPostRepository;

    beforeAll(() => {
       loadEnvVariables();
    });

    beforeEach(() => {
        const apiKey = process.env.NOTION_API_KEY as string;
        const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
        notionPostRepository = NotionPostRepository.create(apiKey, databaseId);
    });

    it('getAllPosts return posts from notion', async () => {
        const allPosts = (await notionPostRepository.allPosts().toPromise()) as Post[];
        expect(allPosts.length).toBeGreaterThan(0);
    }, 20000);
});

describe('NotionPostRepository Cache Tests', () => {
    let notionPostRepository: NotionPostRepository;
    let originalNotionRequest: any;

    beforeAll(() => {
        loadEnvVariables();
    });

    beforeEach(() => {
        const apiKey = process.env.NOTION_API_KEY as string;
        const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
        notionPostRepository = NotionPostRepository.create(apiKey, databaseId, 5000);

        originalNotionRequest = (notionPostRepository as any).notionRequest;
        (notionPostRepository as any).notionRequest = jest.fn().mockImplementation(originalNotionRequest.bind(notionPostRepository));
    });

    afterEach(() => {
        (notionPostRepository as any).notionRequest = originalNotionRequest;
    });

    it('should use cache for requests within cache interval', async () => {
        let allPosts = await notionPostRepository.allPosts().toPromise() as Post[];
        expect(allPosts.length).toBeGreaterThan(0);

        expect((notionPostRepository as any).notionRequest).toHaveBeenCalledTimes(1);

        allPosts = await notionPostRepository.allPosts().toPromise() as Post[];

        expect((notionPostRepository as any).notionRequest).toHaveBeenCalledTimes(1);
    }, 20000);

    it('should not use cache for requests outside of cache interval', async () => {
        let allPosts = (await notionPostRepository.allPosts().toPromise()) as Post[];
        expect(allPosts.length).toBeGreaterThan(0);

        expect((notionPostRepository as any).notionRequest).toHaveBeenCalledTimes(1);
        await delay((notionPostRepository as any).cacheInMs + 1000);
        allPosts = await notionPostRepository.allPosts().toPromise() as Post[];

        expect((notionPostRepository as any).notionRequest).toHaveBeenCalledTimes(2);
    }, 40000);
});
