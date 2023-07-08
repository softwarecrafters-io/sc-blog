export default function LayoutPosts({children}:{children:React.ReactNode}){
    return (
        <div>
            <small>Home &bull; Posts</small>
            <div>
                {children}
            </div>
        </div>
    )
}
