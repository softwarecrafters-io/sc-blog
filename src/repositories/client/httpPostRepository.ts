import {Pagination, Post, PostsWithPagination, SummarizedPost} from "../../core/models";
import {PostRepository, PostRepositoryWithPagination} from "../../core/repositories";
import {Observable} from "rxjs";
import {HttpRequester} from "@/repositories/client/httpRequester";

export class HttpPostRepository implements PostRepositoryWithPagination{
    constructor(private requester: HttpRequester) {}

    postBy(slug: string): Observable<Post | undefined> {
        const url = `/api/posts/${slug}`;
        return this.requester.get<Post>(url);
    }

    summarizedPosts(page:number): Observable<PostsWithPagination> {
        const url = `/api/posts`;
        return this.requester.get<PostsWithPagination>(url, {page})
    }

    summarizedPostsByTag(tag: string): Observable<SummarizedPost[]> {
        const url = `api/posts?tag=${encodeURIComponent(tag)}`;
        return this.requester.get<SummarizedPost[]>(url)
    }

    summarizedPostsByUser(username: string): Observable<SummarizedPost[]> {
        const url = `api/posts?username=${encodeURIComponent(username)}`;
        return this.requester.get<SummarizedPost[]>(url)
    }
}

