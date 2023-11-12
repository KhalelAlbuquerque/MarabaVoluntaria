'use client'

import fotoUser from './perfilUser-removebg-preview.png'
import { useEffect, useState } from 'react'
import request from '@/helpers/request'
import Notification from '../Notifier/Notification'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import UserOverview from '../UserOverview/UserOverview'
import LoadingHome from '../LoadingHome/LoadingHome'
import MyUserProfile from "@/components/MyUserProfile/MyUserProfile"


export default function UserInfo({userId}){

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showOverview, setShowOverview] = useState(true)
    const [changeInfos, setChangeInfos] = useState(true)
    const router = useRouter()

    async function getUserInfo(){
        const res = await request(`user/653674dd46e012463546014f`)
        if(res.ok){
            setUser(res.user)
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
        setIsLoading(false)
    }, [userId])


    return(
        <div className="flex justify-center items-center mx-auto p-20">
            {isLoading ? (
                <LoadingHome/>
            ):(
                <>
                    {user ? (
                        <div className='flex gap-10 max-[1277px]:gap-6 max-[1100px]:gap-3  w-4/5'>
                           <aside className='w-1/5 flex flex-col items-center h-96 bg-gray-400 rounded-md'>
                                <Image alt='Foto do Usuário' src={fotoUser} className='rounded-full p-2' height={200} width={200}/>
                                <p className='font-bold text-center mt-4'>{user.name}</p>
                                <div className='mt-5 divide-gray flex flex-col w-full'>
                                    <div 
                                        className='cursor-pointer border-transparent border-b-gray-900 border-2 py-1' 
                                        onClick={overview}
                                    >Visão geral</div>
                                    <div 
                                        className='cursor-pointer border-transparent border-b-gray-900 border-2 py-1' 
                                        onClick={changeInfo}
                                    >Alterar cadastro</div>
                                </div>
                           </aside>
                           <main className='w-4/5 bg-blue-200 rounded-md p-5'>
                                {showOverview ? (
                                    <UserOverview user={user}/>
                                ):(
                                    <MyUserProfile user={user}/>
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