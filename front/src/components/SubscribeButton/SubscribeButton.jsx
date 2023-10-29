'use client'

import { useSession } from "next-auth/react"
import Notification from "../Notifier/Notification"
import { useRouter } from "next/navigation"
import request from "@/helpers/request"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"

export default function SubscribeButton(){
    const {data:session, status} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isApplied, setIsApplied] = useState(false)

    async function checkInscription(){
        if(session){
            const res = await request(`user/user/${session.user.id}`)
            const user = res.user
            const posts = user.postInscriptions
            if(posts.includes("652a2fb573d5c435ce67eea2")){
                setIsApplied(true)
            }
        }
    }

    useEffect(()=>{
        checkInscription()
        console.log(session)
        setIsLoading(false)
    })

    async function handleApply(){
        setIsLoading(true)
        if(!session){
            router.push('/login')
            Notification('error', "Você precisa estar logado pra se candidatar!")  
        }
        const user = session?.user

        if(!isApplied){
            const res = await request('user/apply/652a2fb573d5c435ce67eea2', "POST", {}, `Bearer ${user.accessToken}`)
            setIsLoading(false)

            if(res.ok){
                Notification('success', "Você se aplicou para a vaga!")
                setIsApplied(!isApplied)
                return
            }else{
                Notification('error', res.message)
                return
            }
        }else{
            const res = await request('user/unapply/652a2fb573d5c435ce67eea2', "POST", {}, `Bearer ${user.accessToken}`)
            setIsLoading(false)

            if(res.ok){
                Notification('success', "Você retirou sua inscrição na vaga!")
                setIsApplied(!isApplied)
                return
            }else{
                Notification('error', res.message)
                return
            }
        }
        

    }

    return(
        <div className="mt-3">
            <div>{isLoading && <Loading />}</div>
            {!isApplied ? 
              (
                <button onClick={handleApply} className="bg-sky-300 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                    <BsFillPersonPlusFill className="text-lg"/>
                        <p>Quero me inscrever</p>
                </button>
            ):(
                <button onClick={handleApply} className="bg-sky-300 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                    <BsFillPersonPlusFill className="text-lg"/>
                        <p>Desinscrever</p>
                </button>
              )}
        </div>
    )
}