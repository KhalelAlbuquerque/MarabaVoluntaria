'use client'

import { FaSearch } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { LuHeartHandshake } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";
import { AiOutlineCloseCircle } from "react-icons/ai";

import React, {useState, useEffect} from "react";
import Link from "next/link.js";
import Image from "next/image";
import InputSignIn from "../Input/InputSignIn.jsx";

import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext.jsx";

export default function Header(){
    
    const { user, img, ong, logout } = useContext(AuthContext)
    const [toggleSide, setToggleSide] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)

    function toggleSideBar(){
        setToggleSide(!toggleSide)
    }

    function ActiveUserBar(){
        setToggleUser(!toggleUser)
    }

    function DisableUserBar(){
        setToggleUser(false)
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1024) {
                setToggleSide(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])


    return (
        <div>
            <header className="flex max-[433px]:px-0 min-[520px]:px-8 justify-between lg:px-28 py-3 justify- items-center bg-sky-300 min-[433px]:px-2 min-[1600px]:pr-48">
                <div className="flex lg:hidden border-2 border-sky-200 p-2 rounded-full" onClick={toggleSideBar}>
                    {toggleSide ? <IoMdClose className="text-gray-500 text-3xl"/> : <GiHamburgerMenu className='text-gray-500 text-3xl'/>}
                </div>
                <div className="flex gap-8 items-center">
                    <FaHandshake className="text-6xl max-[1024px]:hidden"/>
                    <InputSignIn type="text" name="search" icon={FaSearch} placeholder="Pesquisar..."/>
                </div>
                <div className="flex gap-4 items-center font-semibold max-[1024px]:hidden text-sky-950 transition-colors duration-300">
                    <Link href={"/"} className="hover:text-gray-500 hover:underline cursor-pointer">Home</Link>
                    <Link href={"/ajuda"} className="hover:text-gray-500 hover:underline cursor-help">Ajuda</Link>
                    { ong || user ?
                        <Image className="cursor-pointer rounded-full" src={`data:image/jpeg;base64,${img}`} width={40} height={40} onClick={ActiveUserBar}/>
                    : (
                        <div className="flex gap-2">
                            <Link href={"/login_ong"} className="hover:text-gray-500 hover:underline cursor-pointer">Sou uma ONG</Link>
                            <Link href={"/login"} className="hover:text-gray-500 hover:underline cursor-pointer">{ong ? null : 'Login'}</Link>
                        </div>
                    )}
                </div>
                <div className="sm:flex md:flex lg:hidden max-[432px]:hidden ">
                    <FaHandshake className="text-6xl"/>
                </div>
            </header>
            {toggleUser ? (
                <div className="absolute z-10 w-60 h-52 right-0 bg-white border-2 rounded-b-2xl animate-fade-in">
                    <div className="flex justify-between p-3">
                        <p className="text-gray-800 text-xl font-bold">Olá, {user}</p>
                        <p className="cursor-pointer font-bold" onClick={DisableUserBar}><AiOutlineCloseCircle className="text-2xl"/></p>
                    </div>
                    <div className="flex gap-2 items-center justify p-3">
                        <p className="font-semibold text-lg mt-3">Meu perfil</p>
                    </div>
                    <div className="absolute bottom-0 rounded-b-2xl py-2 px-3  w-full bg-red-500 text-white">
                        <p onClick={() => {
                            logout()
                            DisableUserBar()
                        }} className="cursor-pointer">Fazer Logout</p>
                    </div>
                </div>
            ): null}
            {toggleSide ? (
                <div className="absolute z-10 w-full h-52 bg-white border-b-2 rounded-b-2xl py-8 animate-fade-in">
                    <div className="w-72 mx-auto flex flex-col gap-3">
                        <div className="flex gap-2 items-center cursor-pointer">
                            <Link href={"/"}><AiOutlineHome className="text-2xl hover:text-sky-300"/></Link>
                            <Link href={"/"} className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Home</Link>
                        </div>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <Link href={"/login_ong"}><LuHeartHandshake className="text-2xl hover:text-sky-300"/></Link>
                            <Link href={"/login_ong"} className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Sou uma ONG</Link>
                        </div>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <Link href={"/login"}><CiLogin className="text-2xl hover:text-sky-300"/></Link>
                            <Link href={"/login"} className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Login</Link>
                        </div>
                        <div className="flex gap-2 items-center cursor-help">
                            <Link href={"/ajuda"}><LuHelpCircle className="text-2xl hover:text-sky-300"/></Link>
                            <Link href={"/ajuda"} className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Ajuda</Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}