import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {usePosts} from "@/app/posts/usePosts";
import {ClientFactory} from "@/factories/clientFactory";
import {PostBlock} from "@/app/components/static/post/post";

export default async function SinglePostPage({params}:Params) {
    const {getPostBySlug} = usePosts(ClientFactory.createBlogService());
    const {slug} = params;
    const post = await getPostBySlug(slug);

    return (
        <>
            <PostBlock post={post}/>
        </>
    )
}


