'use client'

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SlPeople } from "react-icons/sl";
import Image from "next/image";
import PostSubcribers from '@/components/PostSubscribers/PostSubscribers.jsx'
import foto from '@/components/Card/imgs/crianca-card.webp'
import { GiGreenhouse } from "react-icons/gi";
import { AiOutlineClockCircle } from "react-icons/ai";
import SubscribeButton from "@/components/SubscribeButton/SubscribeButton.jsx";
import { useEffect, useState } from "react";
import request from "@/helpers/request";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";
import Notification from "../Notifier/Notification";

export default function PostInfo({postId}){

    const router = useRouter()

    const [post, setPost] = useState(null)
    const [postOwner, setPostOwner] = useState(null)
    const [foundPost, setFoundPost] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    async function getPostInfos(){
        const findPost = await request(`post/${String(postId)}`)
        if(findPost.ok){
            setPost(findPost.post)
            const findOwner = await request(`ong/${findPost.post.owner}`)     
            setIsLoading(false)
            if(findOwner.ok){
                setPostOwner(findOwner.ong)
            }else{
                Notification('error', "Problema ao encontrar o dono da vaga!")
                router.push('/')
            }

        }else{
            Notification('error', 'Vaga não encontrada!')
            setFoundPost(false)
        }
    }

    useEffect(()=>{
        getPostInfos()
    }, [])


    if(!foundPost) return(
        <div className="flex items-center justify-center">
            <h1>POST NAO ENCONTRADO!</h1>
        </div>
    )

    return (
        <>
            {post?(
                <main className="h-screen">
                    {isLoading && <Loading/>}
                    <div className="flex justify-between pb-3 mx-60 mt-6 max-[500px]:mt-0 max-[500px]:mx-0 max-[1400px]:flex-col-reverse max-[1400px]:items-start max-[1000px]:mx-32 max-[700px]:mx-4">
                        <div>
                            <div className="flex flex-col gap-3 max-[1000px]:my-5 max-[700px]:ml-4">
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold">
                                        {post.title}
                                    </h1>
                                    <p className="text-sm font-semibold text-gray-400">Publicada em 11/10/2023</p>
                                </div>
                                <div>
                                    <p>{post.description}</p>
                                </div>
                                <div className="mt-2 flex items-center gap-2 border-r-4 w-fit px-4 rounded-r-full">
                                    <SlPeople className="bg-sky-300 h-10 w-10 rounded-full p-2"/>
                                    <p>{post.volunteers.length} Inscritos</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-96 max-[1400px]:w-full">
                            <div>
                                <Image
                                src={foto}
                                alt="Foto da vaga"
                                className="rounded-2xl w-96 max-[1400px]:w-full max-[500px]:rounded-t-none"
                                />
                            </div>
                            <div className="flex gap-2 mt-2 ml-2">
                                <div>
                                    <GiGreenhouse className="text-5xl text-orange-500"/>
                                </div>
                                <div className="flex flex-col">
                                    <div>
                                        <p className="text-gray-400 text-sm">Realizada pela ONG</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-600">{postOwner && postOwner.name}</p>
                                    </div>
                                </div>
                            </div>
                            <SubscribeButton postId={postId}/>
                        </div>
                    </div>
                    <div className="flex">
                         <div className="ml-60 mr-8 flex flex-col max-[1000px]:ml-32 max-[700px]:ml-4">
                            <div className="text-sm flex flex-col gap-1.5 border-y-2 py-3">
                                <h1 className="text-gray-700 font-bold text-lg">Sobre a vaga</h1>
                                <p>{post.about}</p>
                            </div>
                            <div className="py-3 border-b-2">
                                <h1 className="text-gray-700 font-bold text-lg">Horários</h1>
                                <div className="flex items-center gap-2">
                                    <AiOutlineClockCircle className="text-xl"/>
                                    <p>{post.weeklyHours} Horas Semanais</p>
                                </div>
                            </div>
                            <div className="py-3 flex-col">
                                <div className="text-gray-700 font-bold text-xl">
                                    Realizada Pela ONG
                                </div>
                                <div className="flex gap-2">
                                    <div>
                                        <GiGreenhouse className="text-[50px] text-orange-500"/>
                                    </div>
                                    <div>
                                        <h1 className="text-gray-700 font-semibold text-md">{postOwner && postOwner.name}</h1>
                                        <p className="text-sm text-gray-500">{postOwner && postOwner.about}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-60 flex max-[1000px]:ml-32 max-[700px]:ml-4">
                        <PostSubcribers subscribers={post.volunteers}/>
                    </div>
                </main>
            ):(
                <h1>carregando</h1>
            )}
        </>
    )
}