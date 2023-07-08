export type SummarizedPost = {
    id: string;
    slug: string;
    cover: string;
    title: string;
    tags: string[];
    description: string;
    date: string,
    username:string
}

export type Post = SummarizedPost & {markdownBody:string}

export const fromSummaryToPost = (summaryPost: SummarizedPost, markdownBody:string): Post => {
    return {
        id: summaryPost.id,
        cover: summaryPost.cover,
        title: summaryPost.title,
        tags: summaryPost.tags,
        description: summaryPost.description,
        date: summaryPost.date,
        slug: summaryPost.slug,
        username: summaryPost.username,
        markdownBody: markdownBody
    }
}

export const fromPostToSummary = (post: Post): SummarizedPost => {
    return {
        id: post.id,
        cover: post.cover,
        title: post.title,
        tags: post.tags,
        description: post.description,
        date: post.date,
        slug: post.slug,
        username: post.username
    }
}

export type Subscriber = {
    email: string;
}
