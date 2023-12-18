'use client'
import imgTeste from '@/components/Card/imgs/crianca-card.webp'
import Image from 'next/image'
import Link from 'next/link'
import request from "@/helpers/request";
import ButtonsApprovePost from '@/components/ButtonsApprovePost/ButtonsApprovePost'
import { useEffect, useState } from 'react';
import LoadingHome from '@/components/LoadingHome/LoadingHome'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Notification from '../Notifier/Notification';

import axios from 'axios'


export default function PostsToApprove(){

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {data:session, status} = useSession()
    const router = useRouter()

    async function getData() {
        if(status == 'loading') return
        if(status == 'unauthenticated') {router.push('/login'); return Notification("error", "Faça login para acessar")}
        console.log(session.user)
        if(session.user.role!="Admin") { router.push('/'); return Notification("error", "Deve ser admin pra acessar");}
        const fetchData = await axios.get('http://localhost:3001/admin/getPostsToApprove', {
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`
        }
        });
        setIsLoading(false)

        for (const post of fetchData.data.posts){
            const image = await post.image.image

            post.image = image.image
        }

        setPosts(fetchData.data.posts)
    }

    useEffect(()=>{
        getData()
    }, [status, posts])

    return(
        <>
        {!isLoading ? posts.map((post,index) => (
            <div key={index+1} className='max-[550px]:border-2 max-[550px]:rounded-md'>
                <h1 className="font-bold text-2xl max-[570px]:text-white max-[570px]:pt-2 max-[355px]:text-black">Aprovação de publicações</h1>
                <div className='flex relative rounded-md w-[750px] h-36 bg-white max-[1600px]:w-[650px] max-[1530px]:w-[600px] max-[1430px]:w-[500px] max-[1430px]:h-40 max-[550px]:w-[460px] max-[510px]:w-[430px] max-[477px]:w-[380px] max-[430px]:w-[320px]'>
                    <Link  href={`/vaga/${post._id}`} className='w-full flex'>
                        <div>
                            <div className='h-full w-52 max-[550px]:w-44 max-[430px]:w-28'>
                                <Image
                                src={post.image}
                                height={100}
                                width={300}
                                alt='Imagem do Post'
                                className='min-[550px]:rounded-l-md h-full rounded-md'
                                />
                            </div>
                        </div>
                        <div className='px-3 py-2 max-[550px]:bg-white'>
                            <div>
                                <h1 className='text-2xl font-bold'>{post.title}</h1>
                                <p className='text-gray-400'>{post.description}</p>
                            </div>
                        </div>
                    </Link>
                    <div className='min-[550px]:flex hidden flex-col border-l-2 absolute right-0 h-full'>
                        <ButtonsApprovePost id={post._id}/>
                    </div>
                </div>
                <div className='min-[550px]:hidden flex w-full bg-white py-4'>
                    <div className='flex w-full gap-3 px-3'>
                        <ButtonsApprovePost id={post._id}/>
                    </div>
                </div>
            </div>
            )): <LoadingHome/>}
        </>
    )
}