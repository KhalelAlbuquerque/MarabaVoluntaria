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
import { useSession } from "next-auth/react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import ModalConfirmClosePost from "@/components/ModalConfirmClosePost/ModalConfirmClosePost";
import LoadingHome from "../LoadingHome/LoadingHome";

export default function PostInfo({postId}){

    const router = useRouter()

    const [post, setPost] = useState(null)
    const [postDescription, setPostDescription] = useState(null)
    const [postAbout, setPostAbout] = useState(null)
    const [postWeeklyHours, setPostWeeklyHours] = useState(null)
    const [postOwner, setPostOwner] = useState(null)
    const [foundPost, setFoundPost] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isPostOwner, setIsPostOwner] = useState(false)
    const [isEditting, setIsEditting] = useState(false)
    const {data: session, status} = useSession()
    const [toggleModalClosePost,setToggleModalClosePost] = useState(false)

    async function getPostInfos(){
        if(isLoading){
            const findPost = await request(`post/${String(postId)}`)
            if(findPost.ok){
                setPost(findPost.post)
                setPostDescription(findPost.post.description)
                setPostAbout(findPost.post.about)
                setPostWeeklyHours(findPost.post.weeklyHours)
                
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
        }else{
            if(session && postOwner){
                if(session.user.id === postOwner._id){
                    setIsPostOwner(true)
                }
            }
        }
    }

    async function reloadAfterClose(){
        const findPost = await request(`post/${String(postId)}`)
        if(findPost.ok){
            setPost(findPost.post)
            setPostDescription(findPost.post.description)
            setPostAbout(findPost.post.about)
            setPostWeeklyHours(findPost.post.weeklyHours)
            
            const findOwner = await request(`ong/${findPost.post.owner}`)     
            setIsLoading(false)
            if(findOwner.ok){
                setPostOwner(findOwner.ong)
            }else{
                Notification('error', "Problema ao encontrar o dono da vaga!")
                router.push('/')
            }
        }
    }

    async function handleEdit(){
        let res = await request(`post/editar/${postId}`, 'PUT', {description: postDescription, about: postAbout, weeklyHours: postWeeklyHours}, `Bearer ${session.user.accessToken}`)

        if(res.ok){
            Notification("success", "Vaga alterada com sucesso!")
            setIsEditting(false)
            setPost(res.result)
        }else{
            Notification("error", "Falha ao alterar vaga!")
        }
    }

    function cancelEdit(){
        setPostDescription(post.description)
        setPostAbout(post.about)
        setPostWeeklyHours(post.weeklyHours)
        setIsEditting(false)
    }

    useEffect(()=>{
        getPostInfos()
    })


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
                        <div className="w-full">
                            <div className="flex flex-col gap-3 max-[1000px]:my-5 max-[700px]:ml-4">
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold">
                                        {post.title}
                                    </h1>
                                    <p className="text-sm font-semibold text-gray-400">Publicada em 11/10/2023</p>
                                </div>
                                <div>
                                    {!isEditting ? (
                                        <p>{postDescription}</p>
                                    ) : (
                                        <textarea className="border-2 border-gray-600 resize-none p-3 rounded-md w-4/5" value={postDescription} onChange={({target})=>setPostDescription(target.value)}/>
                                    )}
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
                            <div className="mt-3">
                                {!isPostOwner ? (
                                    <SubscribeButton postId={postId} isClosed={post.isClosed}/>
                                ):(
                                    !post.isClosed ?
                                        <div className="flex gap-2">
                                            {!isEditting? (
                                                <>
                                                    <button className="px-2 py-3 bg-blue-400 flex-1 rounded-md text-white hover:bg-blue-300" onClick={()=>setIsEditting(true)}>Editar Vaga</button>
                                                    <button className="px-2 py-3 bg-red-400 flex-3 rounded-md text-white hover:bg-red-300" onClick={()=>setToggleModalClosePost(!toggleModalClosePost)}>Fechar Vaga</button>
                                                </>
                                            ):(
                                                <>
                                                    <button className="px-2 py-3 bg-green-400 flex-1 rounded-md text-white hover:bg-green-300" onClick={handleEdit}>Confirmar Edição</button>
                                                    <button className="px-2 py-3 bg-red-400 flex-3 rounded-md text-white hover:bg-red-300" onClick={cancelEdit}>Cancelar</button>
                                                </>
                                            )}
                                        </div>
                                    :
                                        <div className="bg-red-500 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                                            <BsFillPersonPlusFill className="text-lg"/>
                                                <p>Este post já foi encerrado</p>
                                        </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                         {!isEditting ? (
                            <div className="ml-60 w-9/12 mr-8 flex flex-col max-[1000px]:ml-32 max-[700px]:ml-4">
                                <div className="text-sm flex flex-col gap-1.5 border-y-2 py-3">
                                    <h1 className="text-gray-700 font-bold text-lg">Sobre a vaga</h1>
                                    <p>{postAbout}</p>
                                </div>
                                <div className="py-3 border-b-2">
                                    <h1 className="text-gray-700 font-bold text-lg">Horários</h1>
                                    <div className="flex items-center gap-2">
                                        <AiOutlineClockCircle className="text-xl"/>
                                        <p>{postWeeklyHours} Horas Semanais</p>
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
                         ): (
                            <div className="ml-60 w-9/12 mr-8 flex flex-col max-[1000px]:ml-32 max-[700px]:ml-4">
                                <div className="text-sm flex flex-col gap-1.5 border-y-2 py-3">
                                    <h1 className="text-gray-700 font-bold text-lg">Sobre a vaga</h1>
                                    <textarea className="border-2 border-gray-600 resize-none p-3 rounded-md" value={postAbout} onChange={({target})=>setPostAbout(target.value)}/>
                                </div>
                                <div className="py-3 border-b-2">
                                    <h1 className="text-gray-700 font-bold text-lg">Horários</h1>
                                    <div className="flex items-center gap-2">
                                        <AiOutlineClockCircle className="text-xl"/>
                                        <p><input  className="border-2 border-gray-600 resize-none p-1 w-10 text-center rounded-md" type="number" value={postWeeklyHours} onChange={({target})=>setPostWeeklyHours(target.value)}/> Horas Semanais</p>
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
                         )}
                    </div>
                    {isPostOwner && (
                        <div className="ml-60 flex max-[1000px]:ml-32 max-[700px]:ml-4">
                            <PostSubcribers subscribers={post.volunteers}/>
                        </div>
                    )}

                    {toggleModalClosePost ? <ModalConfirmClosePost setToggleModal={setToggleModalClosePost} reloadFunction={reloadAfterClose} toggleModal={toggleModalClosePost} token={session.user.accessToken} postId={post._id}/> : null}
                </main>
            ):(
                <LoadingHome/>
            )}
        </>
    )
}