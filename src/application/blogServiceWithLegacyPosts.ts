import {PostRepository} from "../core/repositories";
import {fromPostToSummary, SummarizedPost} from "../core/models";
import {map, Observable, zip} from "rxjs";

export class BlogServiceWithLegacyPosts{
    constructor(private postRepository: PostRepository, private legacyPostRepository: PostRepository) {}

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
