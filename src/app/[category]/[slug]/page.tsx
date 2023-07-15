import {usePosts} from "@/app/components/static/listOfPosts/usePosts";
import {ClientFactory} from "@/factories/clientFactory";
import {PostBlock} from "@/app/components/static/post/post";
import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './page.module.css';
import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";

export default async function SinglePostPage({params}: { params:{slug: string;}}) {
    const {getPostBySlug} = usePosts(ClientFactory.createBlogService());
    const {slug} = params;
    try{
        const post = await getPostBySlug(slug);
        return (
            <>
                <div className={styles.breadcrumb}>
                    <Link href={Routes.home} className={styles.breadcrumbLink}>Home</Link> &bull; <Link href={Routes.buildCategoryRoute(post.category, false)} className={styles.breadcrumbLink}>{post.category}</Link>
                </div>
                <PostBlock post={post}/>
            </>
        )
    }
    catch (e){
        return (<div>
            <h1>Artículo no encontrado, prueba con alguno de los de abajo</h1>
            <ListOfPosts currentPage={1} title={"Últimos artículos"}></ListOfPosts>
        </div>)
    }
}


