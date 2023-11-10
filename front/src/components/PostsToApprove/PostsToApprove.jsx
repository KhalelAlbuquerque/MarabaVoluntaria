import { BsCheck2 } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import imgTeste from '@/components/Card/imgs/crianca-card.webp'
import Image from 'next/image'
import Link from 'next/link'
import request from "@/helpers/request";


async function getData() {

    const fetchData =  await request()

    return fetchData

}

export default async function PostsToApprove(){

    const data = await getData()

    let posts

    posts = data.posts
    
    return(
        <>
        {posts ? posts.map((posts,index) => (
            <Link key={index+1} className='max-[550px]:border-2 max-[550px]:rounded-md' href={"/info_vaga"}>
                <div className='flex relative rounded-md w-[750px] h-36 bg-white max-[1600px]:w-[650px] max-[1530px]:w-[600px] max-[1430px]:w-[500px] max-[1430px]:h-40 max-[550px]:w-[460px] max-[510px]:w-[430px] max-[477px]:w-[380px] max-[430px]:w-[320px]'>
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
                    <div className='min-[550px]:flex hidden flex-col border-l-2 absolute right-0 h-full'>
                        <div className='h-1/2 flex items-center border-b-2 hover:bg-green-500 hover:text-white hover:font-bold transition-colors duration-400'>
                            <BsCheck2 className='text-4xl mx-3'/>
                        </div>
                        <div className='h-1/2 flex items-center hover:bg-red-500 hover:text-white hover:font-bold transition-colors duration-400'>
                            <AiOutlineClose className='text-4xl mx-3'/>
                        </div>
                    </div>
                </div>
                <div className='min-[550px]:hidden flex w-full bg-white py-4'>
                    <div className='flex w-full gap-3 px-3'>
                        <div className='w-1/2 flex justify-center bg-green-300 py-2 rounded-xl  hover:bg-green-500 hover:text-white hover:font-bold transition-colors duration-400'>
                            <BsCheck2 className='text-4xl mx-3'/>
                        </div>
                        <div className='w-1/2 flex justify-center bg-red-300 rounded-xl py-2 hover:bg-red-500 hover:text-white hover:font-bold transition-colors duration-400'>
                            <AiOutlineClose className='text-4xl mx-3'/>
                        </div>
                    </div>
                </div>
            </Link>
            )): <LoadingHome/>}
        </>
    )
}