import PostInfo from "@/components/PostInfo/PostInfo"

export default function InfoVaga({params}){
    const postId = params.param[0]
    return (
        <div className="flex flex-col">
            <div>
                <PostInfo postId={postId}/>
            </div>
        </div>
    )
}