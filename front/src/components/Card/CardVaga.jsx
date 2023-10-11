import imageCard from './imgs/crianca-card.webp'
import Image from 'next/image'
export default function CardVaga({descricao}){
    return (
        <div className='flex flex-col w-72 bg-sky-300 rounded-2xl shadow-2xl pb-4 h-96'>
            <div>
                <Image
                src={imageCard}
                alt="Picture of the author"
                className='rounded-t-2xl'
                />
            </div>
            <div className='py-5 px-2 text-xl font-semibold'>
                <p className='text-center'>{descricao}</p>
            </div>
            <div className='relative mx-auto top-10'>
                <button className='bg-sky-600 px-8 py-3 rounded-xl text-white font-bold shadow-2xl'>Ver vaga</button>
            </div>
        </div>
    )
}