import styles from './category.module.css';
import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        name: 'JavaScript',
        cover: 'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/JS_category.png'
    },
    {
        name: 'React',
        cover: 'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/ReactJS_category.png'
    },
    {
        name: 'TypeScript',
        cover: 'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png'
    },
    {
        name: 'Devops',
        cover: 'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/docker_category.png'
    }
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
