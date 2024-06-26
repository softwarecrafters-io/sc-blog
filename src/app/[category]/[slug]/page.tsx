import {usePosts} from "@/app/components/server/post/usePosts";
import {ClientFactory} from "@/infrastructure/factories/clientFactory";
import {PostBlock} from "@/app/components/server/post/post";
import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './page.module.css';
import {PaginatedPosts} from "@/app/components/server/post/paginatedPosts";
import {ServerFactory} from "@/infrastructure/factories/serverFactory";
import {generateStaticMetadata} from "@/app/services/metadataGenerator";
import {formatCategory, Post} from "@/core/models";
import {blogMetadata} from "@/app/components/server/home/BlogComponent";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {SuggestedPosts} from "@/app/components/server/post/suggestedPosts";
import {CourseBlock} from "@/app/components/server/products/courseBlock";

export default async function SinglePostPage({params}: { params:{slug: string;}}) {
    const {getPostBySlug} = usePosts(ServerFactory.createBlogService());
    const {slug} = params;
    const post = await getPostBySlug(slug);
    if (!post) {
        return <div>
            <h3>404 - Artículo no encontrado, prueba con alguno de los de abajo</h3>
            <PaginatedPosts currentPage={1} title={"Últimos artículos"}></PaginatedPosts>
        </div>
    }
    const formattedCategory = formatCategory(post.category)
    return (
        <div>
            <div className={styles.breadcrumb}>
                <Link href={Routes.home} className={styles.breadcrumbLink}>Home</Link> » <Link href={Routes.buildCategoryRoute(post.category, false)} className={styles.breadcrumbLink}>{formattedCategory}</Link> » {post.title}
            </div>
            <PostBlock post={post}/>
            <SuggestedPosts post={post} />
            <Newsletter/>
            <CourseBlock/>
        </div>
    )
}

export const revalidate = 10;

export async function generateMetadata({params}:  { params:{slug: string;}} ){
    const blogService = ServerFactory.createBlogService();
    const {slug} = params;
    const post = await blogService.postBy(slug).toPromise() as Post;
    if (!post) {
        return blogMetadata();
    }

    const title = `${post.title} | Software Crafters`;
    const description = `${post.description}`;
    const url = "http://softwarecrafters.io" + post.slug;
    const imageUrl = post.cover;

    return generateStaticMetadata(
        {title, description, url, imageUrl});
}
