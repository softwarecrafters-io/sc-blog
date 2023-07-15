import {PostRepository, PostRepositoryWithPagination} from "../core/repositories";
import {fromPostToSummary, Pagination, SummarizedPost, PostsWithPagination} from "../core/models";
import {map, Observable} from "rxjs";

export class BlogService{
    constructor(private postRepository: PostRepositoryWithPagination) {}

    summarizedPosts(page:number):Observable<PostsWithPagination> {
        return this.postRepository.summarizedPosts(page);
    }

    postBy(slug: string) {
        return this.postRepository.postBy(slug);
    }

    summarizedPostsByTag(tag: string) {
        return this.postRepository.summarizedPostsByTag(tag);
    }

    summarizedPostsByUser(username: string) {
        return this.postRepository.summarizedPostsByUser(username);
    }

    tags(){
        //todo tag repository
        return this.postRepository.summarizedPosts(0).pipe(
            map(posts => posts.posts.map(post => post.tags).flat()),
            map(tags => [...new Set(tags)])
        )
    }

    users(){
        //todo user repository
        return this.postRepository.summarizedPosts(0).pipe(
            map(posts => posts.posts.map(post => post.username).flat()),
            map(users => [...new Set(users)])
        )
    }
}
