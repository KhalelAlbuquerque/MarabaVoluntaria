import PostsToApprove from "@/components/PostsToApprove/PostsToApprove.jsx"

export default function ApprovePosts(){


    return(
        <div className="w-4/5 min-h-screen flex flex-col items-center mt-5 bg-gray-200 rounded-2xl m-auto">

            <h1 className="font-bold text-2xl">Aprovação de publicações</h1>

            <div className="mt-10 w-10/12 bg-gray-500 min-h-fit">
                <PostsToApprove />
            </div>

        </div>
    )

}