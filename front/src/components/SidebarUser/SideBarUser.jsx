'use client'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { LuHeartHandshake } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";
import React, {useState} from 'react'
import { BiLogOut } from "react-icons/bi";

export default function SideBarUser(){

    const [open,setOpen] = useState(false)
    const [close,setClose] = useState(true)


    function toggleSideBar(){
        setOpen(!open)
        setClose(!close)
    }

    return (
        <div className={`w-1/4 duration-500 border-r-2 border-gray-600 shadow-2xl h-screen bg-sky-300 ${open ? 'w-[300px]' : 'w-24'}`}>
            <div className="p-4" onClick={toggleSideBar}>
                {open ? <AiOutlineArrowLeft className="text-4xl"/> : <AiOutlineArrowRight className="text-4xl mx-auto"/>}
            </div>
            <div className={`flex flex-col justify-center items-start gap-4 mt-20 ${open ? 'pl-8' : 'items-center' }`}> 
                <Link href={"/"} className="flex gap-2 items-center cursor-pointer">
                    <AiOutlineHome className="text-4xl hover:text-white"/>
                    {open ? <Link href={"/"} className="text-sky-950 text-3xl hover:text-gray-500 hover:underline transition-colors duration-300">Home</Link> : null}
                </Link>
                <Link href={"/"} className="flex gap-2 items-center cursor-pointer">
                    <LuHeartHandshake className="text-4xl hover:text-white"/>
                    {open ? <Link href={"/cadastro_ong"} className="text-sky-950 text-3xl hover:text-gray-500 hover:underline transition-colors duration-300">Sou uma ONG</Link> : null}
                </Link>
                <Link href={"/"} className="flex gap-2 items-center cursor-pointer">
                    <CiLogin className="text-4xl hover:text-white"/>
                    {open ? <Link href={"/login"} className="text-sky-950 text-3xl hover:text-gray-500 hover:underline transition-colors duration-300">Login</Link> : null}
                </Link>
                <Link href={"/"} className="flex gap-2 items-center cursor-help">
                    <LuHelpCircle className="text-4xl hover:text-white"/>
                    {open ? <Link href={"/ajuda"} className="text-sky-950 text-3xl hover:text-gray-500 hover:underline transition-colors duration-300">Ajuda</Link>: null}
                </Link>
            </div>
            <div className={`fixed flex gap-2 bottom-0 cursor-pointer ${open ? 'pl-20 pb-3' : 'pl-5 pb-3'}`}>
                <BiLogOut className="text-4xl hover:text-white"/>
                {open ? <Link href={"/"} className="text-sky-950 text-3xl hover:text-gray-500 hover:underline transition-colors duration-300">Sair</Link> : null}
            </div>
        </div>   
    )
}