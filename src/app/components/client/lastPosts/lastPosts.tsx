import {usePosts} from "@/app/components/client/lastPosts/usePosts";
import {ClientFactory} from "@/factories/clientFactory";
import {PaginationService} from "@/core/services";
import {SummarizedPostBlock} from "@/app/components/static/summaryzedPost/SummarizedPost";
import styles from './lastPosts.module.css';

export const LastPosts = async () => {
    const {getPostsWithPagination, getPaginatedPosts, nextPage} = usePosts(ClientFactory.createBlogService());
    const {posts, pagination} = await getPostsWithPagination();
    return (<div>
        <h3>Últimos artículos</h3>
        {posts.map(post => <article key={post.id}>
            <SummarizedPostBlock summarizedPost={post}/>
        </article>)}
    </div>)
}
