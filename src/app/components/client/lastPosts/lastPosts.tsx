import {usePosts} from "@/app/components/client/lastPosts/usePosts";
import {ClientFactory} from "@/factories/clientFactory";
import {PaginationService} from "@/core/services";
import {SummarizedPostBlock} from "@/app/components/static/summaryzedPost/SummarizedPost";
import styles from './lastPosts.module.css';

export const LastPosts = async () => {
    const {getPosts, getPaginatedPosts, nextPage} = usePosts(ClientFactory.createBlogService());
    const allPosts = await getPosts();
    return (<div>
        <h3>Últimos artículos</h3>
        {allPosts.map(post => <article key={post.id}>
            <SummarizedPostBlock summarizedPost={post}/>
        </article>)}
    </div>)
}
