'use client'
import imgTeste from '@/components/Card/imgs/crianca-card.webp'
import Image from 'next/image'
import Link from 'next/link'
import request from "@/helpers/request";
import ButtonsApprovePost from '@/components/ButtonsApprovePost/ButtonsApprovePost'
import { useEffect, useState } from 'react';
import LoadingHome from '@/components/LoadingHome/LoadingHome'
import { useSession } from 'next-auth/react';


export default function PostsToApprove(){

    const [posts, setPosts] = useState([])
    const {data:session, status} = useSession()

    async function getData() {
        if(status == 'loading') return 
        const fetchData =  await request('admin/getPostsToApprove', "GET", {}, `Bearer ${session.user.accessToken}`)
        setPosts(fetchData.posts)
    }

    useEffect(()=>{
        getData()
    })

    return(
        <>
        {posts ? posts.map((posts,index) => (
            <div key={index+1} className='max-[550px]:border-2 max-[550px]:rounded-md'>
                <div className='flex relative rounded-md w-[750px] h-36 bg-white max-[1600px]:w-[650px] max-[1530px]:w-[600px] max-[1430px]:w-[500px] max-[1430px]:h-40 max-[550px]:w-[460px] max-[510px]:w-[430px] max-[477px]:w-[380px] max-[430px]:w-[320px]'>
                    <Link  href={`/vaga/${posts._id}`} className='w-full flex'>
                        <div>
                            <div className='h-full w-52 max-[550px]:w-44 max-[430px]:w-28'>
                                <Image
                                src={imgTeste}
                                height={100}
                                width={300}
                                alt='Imagem do Post'
                                className='min-[550px]:rounded-l-md h-full rounded-md'
                                />
                            </div>
                        </div>
                        <div className='px-3 py-2 max-[550px]:bg-white'>
                            <div>
                                <h1 className='text-2xl font-bold'>{posts.title}</h1>
                                <p className='text-gray-400'>{posts.description}</p>
                            </div>
                        </div>
                    </Link>
                    <div className='min-[550px]:flex hidden flex-col border-l-2 absolute right-0 h-full'>
                        <ButtonsApprovePost id={posts._id}/>
                    </div>
                </div>
                <div className='min-[550px]:hidden flex w-full bg-white py-4'>
                    <div className='flex w-full gap-3 px-3'>
                        <ButtonsApprovePost id={posts._id}/>
                    </div>
                </div>
            </div>
            )): <LoadingHome/>}
        </>
    )
}