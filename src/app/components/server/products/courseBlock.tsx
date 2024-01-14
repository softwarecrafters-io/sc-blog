import Image from "next/image";
import styles from './courseBlock.module.css';
import Link from "next/link";

export const CourseBlock = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Cursos de Software Crafters Academy</h2>
            <div className={styles.courseContainer}>
            <Link className={styles.link} href={'https://testingsostenible.com/'} target={'_blank'}>
                <Image className={styles.coverCourse} src={"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Book/testingsostenible.png"} alt={"Curso Testing Sostenible con TypeScript"} width={350} height={233}/>
            </Link>
            <Link className={styles.link} href={'https://diseñosostenible.com/'} target={'_blank'}>
                <Image className={styles.coverCourse} src={"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Blog/curso/cover.png"} alt={"Ingeniería y Artesanía del Software con TypeScript"} width={350} height={233}/>
            </Link>
            </div>
        </div>
    )
}
