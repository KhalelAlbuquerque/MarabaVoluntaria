import PostsToApprove from "@/components/PostsToApprove/PostsToApprove.jsx"

export default function ApprovePosts(){


    return(
        <div className="mx-12 px-10 min-h-screen flex flex-col items-center mt-5 bg-gray-200 rounded-xl m-auto">

            <h1 className="font-bold text-2xl">Aprovação de publicações</h1>

            <div className="mt-10 bg-gray-500 flex flex-wrap p-3 gap-4 rounded-md justify-between">
                <PostsToApprove />
                <PostsToApprove />
                <PostsToApprove />
                <PostsToApprove />
                <PostsToApprove />
                <PostsToApprove />
                <PostsToApprove />
            </div>

        </div>
    )

}