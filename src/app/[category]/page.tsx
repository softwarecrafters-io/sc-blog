import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";

type CategoryPageParams = { params: { category: string } };
export default async function PostsPage({params}:CategoryPageParams) {
    return (
        <ListOfPosts title={params.category} currentPage={1}/>
  )
}
