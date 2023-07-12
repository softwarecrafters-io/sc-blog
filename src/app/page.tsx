import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {usePosts} from "@/app/posts/usePosts";
import {ClientFactory} from "@/factories/clientFactory";
import Link from "next/link";
import {Routes} from "@/app/routes";
import {Post, SummarizedPost} from "@/core/models";
import {SummaryReporter} from "@jest/reporters";
import {SummarizedPostBlock} from "@/app/components/static/summaryzedPost/SummarizedPost";

export default async function Home() {


  return (
    <>
        <Newsletter/>
        <LastPosts/>
    </>
  )
}

const LastPosts = async () => {
    const {getPosts} = usePosts(ClientFactory.createBlogService());
    const posts = await getPosts();
    return (<div>
        <h3>Últimos artículos</h3>
        {posts.map(post => <article key={post.id}>
            <SummarizedPostBlock summarizedPost={post}/>
        </article>)}
    </div>)
}


