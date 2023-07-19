import {Post, PostsWithPagination, SummarizedPost} from "@/core/models";
import {BlogService} from "@/application/blogService";

export const usePosts = (blogService:BlogService) => {
    const getPostsWithPagination = (currentPage:number) => {
        const request = blogService.summarizedPaginatedPosts(currentPage)
        return request.toPromise() as Promise<PostsWithPagination>;
    }

    const getPostBySlug = (slug: string) => blogService.postBy(slug).toPromise() as Promise<Post>;
    return {getPostsWithPagination, getPostBySlug};
}
