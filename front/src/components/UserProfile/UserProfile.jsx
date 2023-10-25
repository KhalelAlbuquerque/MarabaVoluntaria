"use client"

import Image from "next/image";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import fotoUser from '@/app/(dinamics)/user/fotoUser.jpg'
import { useEffect, useState } from "react";

import Notification from "@/components/Notifier/Notification";
import {useRouter} from 'next/navigation'
import Loading from "../Loading/Loading";

export default function UserProfile({userInfo}){

    const router = useRouter()

    var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    const [user,setUser] = useState(null)
    const [number,setNumber] = useState(null)
    const [email,setEmail] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{

        if(!userInfo?.name) {
            Notification("error", "User not found")
            router.push('/user-not-found')
            return
        }
        
        setIsLoading(false)
        setUser(userInfo.name)
        setNumber(userInfo.phoneNumber)
        setEmail(userInfo.email)

    }, [userInfo])

    const [buttonEdit,setButtonEdit] = useState(false)


    function checkInputs(){
        if(!verifyRegex(number)){
            Notification('error', "Número inválido!")
            return false
        } 
        setButtonEdit(false)
        return true
    }


    function handleSubmit(e){
        e.preventDefault()
        if (checkInputs()) {
            setNumber(number)
            setUser(user)
            setEmail(email)
        }
    }


    function verifyRegex(regex){
        if (RegExp.test(regex)) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="w-full">
            <div className="w-1/2 relative flex justify-center items-center bg-sky-300 mt-8 rounded-xl text-center mx-auto py-3 font-semibold">
                <FaRegArrowAltCircleRight className="absolute left-3 text-2xl"/>
                <h1>Seu perfil</h1>
            </div>
            {!isLoading ? (
                <div className="w-1/2 px-12 py-8 mx-auto bg-sky-300 rounded-xl mt-8 flex flex-col gap-3">
                    <div className="flex justify-center">
                        <Image
                        src={fotoUser}
                        alt="Foto do usuário"
                        width={130}
                        height={130}
                        className="rounded-full"
                        />
                    </div>
                    <div className={`flex gap-4 ${buttonEdit ? null : 'pl-12'}`}>
                        <div className={`w-1/2 gap-1 ${buttonEdit ? 'flex flex-col' : 'flex flex-row items-center'}`}>
                            <label className="font-semibold text-xl">Nome:</label>
                            {buttonEdit ? (
                                <input 
                                onChange={({target}) => setUser(target.value) } 
                                className="rounded px-3 py-2 border-2 border-zinc-400" 
                                type="text" 
                                value={user}
                                placeholder="Seu nome"/>
                            ) : <p className="text-lg">{user}</p>}
                        </div>
                        <div className={`w-1/2 gap-1 ${buttonEdit ? 'flex flex-col' : 'flex flex-row items-center'}`}>
                            <label className="font-semibold text-xl">Numero:</label>
                            {buttonEdit ? (
                                <input 
                                onChange={({target}) => setNumber(target.value)} 
                                className="rounded px-3 py-2 border-2 border-zinc-400" 
                                value={number}
                                type="text" 
                                placeholder="Seu numero"/>
                            ): <p className="text-lg">{number}</p>}
                        </div>
                    </div>
                    <form onSubmit={(e) => {
                        setButtonEdit(false)
                        handleSubmit(e)
                    }} className={`w-full gap-1 ${buttonEdit ? 'flex flex-col' : 'flex flex-row items-center pl-12'}`}>
                        <label className="font-semibold text-xl">Email:</label>
                        {buttonEdit 
                        ? (
                            <input
                            onChange={({target}) => setEmail(target.value)}
                            className="rounded px-3 py-2 border-2 border-zinc-400" 
                            type="email" 
                            value={email}
                            placeholder="Seu email" />) 
                        : <p className="text-lg">{email}</p>}
                    </form>
                    {buttonEdit ? (
                        <div className="flex justify-center gap-5">
                            <button 
                                onClick={(e) => {
                                    checkInputs;
                                    handleSubmit(e)
                                }}
                                className="bg-green-500 px-5 py-3 rounded mt-2">Salvar perfil
                            </button>
                            <button 
                            onClick={() => checkInputs}
                            className="bg-red-400 px-5 py-3 rounded mt-2">
                                Cancelar Alterações
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center mt-2">
                            <button onClick={() => setButtonEdit(true)} className="bg-sky-500 px-5 py-3 rounded">Editar Perfil</button>
                        </div>
                    )}
                </div>
            ):(
                <Loading/>
            )}
        </div>
    )
}