import bgImg from './imgs/bg-ong.png'
import bgImg2 from './imgs/bg-ong2.webp'
import imagemOng from '@/app/(main)/cadastro/tela-cadastro.png'
import Image from 'next/image'

export default function InfoOng(){
    return (
        <div className='mx-60 flex flex-col mt-20 max-[1200px]:mx-36 max-[1000px]:mx-20 max-[690px]:mx-8 max-[630px]:mx-2 max-[750px]:mt-4'>
            <div className='w-full flex max-[750px]:flex-col max-[750px]:border-2 rounded-2xl'>
                <div className='w-1/2 max-[750px]:w-full'>
                    <Image
                        src={imagemOng}
                        alt='imagem da ong'
                        className='h-72 w-full min-[750px]:rounded-2xl max-[750px]:rounded-t-2xl'
                    />
                </div>
                <div className='w-1/2 px-8 max-[520px]:px-2 flex flex-col gap-5 max-[750px]:w-full max-[750px]:py-3 max-[750px]:shadow-2xl max-[750px]:rounded-2xl'>
                    <h1 className='font-bold text-2xl'>Centro Social Luterano Cantinho do Girassol</h1>
                    <p className='text-gray-600'>Somos uma instituição que atua a 51 anos na Ceilândia-DF, com atendimento gratuito a crianças e para a comunidade por meio de cursos profissionalizantes.</p>
                </div>
            </div>
            <div>
                <div className='mt-5 flex flex-col gap-1 max-[750px]:px-8 max-[520px]:px-2 '>
                    <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                </div>
                <div className='mt-8 max-[750px]:px-8 max-[520px]:px-2 mb-4'>
                    <h1 className='font-bold text-2xl'>Sobre</h1>
                    <p className='text-gray-800'>O Centro Social Luterano Cantinho do Girassol foi fundado em 16 de março de 1972 (oFIcialmente em 20 de maio de 1974), em Ceilândia – Distrito Federal, mantido pela Comunidade Evangélica de ConFIssão Luterana de Brasília, como um Centro de auxílio a crianças e adolescentes de baixa renda residentes na região.</p>
                </div>
            </div>
        </div>
    )
}
