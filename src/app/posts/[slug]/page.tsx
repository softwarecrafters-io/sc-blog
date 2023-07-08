import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {ServerFactory} from "@/factories/serverFactory";
import LikeButton from "@/app/posts/components/LikeButton";

export default async function SinglePostPage({params}:Params) {
    const {slug} = params;
    const repository = ServerFactory.getHttpPostRepository();
    const post = await repository.getPostBy(slug);
    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <LikeButton/>
        </article>
    )
}
