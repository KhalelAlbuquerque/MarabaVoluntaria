import Image from 'next/image'
import logoAtv from '@/app/(main)/login/login.png'
export default function CardAtividades({atividade, dataInicio, dataConclusao}){
    return (
        <div className='cursor-pointer hover:bg-gray-100 border-2 w-5/12 h-36 flex rounded-xl max-[825px]:flex-col max-[670px]:w-96 mb-4'>
            <div className='h-full flex items-center border-r-2'>
                <Image
                src={logoAtv}
                alt='Logo da atividade'
                className='rounded-l-xl w-40 h-fit px-2 max-[825px]:w-full'
                />
            </div>
            <div className='px-2 min-[900px]:w-96'>
                <div className='h-4/6'>
                    <h1 className='text-gray-800 font-semibold'>Atividade:</h1>
                    <p className='text-gray-600'>{atividade}</p>
                </div>
                <div className={`flex max-[1000px]:flex-col max-[825px]:flex-row ${dataInicio ? 'justify-between' : 'justify-center'}`}>
                    {dataInicio ? (
                        <div className='flex flex-col'>
                            <h1 className='text-gray-800 font-semibold'>Data Inicio</h1>
                            <p>{dataInicio}</p>
                        </div>
                    ): null}
                    <div>
                        <h1 className='text-gray-800 font-semibold'>Data Conclusão</h1>
                        <p>{dataConclusao}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}