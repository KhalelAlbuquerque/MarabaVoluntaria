import bgImg from './imgs/bg-ong.png'
import bgImg2 from './imgs/bg-ong2.webp'
import imagemOng from '@/app/(main)/cadastro/tela-cadastro.png'
import Image from 'next/image'

export default function InfoOng(){
    return (
        <div className='mx-60 flex flex-col mt-8'>
            <div className='w-full'>
                <div className='w-1/2'>
                    <Image
                        src={imagemOng}
                        alt='imagem da ong'
                        className='w-80 h-40 rounded-2xl'
                    />
                </div>
            </div>
            <div>
                <div className='mt-5 flex flex-col gap-1'>
                    <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                    <h1 className='font-bold text-2xl'>Centro Social Luterano Cantinho do Girassol</h1>
                    <p className='text-gray-600'>Somos uma instituição que atua a 51 anos na Ceilândia-DF, com atendimento gratuito a crianças e para a comunidade por meio de cursos profissionalizantes.</p>
                </div>
                <div className='mt-8'>
                    <h1 className='font-bold text-2xl'>Sobre</h1>
                    <p className='text-gray-800'>O Centro Social Luterano Cantinho do Girassol foi fundado em 16 de março de 1972 (oFIcialmente em 20 de maio de 1974), em Ceilândia – Distrito Federal, mantido pela Comunidade Evangélica de ConFIssão Luterana de Brasília, como um Centro de auxílio a crianças e adolescentes de baixa renda residentes na região.</p>
                </div>
            </div>
        </div>
    )
}
