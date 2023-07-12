import {BlogService} from "@/application/blogService";
import {Post, SummarizedPost} from "@/core/models";
import {PaginationService} from "@/core/services";
import {map, tap} from "rxjs";
import {useEffect, useState} from "react";

export const usePosts = (blogService:BlogService) => {

    const getPosts = () => {
        const request = blogService.summarizedPosts()
        return request.toPromise() as Promise<SummarizedPost[]>;
    }

    const nextPage = (posts:SummarizedPost[]) => {
        const pagination = new PaginationService(posts);
    }

    const getPaginatedPosts = (posts:SummarizedPost[]) => {
        const pagination = new PaginationService(posts);
    }

    const getPostBySlug = (slug: string) => blogService.postBy(slug).toPromise() as Promise<Post>;
    return {getPosts, getPostBySlug, nextPage, getPaginatedPosts};
}
