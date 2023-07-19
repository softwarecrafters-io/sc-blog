import {usePosts} from "@/app/components/server/listOfPosts/usePosts";
import {ClientFactory} from "@/infrastructure/factories/clientFactory";
import {SummarizedPostBlock} from "@/app/components/server/summaryzedPost/SummarizedPost";
import styles from './listOfPosts.module.css';
import {Pagination, SummarizedPost} from "@/core/models";
import Link from "next/link";
import {ServerFactory} from "@/infrastructure/factories/serverFactory";

export const PaginatedPosts = async ({currentPage, title}:{currentPage:number, title:string} ) => {
    const {getPostsWithPagination} = usePosts(ServerFactory.createBlogService());
    const {posts, pagination} = await getPostsWithPagination(currentPage);
    return (<div>
        <h3 className={styles.title}>{title}</h3>
        {posts.map(post =>
            <SummarizedPostBlock key={post.id} summarizedPost={post} />
        )}
        <PostsPagination pagination={pagination}/>
    </div>)
}

export const PostsByCategory = async ({category, title}:{category:string, title:string} ) => {
    const blogService = ServerFactory.createBlogService();
    const posts = await blogService.allSummarizedPostsByCategory(category).toPromise() as SummarizedPost[];
    return <div>
        <h3 className={styles.title}>{title}</h3>
        {posts.map(post =>
            <SummarizedPostBlock key={post.id} summarizedPost={post} />
        )}
    </div>
}

const PostsPagination = ({pagination}:{pagination:Pagination} ) => {
    const previousPage = () => {
        const currentPage = pagination.currentPage;
        if (currentPage > 1) {
            return currentPage - 1;
        }
        return currentPage;
    }

    const nextPage = () => {
        const currentPage = pagination.currentPage;
        if (currentPage < pagination.totalPages) {
            return currentPage + 1;
        }
        return currentPage;
    }

    const isLastPage = () => {
        return pagination.currentPage === pagination.totalPages;
    }

    const isFirstPage = () => {
        return pagination.currentPage === 1;
    }

    const isSecondPage = () => {
        return pagination.currentPage === 2;
    }

    return (<div className={styles.pagination}>
        <Link className={styles.link} href={isSecondPage() ? '/':`/page/${previousPage()}`} hidden={isFirstPage()}>
            <i className={styles.iconPrevious}/>artículos más recientes
        </Link>
        <Link className={styles.link} href={`/page/${nextPage()}`} hidden={isLastPage()}>
            artículos anteriores <i className={styles.iconNext}/>
        </Link>
    </div>)
}
