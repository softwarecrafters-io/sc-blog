export type SummarizedPost = {
    id: string;
    slug: string;
    cover: string;
    title: string;
    tags: string[];
    category: string;
    description: string;
    date: string,
    username:string,
    userPicture:string,
    readingTime: number;
}

export type Post = Omit<SummarizedPost, 'readingTime'> & {
    markdownBody:string
}

export function calculateReadingTime(post:Post): number {
    const cleanText = post.markdownBody.replace(/[_*#\[\]()\-`~!@#$%^&*{};:,.<>?\/|=+\\]/g, ' ');
    const words = cleanText.split(/\s+/);
    const realWords = words.filter(word => /\w+/g.test(word));
    return Math.round(realWords.length / 200);
}

export function formatDate(post: Post | SummarizedPost): string {
    if(!post.date){
        return ""
    }
    const inputDate = new Date(post.date);
    const currentDate = new Date();
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    if (inputDate.toDateString() === currentDate.toDateString()) {
        return "hoy";
    }
    if (inputDate.toDateString() === yesterday.toDateString()) {
        return "ayer";
    }
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const day = inputDate.getDate();
    const monthIndex = inputDate.getMonth();
    const year = inputDate.getFullYear();
    return `${day} ${months[monthIndex]} ${year}`;
}

export function ProfilePicture(post: Post): string {
    if(post.username === 'Miguel A. Gómez'){
        return 'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Assets/foto-circle-small.png'
    }
    return ""
}

export function canBeFollowed(post: Post): boolean {
    return post.username !== 'Miguel A. Gómez'
}

export const fromSummaryToPost = (summaryPost: SummarizedPost, markdownBody:string): Post => {
    return {
        id: summaryPost.id,
        cover: summaryPost.cover,
        title: summaryPost.title,
        tags: summaryPost.tags,
        category: summaryPost.category,
        description: summaryPost.description,
        date: summaryPost.date,
        slug: summaryPost.slug,
        username: summaryPost.username,
        userPicture: summaryPost.userPicture,
        markdownBody: markdownBody
    }
}

export const fromPostToSummary = (post: Post): SummarizedPost => {
    return {
        id: post.id,
        cover: post.cover,
        title: post.title,
        tags: post.tags,
        category: post.category,
        description: post.description,
        date: post.date,
        slug: post.slug,
        username: post.username,
        userPicture: post.userPicture,
        readingTime: calculateReadingTime(post)
    }
}

export type Subscriber = {
    email: string;
}

export function isValidEmail(email: string) {
    const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
}

export type Pagination = {
    currentPage: number;
    totalPages: number;
}

export type PostsWithPagination = {posts: SummarizedPost[], pagination:Pagination}
