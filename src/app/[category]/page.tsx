import {PaginatedPosts, PostsByCategory} from "@/app/components/server/post/paginatedPosts";
import {generateStaticMetadata} from "@/app/services/metadataGenerator";
import {CourseBlock} from "@/app/components/server/products/courseBlock";
import {CategoryBlock} from "@/app/components/server/category/categoryBlock";
import {BookBlock} from "@/app/components/server/products/bookBlock";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";

type CategoryPageParams = { params: { category: string } };

export default async function PostsPage({params}:CategoryPageParams) {
    return (<>
        <PostsByCategory title={params.category} category={params.category}/>
        <CourseBlock/>
        <CategoryBlock/>
        <BookBlock/>
        <Newsletter/>
        </>
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
