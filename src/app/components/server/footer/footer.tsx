import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './footer.module.css';

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className={styles.container}>
            <p className={styles.cookies}>Software Crafters ®  | Creado con 🖤 para elevar el nivel de la conversación sobre programación en español| <Link className={styles.legal} href={Routes.legal}>Legal</Link></p>
        </div>
    )
}
