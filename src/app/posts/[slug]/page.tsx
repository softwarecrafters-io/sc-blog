import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Factory} from "@/factory";
import LikeButton from "@/app/posts/components/LikeButton";

export default async function SinglePostPage({params}:Params) {
    const {slug} = params;
    const repository = Factory.getHttpPostRepository();
    const post = await repository.getPostBy(slug);
    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <LikeButton/>
        </article>
    )
}
