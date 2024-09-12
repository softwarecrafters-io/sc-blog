import {BlogComponent, blogMetadata} from "@/app/components/server/home/BlogComponent";

export default async function Home({params}: { params: { slug: string }; }) {
    console.log("asdfasdf")
    return (
        <>
            <BlogComponent params={params}/>
        </>
    )
}

export async function generateMetadata({params}: { params: { slug: string }; }){
    return blogMetadata("Blog");
}



