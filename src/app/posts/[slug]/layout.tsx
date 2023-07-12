import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {ScrollLink} from "@/app/components/client/ScrollLink";
import Link from "next/link";
import {Routes} from "@/app/routes";
import styles from './layout.module.css';
export default function LayoutPosts({children}:{children:React.ReactNode}){
    return (
        <>
            <div className={styles.breadcrumb}>
                <Link href={Routes.home} className={styles.breadcrumbLink}>Home</Link> &bull; <Link href={Routes.posts} className={styles.breadcrumbLink}>Posts</Link>
            </div>
            {children}
            <Newsletter/>
        </>
    )
}
