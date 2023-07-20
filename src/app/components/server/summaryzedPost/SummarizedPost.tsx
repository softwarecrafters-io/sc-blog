import { headers } from 'next/headers';

import Link from "next/link";
import {Routes} from "@/app/routes";
import {calculateReadingTime, formatDate, SummarizedPost} from "@/core/models";
import styles from './summarizedPost.module.css';
import Image from "next/image";


export const SummarizedPostBlock = ({summarizedPost}:{summarizedPost:SummarizedPost}) => {
    const headersList = headers();
    const isLoadedFromHome = !!headersList.get('referer')?.includes('page=1');
    return (
        <div className={styles.container} id={summarizedPost.slug} >
            <div className={styles.containerMainContent}>
                <div className={styles.containerText}>
                    <Link className={styles.link} href={Routes.buildPostRoute(summarizedPost, isLoadedFromHome)}>
                    <h2 className={styles.title}>{summarizedPost.title}</h2>
                    <span className={styles.subtitle}>{summarizedPost.description}</span>
                    </Link>
                    <div className={styles.meta}>
                        <Link className={styles.category} href={Routes.buildCategoryRoute(summarizedPost.category, isLoadedFromHome)}>{summarizedPost.category}</Link>
                        <span className={styles.time}>{summarizedPost.readingTime} min read · {formatDate(summarizedPost)} - por {summarizedPost.username}</span>
                    </div>
                </div>
                <Link className={styles.link} href={Routes.buildPostRoute(summarizedPost, isLoadedFromHome)}>
                <Image className={styles.cover} src={summarizedPost.cover} alt={summarizedPost.title} width={150} height={100} />
                </Link>
            </div>
        </div>
    )
}
