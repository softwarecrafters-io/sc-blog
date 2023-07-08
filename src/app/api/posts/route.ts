import {NextResponse} from "next/server";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
import {Factory} from "@/factory";

const handler = async () => {
    const postRepository = Factory.getPostRepository();
    return postRepository.getAllPosts().toPromise();
}

export  function GET(){
    return handler().then(v => NextResponse.json(v));
}
