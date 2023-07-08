import {PostRepository} from "../core/repositories";
import {fromPostToSummary} from "../core/models";
import {map} from "rxjs";

export class BlogService{
    constructor(private postRepository: PostRepository) {}

    summarizedPosts() {
        return this.postRepository.getAllPosts().pipe(
            map(posts => posts.map(post => fromPostToSummary(post)))
        );
    }

    postBy(slug: string) {
        return this.postRepository.getAllPosts().pipe(
            map(posts => posts.find(post => post.slug === slug))
        )
    }

    summarizedPostsByTag(tag: string) {
        return this.postRepository.getAllPosts().pipe(
            map(posts => posts.filter(post => post.tags.includes(tag)))
        )
    }

    summarizedPostsByUser(username: string) {
        return this.postRepository.getAllPosts().pipe(
            map(posts => posts.filter(post => post.username === username))
        )
    }

    tags(){
        return this.postRepository.getAllPosts().pipe(
            map(posts => posts.map(post => post.tags).flat()),
            map(tags => [...new Set(tags)])
        )
    }

    users(){
        return this.postRepository.getAllPosts().pipe(
            map(posts => posts.map(post => post.username).flat()),
            map(users => [...new Set(users)])
        )
    }
}
