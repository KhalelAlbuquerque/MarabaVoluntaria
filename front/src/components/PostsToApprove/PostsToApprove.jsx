// import { useEffect, useState } from "react";
// import request from "@/helpers/request";
// import Notification from "../Notifier/Notification";

import { BsCheck2 } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import imgTeste from '@/components/Card/imgs/crianca-card.webp'
import Image from 'next/image'
import Link from 'next/link'


export default function PostsToApprove(){

    const fetchPosts = async()=>{
        console.log('ok')
    }


    return(
        <Link href={"/info_vaga"}>
            <div className='flex rounded-md w-[750px] h-36 bg-white max-[1600px]:w-[650px] max-[1530px]:w-[600px] max-[1430px]:w-[500px] max-[1430px]:h-40'>
                <div>
                    <div className='h-full w-52'>
                    <Image
                    src={imgTeste}
                    height={100}
                    width={300}
                    className='rounded-l-md h-full'
                    />
                    </div>
                </div>
                <div className='px-3 py-2'>
                    <div>
                        <h1 className='text-2xl font-bold'>Vaga Teste</h1>
                        <p className='text-gray-400'>Auxiliar na organização dos livros. Venha e faça parte da mudança! </p>
                    </div>
                </div>
                <div className='flex flex-col border-l-2'>
                    <div className='h-1/2 flex items-center border-b-2 hover:bg-green-500 hover:text-white hover:font-bold transition-colors duration-400'>
                        <BsCheck2 className='text-4xl mx-3'/>
                    </div>
                    <div className='h-1/2 flex items-center hover:bg-red-500 hover:text-white hover:font-bold transition-colors duration-400'>
                        <AiOutlineClose className='text-4xl mx-3'/>
                    </div>
                </div>
            </div>
        </Link>
    )


}