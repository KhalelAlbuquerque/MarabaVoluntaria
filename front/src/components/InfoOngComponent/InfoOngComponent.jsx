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
    const [runningPosts, setRunningPosts] = useState(null)
    const [closedPosts, setClosedPosts] = useState(null)
    const [pendingPosts, setPendingPosts] = useState(null)

    const [atvAndamento,setAtvAndamento] = useState(true)
    const [atvConcluidas, setAtvConcluidas] = useState(false)
    const [atvProcessamento, setAtvProcessamento] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    const fetchData = async () => {
        if(status != 'loading' && isLoading){
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
                if(res.ong) resImg = await res.ong.profPicture.image
            }else{
                                            //ongId
                res = await request(`ong/${id}`)
                if(res.ong) resImg = await res.ong.profPicture.image
            }


            if(res.ok){
                const resPosts = await request(`ong/ongPosts/${res.ong._id}`, "POST")
                if(!resPosts.ok) return

                let approved = []
                let closed = []
                let pending = []

                for (const post of resPosts.ongPosts){
                    if(post.status == 'approved' && post.isClosed==false){
                        approved.push(post)
                    }else if(post.status == 'approved' && post.isClosed==true){
                        closed.push(post)
                    }else{
                        pending.push(post)
                    }
                }
                approved.length == 0 ? setRunningPosts(false) : setRunningPosts(approved)
                closed.length == 0 ? setClosedPosts(false) : setClosedPosts(closed)
                pending.length == 0 ? setPendingPosts(false) : setPendingPosts(pending)
                setOng(res.ong)
                setImage(await resImg.image)
                setOngAbout(res.ong.about)
                setOngDescription(res.ong.description)
                setIsLoading(false)
            }else{
                setOng(false)
                setIsLoading(false)
            }
        }
    };
      
    useEffect(() => {
        fetchData();
    },[status, atvProcessamento, atvConcluidas, atvAndamento]);



    function openConcluidas(){
        setAtvAndamento(false)
        setAtvProcessamento(false)
        setAtvConcluidas(true)
    }

    function openAndamento(){
        setAtvConcluidas(false)
        setAtvAndamento(true)
        setAtvProcessamento(false)
    }

    function openProcessamento(){
        setAtvConcluidas(false)
        setAtvAndamento(false)
        setAtvProcessamento(true)
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
            {!isLoading ? (
                <div>
                    <div>
                        <Image
                        src={bannerOng}
                        alt='Banner ONG'
                        className='w-full h-72 max-[650px]:h-52'
                        />
                    </div>
                    <div className='m-auto flex flex-col mx-32 max-[1200px]:mx-20 max-[1100px]:mx-8 max-[630px]:mx-2'>
                        <div className='w-full -top-20 flex rounded-2xl'>
                            <div className='-translate-y-[72px] max-[650px]:-translate-y-[48px] max-[520px]:mx-8 mx-20'>
                                <Image alt='Foto da Ong' src={image} className='w-36 max-[650px]:w-24 h-36 max-[650px]:h-24 m-auto rounded-2xl max-[750px]:rounded-t-2xl' height={200} width={200}/>
                            </div>
                            {isOwner ? (
                                !isEditting ? (
                                    <div className='w-4/5 m-auto mb-10 flex gap-2 divide-x'>
                                        <button className='w-1/2 p-2 bg-blue-200 rounded-md font-bold' onClick={()=>router.push('/vaga/criarVaga')}>
                                            Cadastrar vaga
                                        </button>
                                        <button className='w-1/2 p-2 bg-blue-200 rounded-md font-bold'onClick={()=>setIsEditting(true)}>
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
                        <div className='w-2/3 m-auto flex max-[490px]:flex-col max-[490px]:bg-white max-[490px]:gap-2 max-[560px]:w-[90%] max-[560px]:mx-auto items-center mb-2 bg-gray-400 rounded-xl max-[900px]:w-full'>
                            <div onClick={openAndamento} className={`cursor-pointer rounded-l-xl w-1/3 text-center font-semibold py-2 max-[490px]:border-0 max-[490px]:rounded-xl max-[490px]:w-full ${atvAndamento ? 'bg-sky-300' : ' max-[490px]:bg-gray-400 border-r-2'}`}>
                                <p>EM ANDAMENTO</p>
                            </div>
                            <div onClick={openConcluidas} className={`cursor-pointer w-1/3 text-center font-semibold py-2 max-[490px]:border-0 max-[490px]:rounded-xl max-[490px]:w-full ${atvConcluidas ? 'bg-sky-300' : ' max-[490px]:bg-gray-400 '}`}>
                                <p>CONCLUIDAS</p>
                            </div>
                            <div onClick={openProcessamento} className={`cursor-pointer rounded-r-xl w-1/3 text-center font-semibold py-2 max-[490px]:border-0 max-[490px]:rounded-xl max-[490px]:w-full ${atvProcessamento ? 'bg-sky-300' : ' max-[490px]:bg-gray-400 border-l-2'}`}>
                                <p>PROCESSAMENTO</p>
                            </div>
                        </div>
                        <div className='mb-20'>
                            {atvAndamento ? (
                                    <div className='flex h-[400px] max-[560px]:gap-2 max-[560px]:w-[90%] max-[560px]:m-auto max-[920px]:h-[450px] bg-gray-300 mb-16 overflow-scroll py-4 justify-center gap-8 flex-wrap'>
                                        {runningPosts ? (
                                            <>
                                                {runningPosts.map((post, index)=>(
                                                    <CardAtividades postId={post._id} isClosed={post.isClosed} status={post.status} key={index+1} image={post.image.image} atividade={post.description} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"} />
                                                ))}
                                            </>
                                        ):(
                                            <p className='text-center text-xl font-bold'>Sem posts em andamento!</p>
                                        )}
                                    </div>
                                ): atvConcluidas ? (
                                    <div className='flex h-[400px] max-[560px]:gap-2 max-[560px]:w-[90%] max-[560px]:m-auto max-[920px]:h-[450px] bg-gray-300 mb-16 overflow-scroll py-4 justify-center gap-8 flex-wrap'>
                                        {closedPosts ? (
                                            <>
                                                {closedPosts.map((post, index)=>(
                                                    <CardAtividades postId={post._id} isClosed={post.isClosed} status={post.status} key={index+1} image={post.image.image} atividade={post.description} dataInicio={"21/10/2023"} />
                                                ))}
                                            </>
                                        ):(
                                            <p className='text-center text-xl font-bold'>Sem posts em fechados!</p>
                                        )}
                                    </div>
                                ):(
                                    <div className='flex h-[400px] max-[560px]:gap-2 max-[560px]:w-[90%] max-[560px]:m-auto max-[920px]:h-[450px] bg-gray-300 mb-16 overflow-scroll py-4 justify-center gap-8 flex-wrap'>
                                        {pendingPosts ? (
                                            <>
                                                {pendingPosts.map((post, index)=>(
                                                    <CardAtividades postId={post._id} isClosed={post.isClosed} status={post.status} key={index+1} image={post.image.image} atividade={post.description} dataInicio={"21/10/2023"} dataConclusao={"25/10/2023"} />
                                                ))}
                                            </>
                                        ):(
                                            <p className='text-center text-xl font-bold'>Sem posts em processamento!</p>
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            ): ong === false ? (
                <p className='text-2xl font-bold text-center mt-16'>Ong não encontrada!</p>
            ):(<LoadingHome/>)}
        </div>
    )

}