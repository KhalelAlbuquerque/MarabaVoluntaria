import imageCard from './imgs/crianca-card.webp'
import Image from 'next/image'
import { BsFillPersonPlusFill } from "react-icons/bs";
export default function CardVaga({atividade,descricao,totalPessoas}){
    return (
        <div className='flex relative flex-col w-72 bg-neutral-100 rounded-2xl shadow-2xl pb-4 h-[465px] border-2'>
            <div>
                <Image
                src={imageCard}
                alt="Picture of the author"
                className='rounded-t-2xl'
                />
            </div>
            <div className='relative bottom-16 left-4 py-4 bg-sky-300 w-[70px] rounded-full'>
                <BsFillPersonPlusFill className='absolute top-1.5 left-3 text-white text-lg'/>
                <p className='text-white text-sm absolute top-1.5 right-3.5'>{totalPessoas}</p>
            </div>
            <div className='px-6'>
                <div className='text-xl font-semibold mb-3'>
                    <p className='text-start text-blue-900'>{atividade}</p>
                </div>
                <div>
                    <p className='text-start text-gray-700 font-semibold text-sm'>
                        {descricao}
                    </p>
                </div>
                <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2'>
                    <button className='bg-sky-600 px-8 py-3 rounded-xl text-white font-bold shadow-2xl'>Ver vaga</button>
                </div>
            </div>
        </div>
    )
}