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
                        <p>Em andamento</p>
                        <div className="mt-3 flex flex-col h-52 overflow-scroll overflow-x-hidden">
                            {inProgress.map((post, index)=>(
                                <ProfilePost key={index+1} post={post}/>
                            ))}
                        </div>

                    </div>
                    <div className="w-1/2">
                        <p>Finalizados</p>
                        <div className="mt-3 flex flex-col h-52 overflow-scroll overflow-x-hidden">
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