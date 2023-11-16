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
    const [isLoading, setIsLoading] = useState(true)
    const [showOverview, setShowOverview] = useState(true)
    const {data:session, status} = useSession()
    const [changeInfos, setChangeInfos] = useState(true)
    const [isOwner, setIsOwner] = useState(false)
    const router = useRouter()

    async function getUserInfo(){
        if(status !== 'loading'){
            if(session && session?.user.id === userId){
                router.push('/myProfile')
                return
            }

            let res
            if(owner){
                                            //session.user.id / 653674dd46e012463546014f / 65468c7db76d4bd201935a5d
                res = await request(`user/${session.user.id}`)
            }else{
                                            //userId
                res = await request(`user/6540ecd035f22064de79ed90`)
            }
            setIsLoading(false)
            if(res.ok){
                setUser(res.user)
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
                                    {owner && (
                                        <div 
                                            className='cursor-pointer border-transparent border-b-gray-900 border-2 py-1' 
                                            onClick={changeInfo}
                                        >Alterar cadastro</div>
                                    )}
                                </div>
                           </aside>
                           <main className='w-4/5 bg-blue-200 rounded-md p-5'>
                                {showOverview ? (
                                    owner ? <UserOverview user={user} owner={true}/> : <UserOverview user={user} owner={false}/>
                                ):(
                                    <UserInfoChanger user={user}/>
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