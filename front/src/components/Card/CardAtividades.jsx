import { useState, useEffect } from 'react';
import Image from 'next/image'
import logoAtv from '@/app/(main)/login/login.png'
import request from '@/helpers/request';
import Link from 'next/link';

export default function CardAtividades({atividade, dataInicio, dataConclusao, image, status, postId, isClosed}){

    const [isMobile, setIsMobile] = useState(false);
    const [imageData, setImageData] = useState('')

    async function getImage(){
        const res = await request(`image/${image}`)
        if(res.ok){
            setImageData(res.image)
        }
    }
    
    useEffect(() => {
        const handleResize = () => {
            const windowSize = window.innerWidth;
            const isMobile = windowSize <= 920;
            setIsMobile(isMobile);
        };
    
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        handleResize();
        getImage()
    
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, []);

    if(!imageData) return

    if (!isMobile) {
        return (
            <Link href={`/vaga/${postId}`} className={status == 'pending' ? 'cursor-pointer hover:bg-gray-100 border-4 w-5/12 h-36 flex rounded-xl mb-4 border-orange-400' 
                        : status=='rejected'? 'cursor-pointer hover:bg-gray-100 border-4 w-5/12 h-36 flex rounded-xl mb-4 border-red-400' 
                        : isClosed==true? 'cursor-pointer hover:bg-gray-100 border-4 w-5/12 h-36 flex rounded-xl mb-4 border-green-400' 
                        : 'cursor-pointer hover:bg-gray-100 border-4 w-5/12 h-36 flex rounded-xl mb-4'}>
                <div className='h-full flex items-center border-r-2'>
                    <Image
                    src={imageData}
                    width={100}
                    height={100}
                    alt='Logo da atividade'
                    className='rounded-l-xl w-full h-full'
                    />
                </div>
                <div className='px-2 w-full'>
                    <div className='h-4/6'>
                        <h1 className='text-gray-800 font-semibold'>Atividade:</h1>
                        <p className='text-gray-600'>{atividade}</p>
                    </div>
                    <div className={`flex ${dataInicio ? 'justify-between min-[1100px]:justify-around gap-1' : 'justify-center gap-1'}`}>
                        {dataInicio ? (
                            <div className='flex flex-col items-center'>
                                <h1 className='text-gray-800 font-semibold'>Inicio</h1>
                                <p>{dataInicio}</p>
                            </div>
                        ): null}
                        <div className='flex flex-col items-center '>
                            <h1 className='text-gray-800 font-semibold '>Conclusão</h1>
                            <p>{dataConclusao}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )}

    return (
        <Link href={`/vaga/${postId}`} className={status == 'pending' ? 'cursor-pointer border-2 w-96 h-96 flex flex-col hover:bg-gray-100 hover:border-gray-500 rounded-xl mb-4 max-[450px]:w-80 max-[450px]:h-96 max-[380px]:w-72 border-orange-400' 
                    : status=='rejected'? 'cursor-pointer border-2 w-96 h-96 flex flex-col hover:bg-gray-100 hover:border-gray-500 rounded-xl mb-4 max-[450px]:w-80 max-[450px]:h-96 max-[380px]:w-72 border-red-400' 
                    : isClosed==true? 'cursor-pointer border-2 w-96 h-96 flex flex-col hover:bg-gray-100 hover:border-gray-500 rounded-xl mb-4 max-[450px]:w-80 max-[450px]:h-96 max-[380px]:w-72' 
                    : 'cursor-pointer border-2 w-96 h-96 flex flex-col hover:bg-gray-100 hover:border-gray-500 rounded-xl mb-4 max-[450px]:w-80 max-[450px]:h-96 max-[380px]:w-72'}>
            <div className=''>
                <Image
                src={imageData}
                width={100}
                height={100}
                alt='Logo da atividade'
                className='w-full h-60 rounded-t-lg'
                />
            </div>
            <div className='p-4'>
                <div className=''>
                    <h1 className='text-gray-800 font-semibold'>Atividade:</h1>
                    <p className='text-gray-600'>{atividade}</p>
                </div>
                <div className={`flex mt-4 ${dataInicio ? 'justify-between' : 'justify-center'}`}>
                    {dataInicio ? (
                        <div className=''>
                            <h1 className='text-gray-800 font-semibold'>Data Inicio</h1>
                            <p>{dataInicio}</p>
                        </div>
                    ): null}
                    <div className=''>
                        <h1 className='text-gray-800 font-semibold'>Data Conclusão</h1>
                        <p>{dataConclusao}</p>
                    </div>
                </div>
            </div>
        </Link>
    )

}