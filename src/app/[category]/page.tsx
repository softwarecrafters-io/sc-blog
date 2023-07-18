import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";
import {generateStaticMetadata} from "@/app/services/metadataGenerator";

type CategoryPageParams = { params: { category: string } };

export default async function PostsPage({params}:CategoryPageParams) {
    return (
        <ListOfPosts title={params.category} currentPage={1}/>
  )
}

export async function generateMetadata({params}: CategoryPageParams ){
    const {category} = params;
    const title = `${category} | Software Crafters`;
    const description = `Artículos de ${category} en el blog de los Software Crafters`;
    const url = "softwarecrafters.io";
    const imageUrl = "https://softwarecrafters.io/og.jpg";

    return generateStaticMetadata(
        {title, description, url, imageUrl});
}
