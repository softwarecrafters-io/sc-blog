import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './footer.module.css';

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className={styles.container}>
            <Link className={styles.legal} href={Routes.legal}>Legal y Política de Privacidad</Link>
            <p className={styles.cookies}>® Software Crafters es una marca registrada.</p>
        </div>
    )
}
