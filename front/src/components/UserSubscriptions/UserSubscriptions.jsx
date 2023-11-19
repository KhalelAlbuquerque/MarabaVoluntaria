'use client'

import { useEffect, useState } from "react"
import request from "@/helpers/request"
import ProfilePost from '@/components/ProfilePost/ProfilePost'

export default function UserSubscriptions({postIds}){

    const [posts, setPosts] = useState(false)
    const [inProgress, setInProgress] = useState(null)
    const [finished, setFinished] = useState(null)
    
    async function getPosts(){
        let newList = []

        for(let postId of postIds){
            const res = await request(`post/${postId}`)
            if(res.ok){
                const resImg = await request(`image/${res.post.image}`)
                res.post.image = resImg.image
                newList.push(res.post)
            }
        }  
        
        const progress = newList.filter(e=>e.isClosed === false)
        setInProgress(progress)

        const finish = newList.filter(e=>e.isClosed === true)
        setFinished(finish)

        newList.length !== 0 ? setPosts(newList) : setPosts(null)
    }


    useEffect(()=>{
        getPosts()
    }, [])
    
    return(
        <>
            {posts ? (
                <div className="flex text-center">
                    <div className="w-1/2">
                        <p className="font-bold text-gray-800 my-2">Em andamento</p>
                        <div className="flex flex-col h-52 overflow-scroll overflow-x-hidden gap-3">
                            {inProgress.map((post, index)=>(
                                <ProfilePost key={index+1} post={post}/>
                            ))}
                        </div>

                    </div>
                    <div className="w-1/2">
                        <p className="font-bold text-gray-800 my-2">Finalizados</p>
                        <div className="flex flex-col h-52 overflow-scroll overflow-x-hidden gap-3">
                            {finished.map((post, index)=>(
                                <ProfilePost key={index+1} post={post}/>
                            ))}
                        </div>
                    </div>
                </div>

            ):(
                <p>Sem inscrições</p>
            )}
        </>
    )

}