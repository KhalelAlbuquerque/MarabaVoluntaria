'use client'
import { FaSearch } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import InputSignIn from "../Input/InputSignIn.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { LuHeartHandshake } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";
import React, {useState, useEffect} from "react";
import Link from "next/link.js";

export default function Header(){

    const [toggleSide, setToggleSide] = useState(false)

    function toggleSideBar(){
        setToggleSide(!toggleSide)
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
            <header className="flex max-[433px]:px-0 min-[520px]:px-8 justify-between lg:px-28 py-6 justify- items-center bg-sky-300 min-[433px]:px-2 min-[1600px]:pr-48">
                <div className="flex lg:hidden border-2 border-sky-200 p-2 rounded-full" onClick={toggleSideBar}>
                    {toggleSide ? <IoMdClose className="text-gray-500 text-3xl"/> : <GiHamburgerMenu className='text-gray-500 text-3xl'/>}
                </div>
                <div className="flex gap-8 items-center">
                    <FaHandshake className="text-6xl max-[1024px]:hidden"/>
                    <InputSignIn type="text" name="search" icon={FaSearch} placeholder="Pesquisar..."/>
                </div>
                <div className="flex gap-4 items-center font-semibold max-[1024px]:hidden">
                    <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Home</a>
                    <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Sou uma ONG</a>
                    <Link href={"/login"} className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Login</Link>
                    <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Ajuda</a>
                </div>
                <div className="sm:flex md:flex lg:hidden max-[432px]:hidden ">
                    <FaHandshake className="text-6xl"/>
                </div>
            </header>
            {toggleSide ? (
                <div className="absolute w-full h-52 bg-white border-b-2 rounded-b-2xl py-8 animate-fade-in">
                    <div className="w-72 mx-auto flex flex-col gap-3">
                        <Link href={"/"} className="flex gap-2 items-center">
                            <AiOutlineHome className="text-2xl hover:text-sky-300"/>
                            <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Home</a>
                        </Link>
                        <Link href={"/"} className="flex gap-2 items-center">
                            <LuHeartHandshake className="text-2xl hover:text-sky-300"/>
                            <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Sou uma ONG</a>
                        </Link>
                        <Link href={"/"} className="flex gap-2 items-center">
                            <CiLogin className="text-2xl hover:text-sky-300"/>
                            <Link href={"/login"} className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Login</Link>
                        </Link>
                        <Link href={"/"} className="flex gap-2 items-center">
                            <LuHelpCircle className="text-2xl hover:text-sky-300"/>
                            <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Ajuda</a>
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    )
}