'use client'

import { useSession } from "next-auth/react"
import Notification from "../Notifier/Notification"
import { useRouter } from "next/navigation"
import request from "@/helpers/request"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"

export default function SubscribeButton({postId}){
    const {data:session, status} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isApplied, setIsApplied] = useState(false)

    async function checkInscription(){
        if(session){
            const res = await request(`user/${session.user.id}`)

            const user = await res.user

            const posts = user.postInscriptions
            console.log(posts.includes(postId))
            console.log(postId)
            if(posts.includes(postId)){
                setIsApplied(true)
            }
        }
    }

    useEffect(()=>{
        if(session?.user.role !== 'Ong') checkInscription()
        console.log(isApplied)
        setIsLoading(false)
    })

    async function handleApply(){
        setIsLoading(true)
        if(!session){
            router.push('/login')
            Notification('error', "Você precisa estar logado pra se candidatar!")  
            return
        }

        if(session.user.role === 'Ong'){
            Notification('error', 'Apenas usuários podem se cadastrar em vagas no momento, por hora, como ONG, solicite parceiria')
            return 
        }

        const user = session?.user

        if(!isApplied){
            const res = await request(`user/apply/${postId}`, "POST", {}, `Bearer ${user.accessToken}`)
            setIsLoading(false)

            if(res.ok){
                Notification('success', "Você se aplicou para a vaga!")
                setIsApplied(true)
                return
            }else{
                Notification('error', res.message)
                return
            }
        }else{
            const res = await request(`user/unapply/${postId}`, "POST", {}, `Bearer ${user.accessToken}`)
            setIsLoading(false)

            if(res.ok){
                Notification('success', "Você retirou sua inscrição na vaga!")
                setIsApplied(false)
                return
            }else{
                Notification('error', res.message)
                return
            }
        }
        

    }

    return(
        <div className="mt-3 max-[500px]:mx-3">
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