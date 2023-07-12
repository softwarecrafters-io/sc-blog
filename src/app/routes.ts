import {Post, SummarizedPost} from "@/core/models";

export class Routes{
    static home = '/';
    static legal = '/legal';
    static posts = '/posts';

    static buildPostRoute(post: Post | SummarizedPost) {
        return `${Routes.posts}/${post.slug}`;
    }
}
