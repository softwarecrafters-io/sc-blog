import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {PaginatedPosts} from "@/app/components/server/post/paginatedPosts";
import {BlogComponent, blogMetadata} from "@/app/components/server/home/BlogComponent";

export default async function Home({params}: { params: { slug: string }; }) {
    return (<BlogComponent params={params}/>)
}

export async function generateMetadata({params}: { params: { slug: string }; }){
    return blogMetadata();
}


