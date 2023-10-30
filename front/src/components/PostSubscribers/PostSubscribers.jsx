'use client'
import Image from "next/image"
import pfpteste from '@/components/PostSubscribers/pfpteste.jpg'
import { useEffect, useState } from "react"
import request from "@/helpers/request"

export default function PostSubcribers({subscribers}){

    const[users, setUsers] = useState(false)
    
    async function getUsers(){
        let newList = []

        for(let userId of subscribers){
            const res = await request(`user/user/${userId}`)
            // RESPOSTA: {ok: true, user:{email, name, phonenumber, postInscriptions, profPicture, role, _id}}
            if(res.ok){
                newList.push(res.user)
            }
        }   

        // const newList = await subscribers.forEach(async(subscriberId) => {
        //     const res = await request(`user/user/${subscriberId}`)
        //     // RESPOSTA: {ok: true, user:{email, name, phonenumber, postInscriptions, profPicture, role, _id}}
        //     if(res.ok){
        //         return await res.user
        //     }
        // });
        
        newList !== 0 ? setUsers(newList) : setUsers(null)
    }

    useEffect(()=>{
        getUsers()
    }, [])

    return(
                <div className="p-3 w-1/4 divide-y">
                    
                <h1 className="font-bold text-xl text-gray-600">Inscritos na vaga</h1>
                {users ? (
                    <div className="mt-4 overflow-auto h-60 divide-y-2 flex flex-col gap-4 justify-start">
                    {users.map((element, index) => (
                        <div className=" pt-2 flex gap-6 justify-start" key={index+1}>
                            <div className="w-20 h-20">
                                <Image
                                    className="rounded-full"
                                    src={pfpteste}
                                    layout="responsive"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="flex flex-col">
                                {console.log(element)}
                                <strong>Name:</strong> {element.name}
                                <strong>Phone:</strong> {element.phoneNumber}
                            </div>
                        </div>
                    ))}
                </div>
                ):(
                    <h1>Este post não possui inscritos!</h1>
                )
            }
            </div>
                
    )

}