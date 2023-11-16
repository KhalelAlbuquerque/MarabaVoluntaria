'use client'
import { BsCheck2 } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import request from "@/helpers/request"
import Notification from "../Notifier/Notification"
import { useSession } from 'next-auth/react'

export default function ButtonsApprovePost({id}){

    const {data:session, status} = useSession()

    async function approvePost(){
        if(!session) return Notification("warning", "Espere a sessão carregar")
        const res = await request(`admin/approvePost/${id}`, "POST", {}, `Bearer ${session.user.accessToken}`)
        if(res.ok){
            Notification('success', "Post Aprovado!")
        }else{
            Notification('error', res.message)
        }
    }

    async function reprovePost(){
        if(!session) return Notification("warning", "Espere a sessão carregar")
        const res = await request(`admin/reprovePost/${id}`, "POST", {}, `Bearer ${session.user.accessToken}`)

        if(res.ok){
            Notification('success', "Post Reprovado!")
        }else{
            Notification('error', res.message)
        }
    }

    return(
        <>
            <div onClick={approvePost} className='h-1/2 flex items-center border-b-2 hover:bg-green-500 hover:text-white hover:font-bold transition-colors duration-400'>
                <BsCheck2 className='text-4xl mx-3'/>
            </div>
            <div onClick={reprovePost} className='h-1/2 flex items-center hover:bg-red-500 hover:text-white hover:font-bold transition-colors duration-400'>
                <AiOutlineClose className='text-4xl mx-3'/>
            </div>
        </>
    )
}