import LikeButton from "@/app/posts/components/LikeButton";
import Link from "next/link";
import {Suspense} from "react";
import {ClientFactory} from "@/factories/clientFactory";
import {SummarizedPost} from "@/core/models";
import {BlogService} from "@/application/blogService";
import {usePosts} from "@/app/posts/usePosts";
import {Routes} from "@/app/routes";


export default async function PostsPage() {
    const {getPosts} = usePosts(ClientFactory.createBlogService());
    const posts = await getPosts();

    return (
        <>
        <h1>Posts</h1>
        <div>
            {posts.map(post => <article key={post.id}>
                <Link href={Routes.buildPostRoute(post)}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                </Link>
            </article>)}
        </div>
        </>
  )
}
