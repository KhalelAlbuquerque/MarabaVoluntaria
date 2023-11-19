"use client"

import Image from "next/image";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import fotoUser from '@/components/UserInfo/perfilUser-removebg-preview.png'
import { useEffect, useState } from "react";

import Notification from "@/components/Notifier/Notification";
import {useRouter} from 'next/navigation'
import Loading from "../Loading/Loading";
import { useSession } from "next-auth/react";
import request from "@/helpers/request";

export default function UserInfoChanger({user, profPic}){
    var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    const [name,setName] = useState('')
    const [number,setNumber] = useState('')
    const [email,setEmail] = useState('')
    const [buttonEdit,setButtonEdit] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const {data:session, status} = useSession()
    const router = useRouter()

    useEffect(()=>{
        if(status == 'unauthenticated'){
            Notification('error', "Voce precisa estar logado!")
            router.push('/login')
            return
        }
        getUserInfo()
        setIsLoading(false)
    },[])


    async function getUserInfo(){
        if(!user) return 
        setName(user.name)
        setNumber(user.phoneNumber)
        setEmail(user.email) 
    }

    function checkInputs(){
        if(!verifyRegex(number)){
            Notification('error', "Número inválido!")
            return false
        } 
        return true
    }

    function closeButtonEdit(){
        setName(user.name)
        setNumber(user.phoneNumber)
        setEmail(user.email)
        setButtonEdit(false)
    }


    async function handleSubmit(e){
        e.preventDefault()
        if (checkInputs()) {
            // endpoint="", method='GET', body={}, bearer='null'
            const res = await request(`user/editar`, "PUT", {name, number, email}, `Bearer ${session.user.accessToken}`)
            
            if(res.ok){
                Notification('success', "Dados alterados com sucesso!")
                setButtonEdit(false)
            }else{
                Notification('error', "Erro ao alterar dados!")
            }
        }
    }


    function verifyRegex(regex){
        if (RegExp.test(regex)) {
            return true
        }
        return false
    }

    return (
        <div className="w-full">
            {!isLoading ? (
                <div className="p-4">
                    <Image src={profPic} alt="profile picture" className="w-48 h-48 rounded-full m-auto mb-6" height={100} width={100}/>
                    {!buttonEdit ? (
                        <div className="flex flex-col w-full">
                            <div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label><strong>Nome:</strong> {name}</label>
                                    </div>
                                    <div className="flex-1">
                                        <label><strong>Número:</strong> {number}</label>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label><strong>E-mail:</strong> {email}</label>
                                </div>
                            </div>
                            <button onClick={setButtonEdit} className="m-auto mt-4 bg-blue-400 w-fit rounded-md p-3">
                                Editar perfil
                            </button>
                        </div>
                    ):(
                        <div className="flex flex-col w-full">
                            <div>
                                <div className="flex gap-4">
                                    <div className="flex-1 flex flex-col">
                                        <label><strong>Nome:</strong></label>
                                        <input className="w-full border-2 border-gray-500 p-2 rounded-md" value={name} onChange={({target}) => setName(target.value)}/>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <label><strong>Número:</strong></label>
                                        <input className="w-full border-2 border-gray-500 p-2 rounded-md" value={number} onChange={({target}) => setNumber(target.value)}/>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label><strong>E-mail:</strong></label>
                                    <input className="w-full border-2 border-gray-500 p-2 rounded-md" value={email} onChange={({target}) => setEmail(target.value)}/>
                                </div>
                            </div>
                            <div className="w-full flex justify-center mt-4 gap-4">
                                <button onClick={handleSubmit} className="bg-green-400 w-fit rounded-md p-3 border-2 border-green-600">
                                    Salvar Perfil
                                </button>
                                <button onClick={closeButtonEdit} className="bg-red-400 w-fit rounded-md p-3 border-2 border-red-600">
                                    Cancelar Alterações
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ):(
                <Loading/>
            )}
        </div>
    )
}