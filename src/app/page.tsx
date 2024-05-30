import {BlogComponent, blogMetadata} from "@/app/components/server/home/BlogComponent";
import styles from './home.module.css';
import {Newsletter} from "@/app/components/client/newsletter/newsletter";

export default async function Home({params}: { params: { slug: string }; }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Software Crafters Academy</h1>
            <h2 className={styles.subtitle}>Formaciones de alto nivel para desarrolladores profesionales</h2>
            <Newsletter hideEntry={true}/>

        </div>
    )
}

export async function generateMetadata({params}: { params: { slug: string }; }){
    return blogMetadata();
}



