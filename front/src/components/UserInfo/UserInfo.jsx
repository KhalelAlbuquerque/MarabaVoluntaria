'use client'

import fotoUser from '@/app/(dynamics)/myProfile/fotoUser.jpg'
import { useEffect, useState } from 'react'
import request from '@/helpers/request'
import Notification from '../Notifier/Notification'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import UserOverview from '../UserOverview/UserOverview'


export default function UserInfo({userId}){

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showOverview, setShowOverview] = useState(true)
    const router = useRouter()

    async function getUserInfo(){
        const res = await request(`user/653674dd46e012463546014f`)
        if(res.ok){
            setUser(res.user)
        }
    }

    function overview(){
        setShowOverview(true)
    }

    useEffect(()=>{
        getUserInfo()
        setIsLoading(false)
    }, [userId])


    return(
        <div className="m-auto w-4/5 bg-gray-200 p-20" style={{height: 600}}>
            {isLoading ? (
                <>carregando...</>
            ):(
                <>
                    {user ? (
                        <div className='flex gap-10'>
                           <aside className='w-1/5 flex flex-col items-center h-96 bg-gray-400'>
                                <Image src={fotoUser} className='rounded-full' height={200} width={200}/>
                                <p className='font-bold text-center mt-4'>{user.name}</p>
                                <div className='mt-5 divide-gray flex flex-col w-full'>
                                    <div 
                                        className='cursor-pointer border-transparent border-b-gray-900 border-2 py-1' 
                                        onClick={overview}
                                    >Visão geral</div>
                                </div>
                           </aside>
                           <main className='w-4/5'>
                                <UserOverview user={user}/>
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