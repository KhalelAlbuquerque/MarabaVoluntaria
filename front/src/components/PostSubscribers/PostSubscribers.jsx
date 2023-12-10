'use client'
import Image from "next/image"
import pfpteste from '@/components/PostSubscribers/pfpteste.jpg'
import { useEffect, useState } from "react"
import request from "@/helpers/request"
import Link from "next/link"

export default function PostSubcribers({subscribers}){

    const[users, setUsers] = useState(false)
    
    async function getUsers(){
        let newList = []

        for(let userId of subscribers){
            const res = await request(`user/${userId}`)
            // RESPOSTA: {ok: true, user:{email, name, phonenumber, postInscriptions, profPicture, role, _id}}
            if(res.ok){
                const resImg = await res.user.profPicture.image
                res.user.profPicture = resImg
                newList.push(res.user)
            }
        }   

        // const newList = await subscribers.forEach(async(subscriberId) => {
        //     const res = await request(`user/${subscriberId}`)
        //     // RESPOSTA: {ok: true, user:{email, name, phonenumber, postInscriptions, profPicture, role, _id}}
        //     if(res.ok){
        //         return await res.user
        //     }
        // });
        
        newList.length !== 0 ? setUsers(newList) : setUsers(null)
    }

    useEffect(()=>{
        getUsers()
    }, [])

    return(
            <div className="w-full bg-gray-200 p-4">
                    
                <h1 className="font-bold text-xl text-gray-600">Inscritos na vaga</h1>
                {users ? (
                    <div className="mt-4 overflow-auto h-60 py-4 px-6 flex gap-4 max-[1200px]:flex-col justify-center">
                        {users.map((element, index) => (
                            <Link className=" w-[45%] max-[1200px]:w-full max-[1350px]:w-[49%]" key={index+1} href={`/user/${element._id}`}>
                                <div className=" pt-2 flex gap-6 justify-start bg-white p-4 rounded-md shadow-2xl items-center">
                                    <div className="w-20 h-20">
                                        <Image
                                            className="rounded-full"
                                            src={element.profPicture.image}
                                            layout="responsive"
                                            width={100}
                                            height={100}
                                            alt="Imagem de Usuário"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <strong>Nome:</strong> {element.name}
                                        <strong>Telefone:</strong> {element.phoneNumber}
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                ):(
                    <h1>Este post não possui inscritos!</h1>
                )
            }
            </div>
                
    )

}