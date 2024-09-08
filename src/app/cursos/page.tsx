import styles from '../home.module.css';
import courseStyles from './course.module.css';
import Link from "next/link";
import {Routes} from "@/app/routes";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import Image from "next/image";

export default async function Legal() {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Formaciones de alto nivel para developers profesionales</h2>
            <p>La mayoría de las formaciones académicas para desarrolladores que te encuentras hoy en día en el mercado están creadas por personas que nunca han convivido lo suficiente con su propio código.</p>
            <strong><p>Simplemente no son conscientes de los problemas de mantenimiento que puede acarrear la forma en la que enseñan a programar.</p></strong>
            <p>Nuestros cursos te ahorrarán muchas horas en el camino del aprendizaje, evitarán que te choques con los mismos obstáculos que nos hicieron perder tiempo a nosotros y te ayudarán a alcanzar el siguiente nivel como developer.</p>
            <h2 className={styles.subtitle}>Curso de Testing y TDD</h2>
            <Link className={courseStyles.coverLink} href={'https://testingsostenible.com/'} target={'_blank'}>
                <Image className={courseStyles.cover} src={"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Book/testingsostenible.png"} alt={"Curso Testing Sostenible con TypeScript"} width={500} height={233}/>
            </Link>
            <h2 className={styles.subtitle}>Curso de Diseño de Software</h2>
            <Link className={courseStyles.coverLink} href={'https://diseñosostenible.com/'} target={'_blank'}>
                <Image className={courseStyles.cover} src={"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Blog/curso/cover.png"} alt={"Ingeniería y Artesanía del Software con TypeScript"} width={500} height={233}/>
            </Link>
        </div>
);
}

