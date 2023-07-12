import Link from "next/link";
import {Routes} from "@/app/routes";
import {calculateReadingTime, formatDate, SummarizedPost} from "@/core/models";
import styles from './summarizedPost.module.css';
import Image from "next/image";


export const SummarizedPostBlock = ({summarizedPost}:{summarizedPost:SummarizedPost}) => {
    return (
        <div className={styles.container} id={summarizedPost.slug}>
            <div className={styles.containerMainContent}>
                <div className={styles.containerText}>
                    <Link className={styles.link} href={Routes.buildPostRoute(summarizedPost)}>
                    <h2 className={styles.title}>{summarizedPost.title}</h2>
                    <span className={styles.subtitle}>{summarizedPost.description}</span>
                    </Link>
                    <div className={styles.meta}>
                        <span className={styles.tag}>{summarizedPost.category}</span>
                        <span className={styles.time}>{summarizedPost.readingTime} min read · {formatDate(summarizedPost)}</span>
                    </div>
                </div>
                <Link className={styles.link} href={Routes.buildPostRoute(summarizedPost)}>
                <Image className={styles.cover} src={summarizedPost.cover} alt={summarizedPost.title} width={150} height={100} />
                </Link>
            </div>
        </div>
    )
}
