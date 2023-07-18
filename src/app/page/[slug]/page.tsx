import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";
import {HomeComponent, homeMetadata} from "@/app/components/static/home/HomeComponent";

export default async function Home({params}: { params: { slug: string }; }) {
    return (<HomeComponent params={params}/>)
}

export async function generateMetadata({params}: { params: { slug: string }; }){
    return homeMetadata();
}


