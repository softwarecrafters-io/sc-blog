import Image from "next/image";
import styles from './bookBlock.module.css';
import Link from "next/link";

export const BookBlock = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Libro Clean JavaScript</h3>
            <Link className={styles.link} href={'https://cleanjavascript.es/'} target={'_blank'}>
                <Image className={styles.coverBook} src={"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Book/libro%20clean%20javascript.webp"} alt={"Libro Clean JavaScript"} width={200} height={300}/>
            </Link>
        </div>
    )
}
