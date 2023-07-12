import {BlogService} from "@/application/blogService";
import {Post, SummarizedPost} from "@/core/models";

export const usePosts = (blogService:BlogService) => {
    const getPosts = () => blogService.summarizedPosts().toPromise() as Promise<SummarizedPost[]>;

    const getPostBySlug = (slug: string) => blogService.postBy(slug).toPromise() as Promise<Post>;

    return {getPosts, getPostBySlug};
}
