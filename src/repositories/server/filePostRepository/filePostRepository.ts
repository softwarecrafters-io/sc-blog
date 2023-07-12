import {PostRepository} from "../../../core/repositories";
import {map, Observable, of} from "rxjs";
import {fromPostToSummary, Post, SummarizedPost} from "../../../core/models";
import {LegacyPost} from "../../../repositories/server/filePostRepository/legacyPostDatasource";

export class FilePostRepository implements PostRepository{
    constructor(private legacyPosts: LegacyPost[]) {}

    summarizedPosts() {
        return this.allPosts().pipe(
            map(posts => posts.map(post => fromPostToSummary(post)))
        );
    }

    postBy(slug: string) {
        return this.allPosts().pipe(
            map(posts => posts.find(post => post.slug === slug))
        )
    }

    summarizedPostsByTag(tag: string) {
        return this.summarizedPosts().pipe(
            map(posts => posts.filter(post => post.tags.includes(tag)))
        )
    }

    summarizedPostsByUser(username: string) {
        return this.summarizedPosts().pipe(
            map(posts => posts.filter(post => post.username === username))
        )
    }

    allPosts(): Observable<Post[]> {
        return of(this.legacyPosts.map(lp => this.mapLegacyPostToPost(lp)));
    }

    mapLegacyPostToPost = (legacyPost: LegacyPost): Post => {
        return {
            id: legacyPost.slug,
            slug: legacyPost.slug,
            cover: legacyPost.background,
            title: legacyPost.title,
            tags: [legacyPost.category],
            category: legacyPost.category,
            description: legacyPost.summary || '',
            date: '',
            username: legacyPost.author,
            userPicture: '',
            markdownBody: legacyPost.content,
        };
    };
}
