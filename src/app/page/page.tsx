import {HomeComponent, homeMetadata} from "@/app/components/server/home/HomeComponent";

export default async function Home({params}: { params: { slug: string }; }) {
  return (<HomeComponent params={params}/>)
}

export async function generateMetadata({params}: { params: { slug: string }; }){
  return homeMetadata();
}
