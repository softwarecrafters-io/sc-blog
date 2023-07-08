import { Post, SummarizedPost} from "../../core/models";
import {PostRepository} from "../../core/repositories";
import {Observable} from "rxjs";
import {HttpRequester} from "@/repositories/client/httpRequester";

export class HttpPostRepository implements PostRepository{
    constructor(private requester: HttpRequester, private baseUri: string, private cacheInSeconds = 60) {}

    postBy(slug: string): Observable<Post | undefined> {
        const url = `${this.baseUri}/posts/${slug}`;
        return this.requester.get<Post>(url, this.cacheInSeconds);
    }

    summarizedPosts(): Observable<SummarizedPost[]> {
        const url = `${this.baseUri}/posts`;
        return this.requester.get<SummarizedPost[]>(url, this.cacheInSeconds)
    }

    summarizedPostsByTag(tag: string): Observable<SummarizedPost[]> {
        const url = `${this.baseUri}/posts?tag=${encodeURIComponent(tag)}`;
        return this.requester.get<SummarizedPost[]>(url, this.cacheInSeconds)
    }

    summarizedPostsByUser(username: string): Observable<SummarizedPost[]> {
        const url = `${this.baseUri}/posts?username=${encodeURIComponent(username)}`;
        return this.requester.get<SummarizedPost[]>(url, this.cacheInSeconds)
    }
}

