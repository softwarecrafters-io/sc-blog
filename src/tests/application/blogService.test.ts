import {fromPostToSummary, Post, SummarizedPost} from "../../core/models";
import {BlogService} from "../../application/blogService";
import {InMemoryPostRepository, PostRepository} from "../../core/repositories";

describe('The Blog Service', () => {
    const mockPosts: Post[] = fakePosts();
    const summarizedPost1: SummarizedPost = fakeSummaryPosts()[0];
    const summarizedPost2: SummarizedPost = fakeSummaryPosts()[1];

    const  service = new BlogService(new InMemoryPostRepository(mockPosts));


    it('should return all summarized posts', async () => {
        const expectedResult: SummarizedPost[] = [summarizedPost1, summarizedPost2];

        const result = await service.summarizedPosts().toPromise();

        expect(result).toEqual(expectedResult);
    });

    it('should return a post by slug', async () => {
        const result = await service.postBy('first-post').toPromise();

        expect(result).toEqual(mockPosts[0]);
    });

    it('should return summarized posts by tag', async () => {
        const result = await service.summarizedPostsByTag('Tag2').toPromise();

        expect(result).toEqual([summarizedPost1]);
    });

    it('should return summarized posts by username', async () => {
        const result = await service.summarizedPostsByUser('Miguel Gomez').toPromise();

        expect(result).toEqual([summarizedPost2]);
    });

    it('should return unique tags', async () => {
        const expectedResult = ['Tag1', 'Tag2', 'Tag3'];

        const result = await service.tags().toPromise();

        expect(result).toEqual(expectedResult);
    });

    it('should return unique usernames', async () => {
        const expectedResult = ['John Doe', 'Miguel Gomez'];

        const result = await service.users().toPromise();

        expect(result).toEqual(expectedResult);
    });
});

function fakePosts() {
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
            markdownBody: 'Content of the second post',
        },
    ];
}

function fakeSummaryPosts() {
    return fakePosts().map(fromPostToSummary);
}
