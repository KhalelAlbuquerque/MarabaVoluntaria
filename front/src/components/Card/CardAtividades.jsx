import { useState, useEffect } from 'react';
import Image from 'next/image'
import logoAtv from '@/app/(main)/login/login.png'

export default function CardAtividades({atividade, dataInicio, dataConclusao}){

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
        const windowSize = window.innerWidth;
        const isMobile = windowSize <= 920;
        setIsMobile(isMobile);
        };
    
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        handleResize();
    
        return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
        };
    }, []);



    if (!isMobile) {
        return (
            <div className='cursor-pointer hover:bg-gray-100 border-2 w-5/12 h-36 flex rounded-xl mb-4'>
                <div className='h-full flex items-center border-r-2'>
                    <Image
                    src={logoAtv}
                    alt='Logo da atividade'
                    className='rounded-l-xl w-40 h-full px-2'
                    />
                </div>
                <div className='px-2 w-full'>
                    <div className='h-4/6'>
                        <h1 className='text-gray-800 font-semibold'>Atividade:</h1>
                        <p className='text-gray-600'>{atividade}</p>
                    </div>
                    <div className={`flex ${dataInicio ? 'justify-between min-[1100px]:justify-around' : 'justify-center'}`}>
                        {dataInicio ? (
                            <div className='flex flex-col items-center'>
                                <h1 className='text-gray-800 font-semibold'>Data Inicio</h1>
                                <p>{dataInicio}</p>
                            </div>
                        ): null}
                        <div className='flex flex-col items-center '>
                            <h1 className='text-gray-800 font-semibold'>Data Conclusão</h1>
                            <p>{dataConclusao}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

    return (
        <div className='border-2 rounded-lg w-80'>
                <div className=''>
                    <Image
                    src={logoAtv}
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
            </div>
    )

}