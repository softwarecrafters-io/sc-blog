import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {PaginatedPosts} from "@/app/components/server/post/paginatedPosts";
import styles from './home.module.css';
import {generateStaticMetadata} from "@/app/services/metadataGenerator";
import {CourseBlock} from "@/app/components/server/products/courseBlock";
import {CategoryBlock} from "@/app/components/server/category/categoryBlock";
import {BookBlock} from "@/app/components/server/products/bookBlock";

export const BlogComponent = ({params}: { params: { slug: string }; }) => {
    const parsedSlug = Number(params.slug);
    const currentPage = parsedSlug ? parsedSlug : 1;
    return (
        <>
            <h1 className={styles.title}>Blog</h1>
            <Newsletter hideEntry={true}/>
            <PaginatedPosts title={"Últimos artículos"} currentPage={currentPage} />
            <CourseBlock/>
            <CategoryBlock/>
            <BookBlock/>
            <Newsletter/>
        </>
    )
}


export function blogMetadata() {
    const title = "Software Crafters Blog";
    const description = "Formaciones de alto nivel para developers profesionales.";
    const url = "softwarecrafters.io";
    const imageUrl = "https://softwarecrafters.io/og.png";

    return generateStaticMetadata(
        {title, description, url, imageUrl});
}
