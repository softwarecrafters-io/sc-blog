import {map, Observable, of} from "rxjs";
import {Subscriber, Post, SummarizedPost, fromPostToSummary, Pagination, PostsWithPagination} from "./models";
import {PaginationService} from "./services";

export interface PostRepository{
    summarizedPosts(): Observable<SummarizedPost[]>;
    postBy(slug: string): Observable<Post | undefined>;
    summarizedPostsByTag(tag: string): Observable<SummarizedPost[]>;
    summarizedPostsByUser(username: string): Observable<SummarizedPost[]>;
}

export interface PostRepositoryWithPagination{
    summarizedPosts(currentPage:number): Observable<PostsWithPagination>;
    postBy(slug: string): Observable<Post | undefined>;
    summarizedPostsByTag(tag: string): Observable<SummarizedPost[]>;
    summarizedPostsByUser(username: string): Observable<SummarizedPost[]>;
}

export interface SubscriberRepository{
    getNumberOfSubscribers(): Observable<number>;
    addSubscriber(email: string): Observable<Subscriber>;
}

export class InMemoryPostRepository implements PostRepository {
    constructor(private posts: Post[]) {}

    summarizedPosts(): Observable<SummarizedPost[]> {
        return of(this.posts.map(post => fromPostToSummary(post)));
    }

    postBy(slug: string): Observable<Post | undefined> {
        return of(this.posts.find(post => post.slug === slug));
    }

    summarizedPostsByTag(tag: string): Observable<SummarizedPost[]> {
        return of(this.posts.filter(post => post.tags.includes(tag)).map(post => fromPostToSummary(post)));
    }

    summarizedPostsByUser(username: string): Observable<SummarizedPost[]> {
        return of(this.posts.filter(post => post.username === username).map(post => fromPostToSummary(post)));
    }
}

export class InMemoryPaginatedPostRepository implements PostRepositoryWithPagination {
    constructor(private posts: Post[]) {}

    summarizedPosts(currentPage:number): Observable<PostsWithPagination> {
        return of(this.posts.map(post => fromPostToSummary(post))).pipe(
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

    postBy(slug: string): Observable<Post | undefined> {
        return of(this.posts.find(post => post.slug === slug));
    }

    summarizedPostsByTag(tag: string): Observable<SummarizedPost[]> {
        return of(this.posts.filter(post => post.tags.includes(tag)).map(post => fromPostToSummary(post)));
    }

    summarizedPostsByUser(username: string): Observable<SummarizedPost[]> {
        return of(this.posts.filter(post => post.username === username).map(post => fromPostToSummary(post)));
    }
}
