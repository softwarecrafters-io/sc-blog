'use client';
import {BlogService} from "@/application/blogService";
import {Pagination, Post, PostsWithPagination, SummarizedPost} from "@/core/models";
import {PaginationService} from "@/core/services";
import {map, tap} from "rxjs";
import {useEffect, useState} from "react";

export const usePosts = (blogService:BlogService) => {
    const [currentPage, setCurrentPage] = useState(1);
    const getPostsWithPagination = () => {
        const request = blogService.summarizedPosts(1)
        return request.toPromise() as Promise<PostsWithPagination>;
    }

    const nextPage = (posts:SummarizedPost[]) => {
        const pagination = new PaginationService(posts);
    }

    const getPaginatedPosts = (posts:SummarizedPost[]) => {
        const pagination = new PaginationService(posts);
    }

    const getPostBySlug = (slug: string) => blogService.postBy(slug).toPromise() as Promise<Post>;
    return {getPostsWithPagination, getPostBySlug, nextPage, getPaginatedPosts};
}
