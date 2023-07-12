import {PostRepository} from "../core/repositories";
import {fromPostToSummary} from "../core/models";
import {map} from "rxjs";
import {PaginationService} from "@/core/services";

export class BlogService{
    constructor(private postRepository: PostRepository) {}

    summarizedPosts() {
        return this.postRepository.summarizedPosts();
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
        return this.postRepository.summarizedPosts().pipe(
            map(posts => posts.map(post => post.tags).flat()),
            map(tags => [...new Set(tags)])
        )
    }

    users(){
        return this.postRepository.summarizedPosts().pipe(
            map(posts => posts.map(post => post.username).flat()),
            map(users => [...new Set(users)])
        )
    }
}
