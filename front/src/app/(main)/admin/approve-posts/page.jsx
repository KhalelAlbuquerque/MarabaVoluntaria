import PostsToApprove from "@/components/PostsToApprove/PostsToApprove.jsx"
import { Suspense } from "react"

export default function ApprovePosts(){

    return(
        <div className="mx-12 px-10 min-h-screen flex flex-col items-center mt-5 bg-gray-200 rounded-xl m-auto max-[1230px]:px-2 max-[1230px]:mx-2 max-[570px]:bg-gray-500 max-[570px]:px-0 max-[570px]:mx-1 max-[355px]:bg-white">

            <h1 className="font-bold text-2xl max-[570px]:text-white max-[570px]:pt-2 max-[355px]:text-black">Aprovação de publicações</h1>

            <div className="mt-10 max-[570px]:mt-2 flex flex-wrap p-3 gap-4 rounded-md justify-between max-[355px]:bg-white max-[1230px]:justify-center max-[570px]:p-0">
                <Suspense>
                    <PostsToApprove/>
                </Suspense>
            </div>
        </div>
    )

}