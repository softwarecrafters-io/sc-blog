import {calculateReadingTime, canBeFollowed, formatDate, Post, ProfilePicture} from "@/core/models";
import styles from "./post.module.css";
import Image from "next/image";
import {ScrollLink} from "@/app/components/client/ScrollLink";
import {CodeBlock} from "@/app/components/client/CodeBlock";
import ReactMarkdown from "react-markdown";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";

export const PostBlock = ({post}: { post: Post }) => {
    return (
        <div className={styles.container}>
            <Image className={styles.cover} src={post.cover} alt={post.title} width={700} height={468} />
            <h1 className={styles.title}>{post.title}</h1>
            <h2 className={styles.subtitle}>{post.description}</h2>
            <div className={styles.infoContainer}>
                {ProfilePicture(post) && <Image className={styles.profile} src={ProfilePicture(post)} alt={post.username} width={50} height={50} />}
                <div className={styles.info}>
                    <span className={styles.username}>{post.username} · <ScrollLink href={'#newsletter'} hidden={canBeFollowed(post)}>Seguir</ScrollLink></span>
                    <span className={styles.time}>{calculateReadingTime(post)} min read · {formatDate(post)}</span>
                </div>
            </div>
            <Newsletter hideEntry={true} />
            <MarkdownBlock post={post} />
        </div>
    )
}

const MarkdownBlock = ({post}:{post:Post}) => (
        <ReactMarkdown
            components={{code({children}) {
                return <CodeBlock post={post}>{children}</CodeBlock>}}}>
            {post.markdownBody}
        </ReactMarkdown>
)

