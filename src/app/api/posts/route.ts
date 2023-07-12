import {NextRequest, NextResponse} from "next/server";
import {ServerFactory} from "@/factories/serverFactory";

const controller = (request: NextRequest) => {
    const blogService = ServerFactory.createBlogServiceWithLegacyPosts();
    return  blogService.summarizedPosts().toPromise();
}

export async function GET(request: NextRequest){
    return NextResponse.json(await controller(request));
}
