'use client'
import imagemOng from '@/app/(main)/cadastro/tela-cadastro.png'
import CardAtividades from '@/components/Card/CardAtividades'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import bannerOng from '../../app/(dynamics)/(vaga)/ong/[...params]/imgs/bannerOng2.jpg'
import LoadingHome from '@/components/LoadingHome/LoadingHome'
import Notification from '@/components/Notifier/Notification'
import { useRouter } from 'next/navigation'
import request from '@/helpers/request'


export default function InfoOngComponent({id, isOwner}){

    const {data:session, status} = useSession()
    const router = useRouter()

    const [ong,setOng] = useState(null)
    const [image, setImage] = useState('')
    const [ongAbout, setOngAbout] = useState('')
    const [ongDescription, setOngDescription] = useState('')
    const [isEditting, setIsEditting] = useState(false)


    const fetchData = async () => {
        if(status != 'loading'){
            if(session && session?.user.id === id){
                router.push('/myOng')
                return
            }

            let res
            let resImg
            if(isOwner){
                if(status == 'unauthenticated') return isOwner=false
                                            //session.user.id / 654a6eb8d28563c7bf9d92e9
                res = await request(`ong/${session.user.id}`)
                resImg = await request(`image/${res.ong.profPicture}`)
            }else{
                                            //ongId
                res = await request(`ong/${id}`)
                resImg = await request(`image/${res.ong.profPicture}`)
            }
            if(res.ok && resImg.ok){
                setOng(res.ong)
                setImage(await resImg.image)
                setOngAbout(res.ong.about)
                setOngDescription(res.ong.description)
            }
        }
    };
      
    useEffect(() => {
        fetchData();
    },[status, image, isOwner]);

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

    async function handleSubmit(){
        const res = await request('ong/editar', "PUT", {description: ongDescription, about: ongAbout}, `Bearer ${session.user.accessToken}`)

        if(res.ok){
            Notification("success", "Dados alterados!")
            setIsEditting(false)
        }else{
            Notification("error", "Falha ao salvar!")
        }
    }

    function cancelSubmit(){
        setOngAbout(ong.about)
        setOngDescription(ong.description)
        setIsEditting(false)
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
                    <div className='m-auto flex flex-col mx-96 max-[1200px]:mx-20 max-[1100px]:mx-8 max-[630px]:mx-2'>
                        <div className='w-full -top-20 flex rounded-2xl'>
                            <div className='-translate-y-[72px] max-[650px]:-translate-y-[48px] max-[520px]:mx-8 mx-20'>
                                <Image alt='Foto da Ong' src={image} className='w-36 max-[650px]:w-24 h-36 max-[650px]:h-24 m-auto rounded-2xl max-[750px]:rounded-t-2xl' height={200} width={200}/>
                            </div>
                            {isOwner ? (
                                !isEditting ? (
                                    <div className='w-4/5 m-auto mb-10 flex gap-2 divide-x'>
                                        <button className='w-1/2 p-2 bg-blue-200 rounded-md' onClick={()=>router.push('/vaga/criarVaga')}>
                                            Cadastrar vaga
                                        </button>
                                        <button className='w-1/2 p-2 bg-blue-200 rounded-md'onClick={()=>setIsEditting(true)}>
                                            Editar perfil
                                        </button>
                                    </div>
                                ):(
                                    <div className='w-4/5 m-auto mb-10 flex gap-2 divide-x'>
                                        <button className='w-1/2 p-2 bg-green-200 rounded-md' onClick={handleSubmit}>
                                            Salvar Alterações
                                        </button>
                                        <button className='w-1/2 p-2 bg-red-200 rounded-md' onClick={cancelSubmit}>
                                            Cancelar
                                        </button>
                                    </div>
                                )
                            ):null}
                        </div>
                        {!isEditting ? (
                            <>
                                <div className='w-full border-b-2 border-black pb-8 max-[750px]:px-8 max-[520px]:px-2 flex flex-col gap-5'>
                                    <h1 className='font-bold text-2xl'>{ong.name}</h1>
                                    <div className='flex flex-col gap-1 '>
                                        <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                                    </div>
                                    <p className='text-gray-600'>{ongDescription}</p>
                                </div>
                                <div>
                                    <div className='mt-10 max-[750px]:px-8 max-[520px]:px-2 mb-4'>
                                        <h1 className='font-bold text-2xl'>Sobre</h1>
                                        <p className='text-gray-800'>{ongAbout}</p>
                                    </div>
                                </div>
                            </>
                        ):(
                            <>
                                <div className='w-full border-b-2 border-black pb-8 max-[750px]:px-8 max-[520px]:px-2 flex flex-col gap-5'>
                                    <h1 className='font-bold text-2xl'>{ong.name}</h1>
                                    <div className='flex flex-col gap-1 '>
                                        <p className='text-orange-500 font-semibold'>Maraba, PA</p>
                                    </div>
                                    <textarea className='w-full border-2 border-gray-600 p-3 resize-none' value={ongDescription}onChange={({target})=>setOngDescription(target.value)}/>
                                </div>
                                <div>
                                    <div className='mt-10 max-[750px]:px-8 max-[520px]:px-2 mb-4'>
                                        <h1 className='font-bold text-2xl'>Sobre</h1>
                                        <textarea className='w-full border-2 border-gray-600 p-3 resize-none' value={ongAbout} onChange={({target})=>setOngAbout(target.value)}/>
                                    </div>
                                </div>
                            </>
                        )}
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
                                        <CardAtividades atividade={"Auxiliar na organização dos livrosAuxiliar"} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"} />
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