'use client'
import imagemOng from '@/app/(main)/cadastro/tela-cadastro.png'
import CardAtividades from '@/components/Card/CardAtividades'
import Image from 'next/image'
import { useState } from 'react'
import bannerOng from './imgs/bannerOng2.jpg'

export default function InfoOng({ImageOng,nomeOng,descOng,localOng,SobreOng}){

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
        <div className='flex flex-col '>
            <div>
                <Image
                src={bannerOng}
                className='w-full h-72 max-[650px]:h-52'
                />
            </div>
            <div className='m-auto flex flex-col max-[1400px]:mx-36 max-[1200px]:mx-20 max-[1100px]:mx-8 max-[630px]:mx-2'>
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
                    <h1 className='font-bold text-2xl'>Centro Social Luterano Cantinho do Girassol</h1>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                    </div>
                    <p className='text-gray-600'>Somos uma instituição que atua a 51 anos na Ceilândia-DF, com atendimento gratuito a crianças e para a comunidade por meio de cursos profissionalizantes.</p>
                </div>
                <div>
                    <div className='mt-10 max-[750px]:px-8 max-[520px]:px-2 mb-4'>
                        <h1 className='font-bold text-2xl'>Sobre</h1>
                        <p className='text-gray-800'>O Centro Social Luterano Cantinho do Girassol foi fundado em 16 de março de 1972 (oFIcialmente em 20 de maio de 1974), em Ceilândia – Distrito Federal, mantido pela Comunidade Evangélica de ConFIssão Luterana de Brasília, como um Centro de auxílio a crianças e adolescentes de baixa renda residentes na região.</p>
                    </div>
                </div>
                <div>
                    <h1 className='text-center font-bold'>ATIVIDADES</h1>
                </div>
                <div className='w-2/3 m-auto flex items-center mb-2 bg-gray-500 rounded-xl'>
                    <div onClick={closeAtvConcluidas} className={`cursor-pointer rounded-l-xl w-1/2 text-center font-semibold py-2 ${atvAndamento ? 'bg-sky-300' : 'border-r-2'}`}>
                        <p>EM ANDAMENTO</p>
                    </div>
                    <div onClick={closeAtvAndamento} className={`cursor-pointer rounded-r-xl w-1/2 text-center font-semibold py-2 ${atvConcluidas ? 'bg-sky-300 ' : 'border-l-2'}`}>
                        <p>CONCLUIDAS</p>
                    </div>
                </div>
                <div className='mb-20'>
                    {atvAndamento ? (
                            <div className='flex justify-between gap-3 flex-wrap w-full'>
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
                            <div className='flex justify-around flex-wrap'>
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
    )
}
