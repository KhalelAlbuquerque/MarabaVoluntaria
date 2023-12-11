'use client'

import fotoUser from './perfilUser-removebg-preview.png'
import { useEffect, useState } from 'react'
import request from '@/helpers/request'
import Notification from '../Notifier/Notification'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import UserOverview from '../UserOverview/UserOverview'
import LoadingHome from '../LoadingHome/LoadingHome'
import UserInfoChanger from "@/components/UserInfoChanger/UserInfoChanger"
import { useSession } from 'next-auth/react'


export default function UserInfo({userId, owner}){

    const [user, setUser] = useState(null)
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [showOverview, setShowOverview] = useState(true)
    const {data:session, status} = useSession()
    const [changeInfos, setChangeInfos] = useState(true)
    const router = useRouter()

    async function getUserInfo(){
        if (status === 'unauthenticated') {
            return router.push('/')
        }
        if(status !== 'loading'){
            if(session && session?.user.id === userId){
                router.push('/myProfile')
                return
            }

            let res
            let resImg
            if(owner){
                res = await request(`user/${session.user.id}`)
                if (res.user) resImg = await res.user.profPicture.image.image
            }else{
                                            //userId
                res = await request(`user/${userId}`)
                if (res.user) resImg = await res.user.profPicture.image.image
            }
            setIsLoading(false)
            if(res.ok){
                setUser(res.user)
                setImage(resImg)
            }
        }
    }

    function overview(){
        setShowOverview(true)
        setChangeInfos(false)
    }
    function changeInfo(){
        setChangeInfos(true)
        setShowOverview(false)
    }

    useEffect(()=>{
        getUserInfo()
    })


    return(
        <div className="flex justify-center items-center mx-auto p-20  max-[1000px]:px-4 max-[900px]:py-4">
            {isLoading ? (
                <LoadingHome/>
            ):(
                <>
                    {user ? (
                        <div className='flex gap-10 max-[1277px]:gap-2 max-[1100px]:gap-3 w-[90%] max-[1100px]:w-[900px] max-[900px]:flex max-[900px]:flex-col'>
                           <aside className='w-1/5 flex flex-col items-center h-96 max-[1100px]:w-56 bg-gray-400 rounded-md max-[900px]:w-full max-[900px]:flex-row max-[900px]:h-40'>
                                <Image alt='Foto do Usuário' src={image} className='rounded-full p-2 w-44 h-44 max-[900px]:w-32 max-[900px]:h-32' height={100} width={100}/>
                                
                                <p className='font-bold text-center mt-4 max-[900px]:mt-0 max-[900px]:text-2xl max-[900px]:w-[40rem]'>{user.name}</p>
                                <div className='mt-5 max-[900px]:mt-0 divide-gray flex flex-col w-full'>
                                    <div 
                                        className='cursor-pointer border-transparent border-b-gray-900 border-2 py-1 max-[900px]:text-2xl' 
                                        onClick={overview}
                                    >Visão geral</div>
                                    {owner && (
                                        <div 
                                            className='cursor-pointer border-transparent border-b-gray-900  max-[900px]:border-0 border-2 py-1 max-[900px]:text-2xl' 
                                            onClick={changeInfo}
                                        >Alterar cadastro</div>
                                    )}
                                </div>
                           </aside>
                           <main className='w-4/5 bg-blue-200 rounded-md p-5 max-[900px]:w-full'>
                                {showOverview ? (
                                    owner ? <UserOverview user={user} owner={true}/> : <UserOverview user={user} owner={false}/>
                                ):(
                                    <UserInfoChanger user={user} profPic={image}/>
                                )}
                           </main>
                        </div>
                    ):(
                        <p className='font-bold text-center'>USER NOT FOUND</p>
                    )}
                </>
            )}
        </div>
    )

}