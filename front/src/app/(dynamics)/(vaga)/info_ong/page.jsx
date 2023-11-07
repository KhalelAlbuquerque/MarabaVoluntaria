'use client'
import imagemOng from '@/app/(main)/cadastro/tela-cadastro.png'
import CardAtividades from '@/components/Card/CardAtividades'
import Image from 'next/image'
import { useState } from 'react'

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
        <div className='m-auto flex flex-col mt-20 max-[1400px]:mx-36 max-[1200px]:mx-20 max-[1100px]:mx-8 max-[630px]:mx-2 max-[750px]:mt-4'>
            <div className='w-full flex max-[750px]:flex-col max-[750px]:border-2 rounded-2xl'>
                <div className='w-1/2 max-[750px]:w-full'>
                    <Image
                        src={imagemOng}
                        alt='imagem da ong'
                        className='h-72 m-auto w-fit rounded-2xl max-[750px]:rounded-t-2xl'
                    />
                </div>
                <div className='w-1/2 px-8 max-[520px]:px-2 flex flex-col gap-5 max-[750px]:w-full max-[750px]:py-3 max-[750px]:shadow-2xl max-[750px]:rounded-2xl'>
                    <h1 className='font-bold text-2xl'>Centro Social Luterano Cantinho do Girassol</h1>
                    <div className='flex flex-col gap-1 max-[750px]:px-8 max-[520px]:px-2 '>
                        <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                    </div>
                    <p className='text-gray-600'>Somos uma instituição que atua a 51 anos na Ceilândia-DF, com atendimento gratuito a crianças e para a comunidade por meio de cursos profissionalizantes.</p>
                </div>
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
                        <div className='flex justify-around flex-wrap w-full'>
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
    )
}
