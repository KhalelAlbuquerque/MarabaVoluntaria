'use client'

import { useSession } from "next-auth/react"
import Notification from "../Notifier/Notification"
import { useRouter } from "next/navigation"
import request from "@/helpers/request"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"
import { FaClock } from "react-icons/fa"
import { MdCancel } from "react-icons/md"
import { IoPersonRemove } from "react-icons/io5"

export default function SubscribeButton({postId, isClosed, postStatus}){
    const {data:session, status} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isApplied, setIsApplied] = useState(false)

    async function checkInscription(){
        if(session){
            const res = await request(`user/${session.user.id}`)

            const user = await res.user

            const posts = user.postInscriptions
            if(posts.includes(postId)){
                setIsApplied(true)
            }
        }
    }

    useEffect(()=>{
        if(session?.user.role !== 'Ong') checkInscription()
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
        <div className="max-[500px]:mx-3">
            <div>{isLoading && <Loading />}</div>
            {!isClosed ? (
                postStatus == 'pending' ? (
                    <div className="bg-orange-300 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                      <FaClock className="text-lg"/>
                          <p>Vaga está em análise</p>
                    </div>
                ):postStatus=='rejected' ? (
                    <div className="bg-red-500 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                        <MdCancel className="text-lg"/>
                            <p>Esta vaga foi recusada</p>
                    </div>
                ):
                !isApplied ? 
                (
                  <button onClick={handleApply} className="bg-sky-300 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                      <BsFillPersonPlusFill className="text-lg"/>
                          <p>Quero me inscrever</p>
                  </button>
              ):(
                  <button onClick={handleApply} className="bg-sky-300 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                      <IoPersonRemove className="text-lg"/>
                          <p>Desinscrever</p>
                  </button>
                )
            ):(
                <div className="bg-red-500 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                    <MdCancel className="text-lg"/>
                        <p>Este post já foi encerrado</p>
                </div>
            )}
        </div>
    )
}