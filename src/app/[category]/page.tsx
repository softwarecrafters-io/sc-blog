import {ListOfPosts} from "@/app/components/static/listOfPosts/listOfPosts";

export default async function PostsPage() {

    return (
        <ListOfPosts title={'Articulos'} currentPage={1}/>
  )
}
