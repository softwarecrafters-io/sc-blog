import {Post, SummarizedPost} from "@/core/models";

export class Routes{
    static home = '/';
    static legal = '/legal';
    static posts = '/posts';
    static courses = '/cursos';
    static reviews = '/opiniones';
    static blog = '/blog';

    static buildPostRoute(post: Post | SummarizedPost, isFromRoot: boolean) {
        if (isFromRoot) {
            return `${post.category.toLowerCase()}/${post.slug}`;
        }
        return `../${post.category.toLowerCase()}/${post.slug}`;
    }

    static buildCategoryRoute(category: string, isFromRoot: boolean) {
        if (isFromRoot) {
            return `${category.toLowerCase()}`;
        }
        return `../${category.toLowerCase()}`;
    }
}
