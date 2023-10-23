import Image from 'next/image'
import logoAtv from '@/app/(main)/login/login.png'
export default function CardAtividades({atividade, dataInicio, dataConclusao}){
    return (
        <div className='border-2 w-2/5 flex rounded-xl max-[825px]:flex-col max-[670px]:w-96'>
            <div>
                <Image
                src={logoAtv}
                alt='Logo da atividade'
                className='rounded-l-xl w-40 h-full min-[825px]:border-r-2 max-[825px]:border-b-2 px-2 max-[825px]:w-full'
                />
            </div>
            <div className='pl-4'>
                <div>
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