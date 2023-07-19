import styles from './category.module.css';
import Link from "next/link";
import {ServerFactory} from "@/infrastructure/factories/serverFactory";
import {Routes} from "@/app/routes";

export const  CategoryBlock = async () => {
    const blogService = ServerFactory.createBlogService();
    const categories = await blogService.categories().toPromise() as string[];
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Artículos por temas</h3>
            <div className={styles.categories}>
                {categories.map((category, index) => (
                    <Link key={index} href={Routes.buildCategoryRoute(category, true)} className={styles.category}>{category}</Link>
                ))}
            </div>
        </div>
    )
}
