import {NextRequest, NextResponse} from "next/server";
import {ServerFactory} from "@/factories/serverFactory";
import {notFound} from "next/navigation";

type Params = {
    params: { slug: string }
}

const controller = async (request: NextRequest, params: Params ) => {
    const blogService = ServerFactory.createBlogServiceWithLegacyPosts();
    const {slug} = params.params;
    const post = await blogService.postBy(slug).toPromise();
    if(!post){
        return notFound();
    }
    return NextResponse.json(post);
}


export async function GET(request: NextRequest, params: Params ){
    return await controller(request, params);
}
