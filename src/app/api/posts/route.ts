import {NextRequest, NextResponse} from "next/server";
import {ServerFactory} from "@/infrastructure/factories/serverFactory";
import {map} from "rxjs";

const controller = (request: NextRequest) => {
    const url = new URL(request.url)
    const expectedPage = url.searchParams.get("page")
    const page = expectedPage ? Number(expectedPage) : 1;
    const blogService = ServerFactory.createBlogServiceWithLegacyPosts();
    return  blogService.summarizedPaginatedPosts(page).toPromise();
}

export async function GET(request: NextRequest){
    return NextResponse.json(await controller(request));
}
