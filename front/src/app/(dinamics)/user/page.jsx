'use client'
import Image from "next/image";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import fotoUser from './fotoUser.jpg'
import { useState } from "react";
export default function User(){

    var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    let userFetch = 'Josué'
    let emailFetch = 'ybadez@gmail.com'
    let numberFetch = '94984231330'

    const [user,setUser] = useState(userFetch)
    const [number,setNumber] = useState(numberFetch)
    const [email,setEmail] = useState(emailFetch)

    const [buttonEdit,setButtonEdit] = useState(false)

    function handleSubmit(e){
        e.preventDefault()
        if (RegExp.test(number)) {
            setNumber(number)
            setUser(user)
            setEmail(email)
        } else {
            setUser('')
            setEmail('')
            setNumber('')
            verifyRegex(number)
            alert("Padrao incorreto de telefone")
        }
    }


    function verifyRegex(regex){
        if (RegExp.test(regex)) {
            return 'ok'
        } else {
            return 'false'
        }
    }

    return (
        <div className="w-full">
            <div className="w-1/2 relative flex justify-center items-center bg-sky-300 mt-8 rounded-xl text-center mx-auto py-3 font-semibold">
                <FaRegArrowAltCircleRight className="absolute left-3 text-2xl"/>
                <h1>Seu perfil</h1>
            </div>
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
                        ) : <p className="text-lg">{user ? user : userFetch}</p>}
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
                        ): <p className="text-lg">{number ? number : numberFetch}</p>}
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
                    : <p className="text-lg">{email ? email : emailFetch}</p>}
                </form>
                {buttonEdit ? (
                    <div className="flex justify-center gap-5">
                        <button 
                            onClick={(e) => {
                                setButtonEdit(false);
                                handleSubmit(e)
                            }}
                            className="bg-green-500 px-5 py-3 rounded mt-2">Salvar perfil
                        </button>
                        <button 
                        onClick={() => setButtonEdit(false)}
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
        </div>
    )
}