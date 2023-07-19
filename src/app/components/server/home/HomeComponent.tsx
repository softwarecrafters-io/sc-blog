import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {PaginatedPosts} from "@/app/components/server/listOfPosts/paginatedPosts";
import styles from './home.module.css';
import {generateStaticMetadata} from "@/app/services/metadataGenerator";
import {CourseBlock} from "@/app/components/server/products/courseBlock";
import {CategoryBlock} from "@/app/components/server/category/categoryBlock";
import {BookBlock} from "@/app/components/server/products/bookBlock";

export const HomeComponent = ({params}: { params: { slug: string }; }) => {
    const parsedSlug = Number(params.slug);
    const currentPage = parsedSlug ? parsedSlug : 1;
    return (
        <>
            <h1 className={styles.title}>El blog de los Software Crafters</h1>
            <Newsletter/>
            <PaginatedPosts title={"Últimos artículos"} currentPage={currentPage} />
            <CourseBlock/>
            <CategoryBlock/>
            <BookBlock/>
        </>
    )
}


export function homeMetadata() {
    const title = "Software Crafters";
    const description = "Cansados de escribir código que mata la moral de cualquiera";
    const url = "softwarecrafters.io";
    const imageUrl = "https://softwarecrafters.io/og.png";

    return generateStaticMetadata(
        {title, description, url, imageUrl});
}
