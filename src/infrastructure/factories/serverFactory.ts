import {NotionPostRepository} from "@/infrastructure/repositories/server/notionPostRepository";
import {InMemoryPostRepository, PostRepository, SubscriberRepository} from "@/core/repositories";
import {MailerLiteSubscriberRepository} from "@/infrastructure/repositories/server/mailerLiteSubscriberRepository";
import {NewsletterService} from "@/application/newsletterService";
import {BlogService} from "@/application/blogService";
import {FilePostRepository} from "@/infrastructure/repositories/server/filePostRepository/filePostRepository";
import {legacyPosts} from "@/infrastructure/repositories/server/filePostRepository/legacyPostDatasource";

export class ServerFactory {
    private static postRepository: PostRepository;
    private static legacyPostRepository: PostRepository;

    static getPostRepository(): PostRepository {
        if(this.postRepository== null){
            const apiKey = process.env.NOTION_API_KEY as string;
            const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
            this.postRepository = NotionPostRepository.create(apiKey, databaseId);
        }
        return this.postRepository;
    }

    static getLegacyPostRepository(): PostRepository {
        if(this.legacyPostRepository== null){
            this.legacyPostRepository = new FilePostRepository(legacyPosts);
        }
        return this.legacyPostRepository;
    }

    static getInMemoryPostRepository(): PostRepository {
        if(this.postRepository== null){
            this.postRepository = new InMemoryPostRepository([]);
        }
        return this.postRepository;
    }

    static createSubscriberRepository(): SubscriberRepository {
        const apiKey = process.env.MAILER_LITE_API_KEY as string;
        const groupId = process.env.MAILER_LITE_GROUP_ID as string;
        return new MailerLiteSubscriberRepository(apiKey, groupId)
    }

    static createBlogServiceWithLegacyPosts(): BlogService {
        return new BlogService(this.getPostRepository(), this.getLegacyPostRepository());
    }

    static createNewsletterService(): NewsletterService {
        return new NewsletterService(this.createSubscriberRepository());
    }
}
