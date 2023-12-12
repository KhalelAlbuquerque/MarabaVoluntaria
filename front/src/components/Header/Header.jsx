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
import { MdKeyboardDoubleArrowRight, MdOutlineAdminPanelSettings } from 'react-icons/md'
import { SiWorldhealthorganization } from 'react-icons/si'
import { IoLogOutOutline } from 'react-icons/io5'

import React, {useState, useEffect} from "react";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import InputSearch from "../InputSearch/InputSearch.jsx";
import gifLoading from '@/components/Loading/loading.gif'

import request from '@/helpers/request'

export default function Header(){

    const {data: session, status} = useSession()
    const [imageUser,setImageUser] = useState('')
    const [toggleSide, setToggleSide] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const [activeLoadingProfile, setActiveLoadingProfile] = useState(false)
    const [activeLoadingAdmin, setActiveLoadingAdmin] = useState(false)
    const [loading,setLoading] = useState(false)
    const router = useRouter()

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

    function activeGifLoading(){
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        },3000)
      }

    function activeProfileLoading(){
        setActiveLoadingProfile(true)
        setTimeout(() => {
            setActiveLoadingProfile(false)
        },3000)
    }
    function activeAdminLoading(){
        setActiveLoadingAdmin(true)
        setTimeout(() => {
            setActiveLoadingAdmin(false)
        },3000)
    }


    async function getUser(){
        // let type;
        let res
        if (session.user.role === 'Ong') {
            res = await request(`ong/${session.user.id}`)
            console.log('FETCH ONG +=================== +=================== +=================== +=================== +=================== +=================== +=================== +===================')
            const imageUrl = res.ong.profPicture.image.image
            setImageUser(imageUrl)
            localStorage.setItem('image', res.ong.profPicture.image.image)
            return
        } else{
            res = await request(`user/${session.user.id}`)
            console.log('FETCH USER +=================== +=================== +=================== +=================== +=================== +=================== +=================== +===================')
            const imageUrl = res.user.profPicture.image.image
            setImageUser(imageUrl)
            localStorage.setItem('image', res.user.profPicture.image.image)
            return
        }

    }

    let imageStorage
    useEffect(() => {
        imageStorage = localStorage.getItem('image')
        if (!imageStorage){
            if (status === 'authenticated') {
                getUser()
            }
        } else {
            setImageUser(imageStorage)
            console.log('storage')
        }
    },[session,status,imageUser])

    return (
        <div>
            <header className="flex relative max-[433px]:px-0 min-[520px]:px-8 justify-between lg:px-28 py-3 justify- items-center bg-sky-300 min-[433px]:px-2 min-[1600px]:pr-48">
                <div className="cursor-pointer flex lg:hidden border-2 border-sky-200 p-2 rounded-full hover:scale-110 transition-transform min-[360px]:absolute max-[360px]:flex duration-300" onClick={toggleSideBar}>
                    {toggleSide ? <IoMdClose className="text-gray-500 text-3xl"/> : <GiHamburgerMenu className='text-gray-500 text-3xl hover:scale-105 transition-transform duration-300'/>}
                </div>
                <div className="min-[432px]:flex min-[432px]:items-center gap-8 min-[360px]:mx-auto">
                    <Link href={'/'}>
                        <FaHandshake className="hover:scale-90 hover:text-gray-500 duration-500 text-6xl max-[1024px]:hidden"/>
                    </Link>
                    <InputSearch setChange={setSearch} />
                </div>
                <div className="flex gap-4 items-center font-semibold max-[1024px]:hidden text-sky-950 transition-colors duration-300">
                    <Link href={"/"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-pointer hover:scale-110 transition-transform duration-300">Home</Link>
                    <Link href={"/ajuda"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-help hover:scale-110 transition-transform duration-300">Ajuda</Link>
                    { status === 'authenticated'
                    ? <Image onClick={handleUserBar} src={imageUser} width={30} height={30} alt='Imagem de perfil usuário' className="hover:border-[1px] cursor-pointer hover:border-gray-700 hover:scale-110 transition-transform duration-300 w-[35px] h-[35px] rounded-full"/>
                        // <Image className="cursor-pointer rounded-full" src={`data:image/jpeg;base64,${img}`} width={40} height={40} onClick={ActiveUserBar}/>
                    : (
                        <div className="flex gap-2">
                            <Link href={"/login_ong"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-pointer hover:scale-105 transition-transform duration-300">Sou uma ONG</Link>
                            <Link href={"/login"} className="hover:text-gray-500 hover:border-b-2 border-gray-500 cursor-pointer hover:scale-105 transition-transform duration-300">Login</Link>
                        </div>
                    )}
                </div>
                <Link href='/' className="sm:flex md:flex lg:hidden max-[432px]:hidden hover:scale-95 hover:text-gray-700 duration-300 cursor-pointer">
                    {session
                    ? <Image onClick={handleUserBar} src={imageUser} width={50} height={50} alt='Imagem de perfil usuário' className="hover:border-[1px] cursor-pointer hover:border-gray-700 hover:scale-110 transition-transform duration-300 w-[40px] h-[40px] rounded-full"/>
                    : <p><FaHandshake className="text-6xl"/></p>}
                </Link>
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
                        <div className={`font-semibold text-lg 
                            ${!session.user.role === "Admin"
                            ? 'mt-3' 
                            : 'mt-2'}`}
                        >
                            {session.user.role === 'Ong' 
                            ? (
                                <div className="flex gap-4">
                                    <Link onClick={activeGifLoading} className="flex items-center hover:text-gray-500 duration-300 transition-transform hover:scale-110" href={"/myOng"}><MdKeyboardDoubleArrowRight className="text-xl"/> Minha ONG</Link> 
                                    {loading ? <Image className="text-center" alt='gif de loading' src={gifLoading} height={25}/> : null}
                                </div>
                            )
                            : session.user.role === 'User' 
                            ? (
                                <div className="flex gap-4">
                                    <Link onClick={activeGifLoading} className="flex items-center hover:text-gray-500 duration-300 transition-transform hover:scale-110" href={"/myProfile"}><MdKeyboardDoubleArrowRight className="text-xl"/> Meu perfil</Link>
                                    {loading ? <Image className="text-center" alt='gif de loading' src={gifLoading} height={25}/> : null}
                                </div>
                            )
                            : session.user.role === 'Admin'
                            ? (
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-1">
                                        <Link onClick={activeProfileLoading} className="hover:underline hover:text-gray-500 duration-300 hover:scale-110 flex items-center" href={"/myProfile"}><MdKeyboardDoubleArrowRight className="text-xl hover:text-green-500"/> Meu perfil</Link>
                                        <Link onClick={activeAdminLoading} className="hover:underline hover:text-gray-500 duration-300 flex items-center transition-transform hover:scale-110" href={"/admin/approve-posts"}><MdKeyboardDoubleArrowRight className="text-xl hover:text-green-500"/> Gerenciar Posts</Link>
                                    </div>
                                    {activeLoadingProfile ? (
                                        <div>
                                            <Image className="text-center" alt='gif de loading' src={gifLoading} height={25}/>
                                        </div>
                                    ) : activeLoadingAdmin ? (<div>
                                            <Image className="text-center mt-8" alt='gif de loading' src={gifLoading} height={25}/>
                                        </div>) : null}
                                </div>
                            )
                            : null}</div>
                    </div>
                    <div className="absolute bottom-0 rounded-b-2xl py-2 px-3  w-full bg-red-500 text-white">
                        <p onClick={() => {
                            localStorage.clear()
                            setTimeout(() => {
                                signOut()
                                handleUserBar()
                                router.push('/')
                            }, 0)
                        }} className="cursor-pointer">Fazer Logout</p>
                    </div>
                </div>
            ): null}
            {toggleSide ? (
                <div className="absolute z-10 w-full h-52 bg-white border-b-2 rounded-b-2xl py-8 animate-fade-in">
                    <div className="w-72 mx-auto flex flex-col gap-3">
                        <Link href={"/"} className="flex gap-2 cursor-pointer items-center">
                            <p> <AiOutlineHome className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                            <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Home</p>
                        </Link>
                        {status !== 'authenticated' ? (
                            <div className="flex flex-col gap-3">
                                <Link href={"/login_ong"} className="flex gap-2 cursor-pointer items-center">
                                    <p><LuHeartHandshake className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                                    <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Sou uma ONG</p>
                                </Link>
                                <Link href={"/login"} className="flex gap-2 cursor-pointer items-center">
                                    <p><CiLogin className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                                    <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Login</p>
                                </Link>
                            </div>
                        ) : session.user.role === 'User' ? (
                            <Link className="flex gap-2" href={'myProfile'}>
                                <CgProfile className="text-2xl hover:text-sky-300 transition-colors duration-300"/>
                                <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Meu Perfil</p>
                            </Link>
                        ) : session.user.role === 'Ong' ? (
                            <Link className="flex gap-2" href={'myOng'}>
                                <SiWorldhealthorganization className="text-2xl hover:text-sky-300 transition-colors duration-300"/>
                                <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Minha Ong</p>
                            </Link>
                        ) : session.user.role === 'Admin' ? (
                            <div className="flex flex-col gap-3">
                                <Link href={'myProfile'} className="flex gap-2">
                                    <CgProfile className="text-2xl hover:text-sky-300 transition-colors duration-300"/>
                                    <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Meu perfil</p>
                                </Link>
                                <Link href={"/admin/approve-posts"} className="flex gap-2">
                                    <MdOutlineAdminPanelSettings className="text-2xl hover:text-sky-300 transition-colors duration-300"/>
                                    <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Gerenciar Posts</p>
                                </Link>
                            </div>
                        ) : null }
                        <Link href={"/ajuda"} className="flex gap-2 cursor-help items-center">
                            <p><LuHelpCircle className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                            <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Ajuda</p>
                        </Link>
                        {status === 'authenticated' ? (
                            <div onClick={() => {
                                signOut()
                                toggleSideBar()
                            }} className="flex gap-2 cursor-pointer items-center">
                                <p><IoLogOutOutline className="text-2xl hover:text-sky-300 transition-colors duration-300"/></p>
                                <p className="text-sky-950 font-semibold hover:text-gray-500 hover:underline transition-colors duration-300">Sair da conta</p>
                            </div>
                        ): null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}