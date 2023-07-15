import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";

export const HomeComponent = ({params}: { params: { slug: string }; }) => {
    const parsedSlug = Number(params.slug);
    const currentPage = parsedSlug ? parsedSlug : 1;
    return (
        <>
            <Newsletter/>
            <ListOfPosts title={"Últimos artículos"} currentPage={currentPage}/>
        </>
    )
}

