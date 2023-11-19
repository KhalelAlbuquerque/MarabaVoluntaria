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
                const resImg = await request(`image/${res.user.profPicture}`)
                res.user.profPicture = resImg.image
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
                <div className="w-full ">
                    
                <h1 className="font-bold text-xl text-gray-600">Inscritos na vaga</h1>
                {users ? (
                    <div className="mt-4 overflow-auto h-60  flex-col gap-4 justify-start">
                    {users.map((element, index) => (
                        <Link key={index+1} href={`/user/${element._id}`}>
                            <div className=" pt-2 flex gap-6 justify-start">
                                <div className="w-20 h-20">
                                    <Image
                                        className="rounded-full"
                                        src={element.profPicture}
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                        alt="Imagem de Usuário"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <strong>Name:</strong> {element.name}
                                    <strong>Phone:</strong> {element.phoneNumber}
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