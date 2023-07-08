import LikeButton from "@/app/posts/components/LikeButton";
import Link from "next/link";
import {Suspense} from "react";
import {SummaryPost} from "@/dtos";
import {Factory} from "@/factory";

export default async function PostsPage() {
    const repository = Factory.getHttpPostRepository();
    const posts: SummaryPost[] = await repository.getAllPosts();

    return (
        <>
        <h1>Posts</h1>
        <div>
            {posts.map(post => <article key={post.id}>
                <Link href={`/posts/${post.slug}`}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                </Link>
            </article>)}
        </div>
        </>
  )
}
