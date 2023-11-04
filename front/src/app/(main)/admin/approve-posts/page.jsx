'use client'
import LoadingHome from "@/components/LoadingHome/LoadingHome";
import PostsToApprove from "@/components/PostsToApprove/PostsToApprove.jsx"
import request from "@/helpers/request";
import { useState, useEffect, Suspense } from "react";

export default function ApprovePosts(){


    const [posts,setPosts] = useState([])

    const fetchData = async () => {
        const postsFetch = await request()

        setPosts(postsFetch.posts)
    };
      
    useEffect(() => {
        fetchData();
    }, []);


    return(
        <div className="mx-12 px-10 min-h-screen flex flex-col items-center mt-5 bg-gray-200 rounded-xl m-auto max-[1230px]:px-2 max-[1230px]:mx-2 max-[570px]:bg-gray-500 max-[570px]:px-0 max-[570px]:mx-1 max-[355px]:bg-white">

            <h1 className="font-bold text-2xl max-[570px]:text-white max-[570px]:pt-2 max-[355px]:text-black">Aprovação de publicações</h1>

            <div className="mt-10 max-[570px]:mt-2 bg-gray-500 flex flex-wrap p-3 gap-4 rounded-md justify-between max-[355px]:bg-white max-[1230px]:justify-center max-[570px]:p-0">
                <Suspense fallback={<LoadingHome/>}>
                    {posts.map((data,index) => (
                        <PostsToApprove key={index+1} title={data.title} description={data.description} />
                    ))}
                </Suspense>
            </div>

        </div>
    )

}