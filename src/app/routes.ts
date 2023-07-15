import {Post, SummarizedPost} from "@/core/models";

export class Routes{
    static home = '/';
    static legal = '/legal';
    static posts = '/posts';

    static buildPostRoute(post: Post | SummarizedPost) {
        return `${post.category.toLowerCase()}/${post.slug}`;
    }

    static buildCategoryRoute(category: string) {
        return `${category.toLowerCase()}`;
    }

    static buildCategoryRouteFromPost(category: string) {
        return `../${category.toLowerCase()}`;
    }
}
