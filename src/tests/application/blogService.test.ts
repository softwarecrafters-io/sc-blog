import {BlogService} from "../../application/blogService";
import {InMemoryPostRepository} from "../../core/repositories";
import {Post, SummarizedPost} from "../../core/models";

describe('The Blog Service', () => {
    let service: BlogService;
    let postRepository: InMemoryPostRepository;
    let legacyPostRepository: InMemoryPostRepository;

    beforeEach(() => {
        postRepository = new InMemoryPostRepository(testPosts);
        legacyPostRepository = new InMemoryPostRepository(testLegacyPosts);
        service = new BlogService(postRepository, legacyPostRepository);
    });

    it('should return all posts', async () => {
        const posts = (await service.summarizedPosts().toPromise()) as SummarizedPost[] ;
        expect(posts.length).toBe(4);
    });

    it('should return post by slug', async () => {
        const post = (await service.postBy('slug1').toPromise()) as Post;
        expect(post?.title).toBe('title1');
    });

    it('should return the previous post by slug', async () => {
        const previousPost = (await service.previousPostBySlug({slug:'slug2'} as any).toPromise());
        expect(previousPost?.title).toBe('title1');
    });

    it('should return null if there is no previous post by slug', async () => {
        const previousPost = (await service.previousPostBySlug({slug:'slug1'} as any).toPromise());
        expect(previousPost).toBeUndefined();
    });

    it('should return the next post by slug', async () => {
        const nextPost = (await service.nextPostBySlug({slug:'slug1'} as any).toPromise());
        expect(nextPost?.title).toBe('title2');
    });

    it('should return null if there is no next post by slug', async () => {
        const nextPost = (await service.nextPostBySlug({slug:'slug4'} as any).toPromise());
        expect(nextPost).toBeUndefined();
    });

    it('should return all summarized posts by existing given category', async () => {
        const posts = (await service.allSummarizedPostsByCategory('category4').toPromise()) as SummarizedPost[] ;
        expect(posts.length).toBe(1);
    });

    it('should not return any summarized posts by non existing given category', async () => {
        const posts = (await service.allSummarizedPostsByCategory('non-existing-category').toPromise()) as SummarizedPost[] ;
        expect(posts.length).toBe(0);
    });

    it('should return posts by tag', async () => {
        const posts = (await service.summarizedPostsByTag('tag1').toPromise()) as SummarizedPost[];
        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe('title1');
    });

    it('should return posts by user', async () => {
        const posts = (await service.summarizedPostsByUser('username1').toPromise()) as SummarizedPost[];
        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe('title1');
    });

    it('should return all categories', async () => {
        const catetories = (await service.categories().toPromise()) as string[] ;
        expect(catetories.length).toBe(4);
        expect(catetories).toEqual(['category1', 'category2', 'category3', 'category4']);
    });
});

const testPosts: Post[] = [
    {
        id: '1',
        slug: 'slug1',
        cover: 'cover1',
        title: 'title1',
        tags: ['tag1'],
        category: 'category1',
        description: 'description1',
        date: 'date1',
        username: 'username1',
        userPicture: 'userPicture1',
        markdownBody: 'markdownBody1'
    },
    {
        id: '2',
        slug: 'slug2',
        cover: 'cover2',
        title: 'title2',
        tags: ['tag2'],
        category: 'category2',
        description: 'description2',
        date: 'date2',
        username: 'username2',
        userPicture: 'userPicture2',
        markdownBody: 'markdownBody2'
    }
];

const testLegacyPosts: Post[] = [
    {
        id: '3',
        slug: 'slug3',
        cover: 'cover3',
        title: 'title3',
        tags: ['tag3'],
        category: 'category3',
        description: 'description3',
        date: 'date3',
        username: 'username3',
        userPicture: 'userPicture3',
        markdownBody: 'markdownBody3'
    },
    {
        id: '4',
        slug: 'slug4',
        cover: 'cover4',
        title: 'title4',
        tags: ['tag4'],
        category: 'category4',
        description: 'description4',
        date: 'date4',
        username: 'username4',
        userPicture: 'userPicture4',
        markdownBody: 'markdownBody4'
    }
];
