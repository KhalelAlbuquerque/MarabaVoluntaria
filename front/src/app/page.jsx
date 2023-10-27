'use client'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'
import CardVaga from '@/components/Card/CardVaga.jsx'
import React from 'react'
import CardOng from '@/components/Card/CardOng.jsx'
import request from '@/helpers/request.js'
import Loading from '@/components/Loading/Loading.jsx'

import { useSession } from 'next-auth/react'

export default function Home() {

  const [visibleVaga,setVisibleVaga] = React.useState(true)
  const [visibleONG,setVisibleONG] = React.useState(false)
  const [ongs, setOngs] = React.useState([]);
  const [vagas, setVagas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  const {data:session, status} = useSession()

  const fetchDataOng = async () => {
    const requisicao = await request('ong');
    setOngs(requisicao.Ongs)
  };

  const fetchDataVaga = async () => {
    const requisicao = await request();
    setVagas(requisicao.posts)
  };



  React.useEffect(() => {
    fetchDataOng()
    fetchDataVaga()
    setIsLoading(false)
  }, []); 


  function handleActiveVaga(){
    setVisibleVaga(true)
    setVisibleONG(false)
  }

  function handleActiveONG(){
    setVisibleVaga(false)
    setVisibleONG(true)
  }

  return (
    <div className='flex flex-col'>
      <header>
        <Header/>
      </header>
      {!isLoading?(
        <main className='px-20 pt-4 pb-32 flex flex-col max-[530px]:px-12 max-[390px]:px-6 max-[350px]:px-2'>
          <div className='text-center pb-2'>
            <p className='text-sky-600 font-semibold'>BUSQUE POR CATEGORIA DE INTERESSE</p>
          </div>
          <div>
            <div className='w-1/2 m-auto bg-zinc-400 flex justify-around rounded-xl cursor-pointer'>
              <div onClick={handleActiveVaga} className={`rounded-l-xl w-1/2 text-center font-semibold py-2 ${visibleVaga ? 'bg-sky-300' : 'border-r-2'}`}>
                <p>VAGAS {session ? session?.user.name:false}</p>
              </div>
              <div onClick={handleActiveONG} className={`rounded-r-xl w-1/2 text-center font-semibold py-2 ${visibleONG ? 'bg-sky-300' : 'border-l-2'}`}>
                <p>ONGS</p>
              </div>
            </div>
          </div>
          <div>
            {visibleVaga ? (
              <div className='flex justify-center gap-8 flex-wrap mt-6 max-[1197px]:justify-center max-[790px]:gap-8 max-[1140px]:gap-12 max-[320px]:gap-6'>
                {vagas.map((data,index) => (
                  <CardVaga
                    IdVaga="info_vaga"
                    key={index}
                    atividade={data.title}
                    descricao={data.description}
                    totalPessoas={index+1}
                    vagaImage={data.image}
                  />
                ))}
              </div>
            ) : visibleONG ? (
              <div className='flex justify-center gap-4 flex-wrap mt-6 max-[1004px]:justify-center'>
                {ongs.map((data, index) => (
                  <CardOng
                    IdOng="info_ong"
                    key={index}
                    localizacao={"Brasil"}
                    nomeONG={data.name}
                    descONG={data.description}
                    imageONG={data.profPicture}
                  />
                ))}
              </div>
            ) : <h1 className='text-center text-4xl text-sky-700 mt-8'>Carregando...</h1>}
          </div>
      </main>
      ):(
        <Loading/>
      )}
      <footer className='fixed bottom-0 w-full'>
       <Footer/>
      </footer>
    </div>
  )
}