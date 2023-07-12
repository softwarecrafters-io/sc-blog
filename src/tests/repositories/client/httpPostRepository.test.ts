import {HttpPostRepository} from "../../../repositories/client/httpPostRepository";
import {HttpRequester} from "../../../repositories/client/httpRequester";
import {fromPostToSummary, Post, SummarizedPost} from "../../../core/models";
import nock from "nock";

xdescribe('HttpPostRepository', () => {
    let repo: HttpPostRepository;
    let posts: Post[] = fakePosts()
    let summarizedPosts: SummarizedPost[] = fakeSummaryPosts();
    let baseUri: string = 'http://localhost:3000';

    beforeAll(() => {
        const requester = new HttpRequester(baseUri);
        repo = new HttpPostRepository(requester);
    });

    it('gets summarized posts', async () => {
        nock(baseUri)
            .get('/posts')
            .reply(200, summarizedPosts);

        const result = await repo.summarizedPosts().toPromise();
        expect(result).toEqual(summarizedPosts);
    });

    it('gets post by slug', async () => {
        const post: Post = posts[0];
        const slug = post.slug;
        nock(baseUri)
            .get(`/posts/${slug}`)
            .reply(200, post);

        const result = await repo.postBy(slug).toPromise();
        expect(result).toEqual(post);
    });

    it('gets summarized posts by tag', async () => {
        const tag = 'Tag2';
        const expectedSummarizedPosts = [fakeSummaryPosts()[0]];
        nock(baseUri)
            .get(`/posts?tag=${encodeURIComponent(tag)}`)
            .reply(200, expectedSummarizedPosts);

        const result = await repo.summarizedPostsByTag(tag).toPromise();
        expect(result).toEqual(expectedSummarizedPosts);
    });

    it('gets summarized posts by username', async () => {
        const username = 'Miguel Gomez';
        const expectedSummarizedPosts = [fakeSummaryPosts()[1]];
        nock(baseUri)
            .get(`/posts?username=${encodeURIComponent(username)}`)
            .reply(200, expectedSummarizedPosts);

        const result = await repo.summarizedPostsByUser(username).toPromise();
        expect(result).toEqual(expectedSummarizedPosts);
    });

    afterEach(() => {
        nock.cleanAll(); // Limpia todas las intercepciones después de cada prueba
    });
});


function fakePosts(): Post[] {
    return [
        {
            id: '1',
            slug: 'first-post',
            cover: 'image1.jpg',
            title: 'First Post',
            tags: ['Tag1', 'Tag2'],
            description: 'Description for first post',
            date: '2023-07-10',
            username: 'John Doe',
            userPicture: 'user1.jpg',
            category: 'Category 1',
            markdownBody: 'Content of the first post',
        },
        {
            id: '2',
            slug: 'second-post',
            cover: 'image2.jpg',
            title: 'Second Post',
            tags: ['Tag1', 'Tag3'],
            description: 'Description for second post',
            date: '2023-07-11',
            username: 'Miguel Gomez',
            userPicture: 'user2.jpg',
            category: 'Category 2',
            markdownBody: 'Content of the second post',
        },
    ];
}

function fakeSummaryPosts() {
    return fakePosts().map(fromPostToSummary);
}
