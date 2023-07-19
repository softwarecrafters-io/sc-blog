import {PaginatedPosts, PostsByCategory} from "@/app/components/static/listOfPosts/paginatedPosts";
import {generateStaticMetadata} from "@/app/services/metadataGenerator";

type CategoryPageParams = { params: { category: string } };

export default async function PostsPage({params}:CategoryPageParams) {
    return (
        <PostsByCategory title={params.category} category={params.category}/>
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
