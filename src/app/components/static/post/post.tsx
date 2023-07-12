import {calculateReadingTime, formatDate, Post} from "@/core/models";
import styles from "./post.module.css";
import Image from "next/image";
import {ScrollLink} from "@/app/components/client/ScrollLink";
import {MarkdownBlock} from "@/app/components/client/MarkdownBlock";

export const PostBlock = ({post}: { post: Post }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{post.title}</h1>
            <h2 className={styles.subtitle}>{post.description}</h2>
            <div className={styles.infoContainer}>
                <Image className={styles.profile} src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Assets/foto-circle-small.png'} alt={'Miguel A. Gómez - Clean JavaScript'} width={50} height={50}/>
                <div className={styles.info}>
                    <span className={styles.username}>{post.username} · <ScrollLink href={'#newsletter'}>Follow</ScrollLink></span>
                    <span className={styles.time}>{calculateReadingTime(post)} min read · {formatDate(post)}</span>
                </div>
            </div>
            <Image className={styles.cover} src={post.cover} alt={post.title} width={700} height={468} />
            <MarkdownBlock post={post} />
        </div>
    )
}
