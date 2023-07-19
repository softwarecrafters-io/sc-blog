import styles from './suggestedPosts.module.css';
import {ServerFactory} from "@/infrastructure/factories/serverFactory";
import {Post, SummarizedPost} from "@/core/models";
import Image from "next/image";

export const SuggestedPosts = async ({post}:{post:Post}) => {
    const blogService = ServerFactory.createBlogService();
    const previousPost = await blogService.previousPostBySlug(post).toPromise();
    const nextPost = await blogService.nextPostBySlug(post).toPromise();

    return (
        <div className={styles.container}>
            <h3>Quizás te interese</h3>
            <div className={styles.posts}>
                {previousPost && <SuggestedPostBlock post={previousPost}/>}
                {nextPost && <SuggestedPostBlock post={nextPost}/>}
            </div>
        </div>
    )
}

const SuggestedPostBlock = ({post}:{post:SummarizedPost}) => {
    return (
        <div className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <Image src={post.cover} alt={post.title} width={300} height={200}/>
        </div>
    )
}
