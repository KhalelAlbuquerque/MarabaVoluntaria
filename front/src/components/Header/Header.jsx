'use client'

import { FaHandshake } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { LuHeartHandshake } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

import React, {useState, useEffect} from "react";
import Link from "next/link.js";

import { useSession, signOut } from "next-auth/react";
import InputSearch from "../InputSearch/InputSearch.jsx";

export default function Header(){

    const {data: session, status} = useSession()
    const [toggleSide, setToggleSide] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)

    const [search,setSearch] = useState()

    function toggleSideBar(){
        setToggleSide(!toggleSide)
    }

    function handleUserBar(){
        setToggleUser(!toggleUser)
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
            <header className="flex relative max-[433px]:px-0 min-[520px]:px-8 justify-between lg:px-28 py-3 justify- items-center bg-sky-300 min-[433px]:px-2 min-[1600px]:pr-48">
                <div className="cursor-pointer flex lg:hidden border-2 border-sky-200 p-2 rounded-full hover:scale-110 transition-transform min-[360px]:absolute max-[360px]:flex duration-300" onClick={toggleSideBar}>
                    {toggleSide ? <IoMdClose className="text-gray-500 text-3xl"/> : <GiHamburgerMenu className='text-gray-500 text-3xl hover:scale-105 transition-transform duration-300'/>}
                </div>
                <div className="min-[432px]:flex min-[432px]:items-center gap-8 min-[360px]:mx-auto">
                    <Link href={'/'}>
                        <FaHandshake className="text-6xl max-[1024px]:hidden"/>
                    </Link>
                    <InputSearch setChange={setSearch} />
                </div>
                <div className="flex gap-4 items-center font-semibold max-[1024px]:hidden text-sky-950 transition-colors duration-300">
                    <Link href={"/"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-pointer hover:scale-110 transition-transform duration-300">Home</Link>
                    <Link href={"/ajuda"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-help hover:scale-110 transition-transform duration-300">Ajuda</Link>
                    { status === 'authenticated'
                    ? <p className="hover:text-gray-500 border-gray-500 cursor-pointer" onClick={handleUserBar}><CgProfile className="text-3xl hover:scale-110 transition-transform duration-300"/></p>
                        // <Image className="cursor-pointer rounded-full" src={`data:image/jpeg;base64,${img}`} width={40} height={40} onClick={ActiveUserBar}/>
                    : (
                        <div className="flex gap-2">
                            <Link href={"/login_ong"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-pointer hover:scale-105 transition-transform duration-300">Sou uma ONG</Link>
                            <Link href={"/login"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-pointer hover:scale-105 transition-transform duration-300">Login</Link>
                        </div>
                    )}
                </div>
                <div className="sm:flex md:flex lg:hidden max-[432px]:hidden ">
                    {session
                    ? <p className="hover:text-gray-500 border-gray-500 cursor-pointer" onClick={handleUserBar}><CgProfile className="text-4xl hover:scale-110 transition-transform duration-300"/></p> 
                    : <p><FaHandshake className="text-6xl"/></p>}
                </div>
            </header>
            {toggleUser ? (
                <div className="absolute z-10 w-60 h-52 right-0 bg-white border-2 rounded-b-2xl animate-fade-in">
                    {session.user.name ? (
                        <div className="flex justify-between p-3">
                        <p className="text-gray-800 text-xl font-bold">
                            {session.user.name 
                            ? `Olá, ${session.user.name}` 
                            : null}
                        </p>
                        <p className="cursor-pointer font-bold" onClick={handleUserBar}><AiOutlineCloseCircle className="text-2xl"/></p>
                    </div>
                    ) : null}
                    <div className={`flex gap-2 items-center justify 
                        ${session.user.role === 'Admin' 
                        ? 'pt-2 pl-3' 
                        : 'pl-3'}`}
                    >
                        <p className={`font-semibold text-lg 
                            ${!session.user.role === "Admin"
                            ? 'mt-3' 
                            : 'mt-2'}`}
                        >
                            {session.user.role === 'Ong' 
                            ? <Link className="flex items-center hover:text-gray-500 duration-300 transition-transform hover:scale-110" href={"/ong"}><MdKeyboardDoubleArrowRight className="text-xl"/> Minha ONG</Link> 
                            : session.user.role === 'User' 
                            ? <Link className="flex items-center hover:text-gray-500 duration-300 transition-transform hover:scale-110" href={"/myProfile"}><MdKeyboardDoubleArrowRight className="text-xl"/> Meu perfil</Link>
                            : session.user.role === 'Admin'
                            ? <div className="flex flex-col gap-1">
                                    <Link className="hover:underline hover:text-gray-500 duration-300 hover:scale-110 flex items-center" href={"/myProfile"}><MdKeyboardDoubleArrowRight className="text-xl hover:text-green-500"/> Meu perfil</Link>
                                <Link className="hover:underline hover:text-gray-500 duration-300 flex items-center transition-transform hover:scale-110" href={"/admin/approve-posts"}><MdKeyboardDoubleArrowRight className="text-xl hover:text-green-500"/> Gerenciar Posts</Link>
                              </div>
                            : null}</p>
                    </div>
                    <div className="absolute bottom-0 rounded-b-2xl py-2 px-3  w-full bg-red-500 text-white">
                        <p onClick={() => {
                            signOut()
                            handleUserBar()
                        }} className="cursor-pointer">Fazer Logout</p>
                    </div>
                </div>
            ): null}
            {toggleSide ? (
                <div className="absolute z-10 w-full h-52 bg-white border-b-2 rounded-b-2xl py-8 animate-fade-in">
                    <div className="w-72 mx-auto flex flex-col gap-3">
                        <Link href={"/"} className="flex gap-2 cursor-pointer items-center">
                            <p> <AiOutlineHome className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                            <p className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Home</p>
                        </Link>
                        <Link href={"/login_ong"} className="flex gap-2 cursor-pointer items-center">
                            <p><LuHeartHandshake className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                            <p className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Sou uma ONG</p>
                        </Link>
                        <Link href={"/login"} className="flex gap-2 cursor-pointer items-center">
                            <p><CiLogin className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                            <p className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Login</p>
                        </Link>
                        <Link href={"/ajuda"} className="flex gap-2 cursor-help items-center">
                            <p><LuHelpCircle className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                            <p className="text-sky-950 hover:text-gray-500 hover:underline transition-colors duration-300">Ajuda</p>
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    )
}