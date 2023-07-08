import {NextResponse} from "next/server";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
import {ServerFactory} from "@/factories/serverFactory";

const handler = async () => {
    const postRepository = ServerFactory.getPostRepository();
    return postRepository.getAllPosts().toPromise();
}

export  function GET(){
    return handler().then(v => NextResponse.json(v));
}
