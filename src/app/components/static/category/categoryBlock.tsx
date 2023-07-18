import styles from './category.module.css';
import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        name: 'JavaScript',
    },
    {
        name: 'React',
    },
    {
        name: 'TypeScript',
    },
    {
        name: 'Devops',
    },
    {
        name: 'JavaScript',
    },
    {
        name: 'React',
    },
    {
        name: 'TypeScript',
    },
    {
        name: 'Devops',
    },
]

export const CategoryBlock = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Artículos por temas</h3>
            <div className={styles.categories}>
                {categories.map((category, index) => (
                    <Link href={''} className={styles.category}>{category.name}</Link>
                ))}
            </div>
        </div>
    )

}
