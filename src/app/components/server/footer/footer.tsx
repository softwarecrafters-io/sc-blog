import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './footer.module.css';

export const Footer = () => {
    return (
        <div className={styles.container}>
            <Link className={styles.legal} href={Routes.legal}>Tostón Legal</Link>
            <p className={styles.cookies}>(No usamos cookies 🍪)</p>
        </div>
    )
}
