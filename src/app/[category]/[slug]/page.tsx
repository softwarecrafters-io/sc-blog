import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {usePosts} from "@/app/components/static/listOfPosts/usePosts";
import {ClientFactory} from "@/factories/clientFactory";
import {PostBlock} from "@/app/components/static/post/post";
import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './page.module.css';

export default async function SinglePostPage({params}:Params) {
    const {getPostBySlug} = usePosts(ClientFactory.createBlogService());
    const {slug} = params;
    const post = await getPostBySlug(slug);

    return (
        <>
            <div className={styles.breadcrumb}>
                <Link href={Routes.home} className={styles.breadcrumbLink}>Home</Link> &bull; <Link href={Routes.buildCategoryRouteFromPost(post.category)} className={styles.breadcrumbLink}>{post.category}</Link>
            </div>
            <PostBlock post={post}/>
        </>
    )
}


