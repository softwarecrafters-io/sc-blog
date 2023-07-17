import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";
import styles from './home.module.css';

export const HomeComponent = ({params}: { params: { slug: string }; }) => {
    const parsedSlug = Number(params.slug);
    const currentPage = parsedSlug ? parsedSlug : 1;
    return (
        <>
            <h1 className={styles.title}>Cansados de escribir código que mata la moral de cualquiera</h1>
            <Newsletter/>
            <ListOfPosts title={"Últimos artículos"} currentPage={currentPage} />
        </>
    )
}

