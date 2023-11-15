'use client'
import imagemOng from '@/app/(main)/cadastro/tela-cadastro.png'
import CardAtividades from '@/components/Card/CardAtividades'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import bannerOng from './imgs/bannerOng2.jpg'
import LoadingHome from '@/components/LoadingHome/LoadingHome'

export default function InfoOng({params}){

    let id = params.params[0]

    const [ong,setOng] = useState(null)

    const fetchData = async () => {
        const ongFetch = await fetch(`http://localhost:3001/ong/${id}`).then((e) => e.json()).then((e) => e.ong);
    
        setOng(ongFetch);
    };
      
    useEffect(() => {
        fetchData();
    }, []);


    console.log(ong)

    

    const [atvAndamento,setAtvAndamento] = useState(true)
    const [atvConcluidas, setAtvConcluidas] = useState(false)

    function closeAtvAndamento(){
        setAtvAndamento(false)
        setAtvConcluidas(true)
    }

    function closeAtvConcluidas(){
        setAtvConcluidas(false)
        setAtvAndamento(true)
    }


    return (
        <div className='flex flex-col'>
            {ong ? (
                <div>
                    <div>
                        <Image
                        src={bannerOng}
                        alt='Banner ONG'
                        className='w-full h-72 max-[650px]:h-52'
                        />
                    </div>
                    <div className='m-auto flex flex-col mx-36 max-[1200px]:mx-20 max-[1100px]:mx-8 max-[630px]:mx-2'>
                        <div className='w-full -top-20 flex rounded-2xl'>
                            <div className='-translate-y-[72px] max-[650px]:-translate-y-[48px] max-[520px]:mx-8 mx-20'>
                                <Image
                                    src={imagemOng}
                                    alt='imagem da ong'
                                    className='w-36 max-[650px]:w-24 h-36 max-[650px]:h-24 m-auto rounded-2xl max-[750px]:rounded-t-2xl'
                                />
                            </div>
                        </div>
                        <div className='w-full border-b-2 border-black pb-8 max-[750px]:px-8 max-[520px]:px-2 flex flex-col gap-5'>
                            <h1 className='font-bold text-2xl'>{ong.name}</h1>
                            <div className='flex flex-col gap-1 '>
                                <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                            </div>
                            <p className='text-gray-600'>{ong.description}</p>
                        </div>
                        <div>
                            <div className='mt-10 max-[750px]:px-8 max-[520px]:px-2 mb-4'>
                                <h1 className='font-bold text-2xl'>Sobre</h1>
                                <p className='text-gray-800'>{ong.about}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-center font-bold'>ATIVIDADES</h1>
                        </div>
                        <div className='w-2/3 m-auto flex items-center mb-2 bg-gray-500 rounded-xl max-[480px]:w-full'>
                            <div onClick={closeAtvConcluidas} className={`cursor-pointer rounded-l-xl w-1/2 text-center font-semibold py-2 ${atvAndamento ? 'bg-sky-300' : 'border-r-2'}`}>
                                <p>EM ANDAMENTO</p>
                            </div>
                            <div onClick={closeAtvAndamento} className={`cursor-pointer rounded-r-xl w-1/2 text-center font-semibold py-2 ${atvConcluidas ? 'bg-sky-300 ' : 'border-l-2'}`}>
                                <p>CONCLUIDAS</p>
                            </div>
                        </div>
                        <div className='mb-20'>
                            {atvAndamento ? (
                                    <div className='flex justify-center gap-8 flex-wrap w-full'>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"} />
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"}/>
                                    </div>
                                ): (
                                    <div className='flex justify-center gap-8 flex-wrap'>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                        <CardAtividades atividade={"Auxiliar na organização dos livros"} dataConclusao={"25/10/2023"}/>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            ): <LoadingHome/>}
        </div>
    )
}
