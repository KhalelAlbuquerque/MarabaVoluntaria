'use client'
import Image from 'next/image'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'
import CardVaga from '@/components/Card/CardVaga.jsx'
import React from 'react'
import CardOng from '@/components/Card/CardOng.jsx'

import Notifier from '@/components/Notifier/Notifier.jsx'


export default function Home() {

  const [visibleVaga,setVisibleVaga] = React.useState(true)
  const [visibleONG,setVisibleONG] = React.useState(false)
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        result.map((data) => {
          if (data.body.length > 160 || data.title.length > 30) {
            data.body = data.body.substring(0, 150) + '...';
            data.title = data.title.substring(0, 30) + '...';
          }
        });
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
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
      <main className='px-20 pt-4 pb-32 flex flex-col max-[530px]:px-12 max-[390px]:px-6 max-[350px]:px-2'>
        <div className='text-center pb-2'>
          <p className='text-sky-600 font-semibold'>BUSQUE POR CATEGORIA DE INTERESSE</p>
        </div>
        <div>
          <div className='w-full bg-zinc-400 flex justify-around rounded-xl cursor-pointer'>
          <div onClick={handleActiveVaga} className={`rounded-l-xl w-1/2 text-center font-semibold py-2 ${visibleVaga ? 'bg-sky-300' : 'border-r-2'}`}>
              <p>VAGAS</p>
            </div>
            <div onClick={handleActiveONG} className={`rounded-r-xl w-1/2 text-center font-semibold py-2 ${visibleONG ? 'bg-sky-300' : 'border-l-2'}`}>
              <p>ONGS</p>
            </div>
          </div>
        </div>
        <div>
          {visibleVaga ? (
            <div className='flex justify-center gap-8 flex-wrap mt-6 max-[1197px]:justify-center max-[790px]:gap-8 max-[1140px]:gap-12 max-[320px]:gap-6'>
              {data.map((data,index) => (
                <CardVaga
                  key={data.id}
                  atividade={data.title}
                  descricao={data.body}
                  totalPessoas={index+1}
                />
              ))}
            </div>
          ) : visibleONG ? (
            <div className='flex justify-center gap-4 flex-wrap mt-6 max-[1004px]:justify-center'>
              {data.map(data => (
                <CardOng
                  key={data.id}
                  localizacao={"Brasil"}
                  nomeONG={data.title}
                  descONG={data.body}
                />
              ))}
            </div>
          ) : <h1 className='text-center text-4xl text-sky-700 mt-8'>Carregando...</h1>}
        </div>
      </main>
      <footer className='fixed bottom-0 w-full'>
       <Footer/>
      </footer>
    </div>
  )
}