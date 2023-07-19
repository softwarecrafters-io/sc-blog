import {PostRepository} from "../core/repositories";
import {Post, PostsWithPagination, SummarizedPost} from "../core/models";
import {map, Observable, zip, mergeMap, of} from "rxjs";
import {PaginationService} from "../core/services";

export class BlogService {
    constructor(private postRepository: PostRepository, private legacyPostRepository: PostRepository) {}

    previousPostBySlug(post: Post): Observable<SummarizedPost | undefined> {
        return this.summarizedPosts().pipe(
            map((posts: SummarizedPost[]) => {
                const currentIndex = posts.findIndex(p => p.slug === post.slug);
                let isFirstPost = currentIndex <= 0;
                return isFirstPost ? undefined : posts[currentIndex - 1];
            })
        );
    }

    nextPostBySlug(post: Post): Observable<SummarizedPost | undefined> {
        return this.summarizedPosts().pipe(
            map((posts: SummarizedPost[]) => {
                const currentIndex = posts.findIndex(p => p.slug === post.slug);
                const isLastPost = !(currentIndex >= 0 && currentIndex < posts.length - 1);
                return isLastPost ? undefined : posts[currentIndex + 1];
            })
        );
    }

    summarizedPaginatedPosts(currentPage: number):Observable<PostsWithPagination> {
        return this.summarizedPosts().pipe(
            map(posts => {
                const paginationService = new PaginationService(posts);
                const paginatedPosts = paginationService.paginatePosts(currentPage);

                const totalPages = paginationService.calculateTotalPages();
                return{
                    posts: paginatedPosts,
                    pagination: {
                        currentPage,
                        totalPages,
                    }
                }
            })
        );
    }

    summarizedPosts():Observable<SummarizedPost[]> {
        return zip(
            this.postRepository.summarizedPosts(),
            this.legacyPostRepository.summarizedPosts()).pipe(
            map(([posts, legacyPosts]) => [...posts, ...legacyPosts])
        );
    }

    postBy(slug: string) {
        return zip(
            this.postRepository.postBy(slug),
            this.legacyPostRepository.postBy(slug)).pipe(
            map(([post, legacyPost]) => post ?? legacyPost)
        );
    }

    allSummarizedPostsByCategory(category: string) {
        return this.categoryExists(category).pipe(
            mergeMap((exists: boolean) => exists ? this.summarizedPosts() : of([])),
            map((posts: SummarizedPost[]) => posts.filter(post => post.category.toLowerCase() === category.toLowerCase()))
        );
    }

    categoryExists(category: string) {
        return this.categories().pipe(
            map(categories => categories.includes(category.toLowerCase()))
        );
    }

    summarizedPostsByTag(tag: string) {
        return zip(
            this.postRepository.summarizedPostsByTag(tag),
            this.legacyPostRepository.summarizedPostsByTag(tag)).pipe(
            map(([posts, legacyPosts]) => [...posts, ...legacyPosts])
        );
    }

    summarizedPostsByUser(username: string) {
        return zip(
            this.postRepository.summarizedPostsByUser(username),
            this.legacyPostRepository.summarizedPostsByUser(username)).pipe(
            map(([posts, legacyPosts]) => [...posts, ...legacyPosts])
        );
    }

    categories(){
        return this.summarizedPosts().pipe(
            map(posts => posts.map(post => post.category.toLowerCase())),
            map(categories => [...new Set(categories)])
        );
    }

    tags(){
        return zip(
            this.postRepository.summarizedPosts(),
            this.legacyPostRepository.summarizedPosts()).pipe(
            map(([posts, legacyPosts]) => [...posts, ...legacyPosts]),
            map(posts => posts.map(post => post.tags).flat()),
            map(tags => [...new Set(tags)])
        )
    }

    users(){
        return zip(
            this.postRepository.summarizedPosts(),
            this.legacyPostRepository.summarizedPosts()).pipe(
            map(([posts, legacyPosts]) => [...posts, ...legacyPosts]),
            map(posts => posts.map(post => post.username)),
            map(users => [...new Set(users)])
        )
    }
}
