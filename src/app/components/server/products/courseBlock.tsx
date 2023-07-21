import Image from "next/image";
import styles from './courseBlock.module.css';
import Link from "next/link";

export const CourseBlock = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Curso Testing Sostenible</h2>
            <Link className={styles.link} href={'https://testingsostenible.com/'} target={'_blank'}>
                <Image className={styles.coverCourse} src={"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Book/testingsostenible.png"} alt={"Curso Testing Sostenible con TypeScript"} width={350} height={233}/>
            </Link>
        </div>
    )
}
