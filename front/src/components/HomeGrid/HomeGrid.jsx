'use client'

import React, {Suspense, useEffect} from "react"
import CardVaga from "../Card/CardVaga"
import CardOng from "../Card/CardOng"
import LoadingHome from "../LoadingHome/LoadingHome"

export default function HomeGrid(){
    const [visibleVaga,setVisibleVaga] = React.useState(true)
    const [visibleONG,setVisibleONG] = React.useState(false)
    const [vagas, setVagas] = React.useState([])
    const [ongs, setOngs] = React.useState([])

    const fetchData = async () => {
        const vagasFetch = await fetch('http://localhost:3001/').then((e) => e.json()).then((e) => e.posts);
        const ongsFetch = await fetch('http://localhost:3001/ong').then((e) => e.json()).then((e) => e.ongs);
    
        setVagas(vagasFetch);
        setOngs(ongsFetch);
      };
      
      useEffect(() => {
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

    return(
        <div>
            <div className='text-center pb-2'>
                <p className='text-sky-600 font-semibold'>BUSQUE POR CATEGORIA DE INTERESSE</p>
            </div>
            <div>
                <div className='w-1/2 m-auto bg-zinc-400 flex justify-around rounded-xl cursor-pointer'>
                <div onClick={handleActiveVaga} className={`rounded-l-xl w-1/2 text-center font-semibold py-2 ${visibleVaga ? 'bg-sky-300' : 'border-r-2'}`}>
                    <p>VAGAS</p>
                </div>
                <div onClick={handleActiveONG} className={`rounded-r-xl w-1/2 text-center font-semibold py-2 ${visibleONG ? 'bg-sky-300' : 'border-l-2'}`}>
                    <p>ONGS</p>
                </div>
                </div>
            </div>
            <div className="relative">
                {visibleVaga ? (
                    <Suspense fallback={<LoadingHome/>}>
                    <CardVaga vagas={vagas}/>
                    </Suspense>
                ) : visibleONG ? (
                    <Suspense fallback={<LoadingHome/>}>
                        <CardOng ongs={ongs}/>
                    </Suspense>
                ) : <h1 className='text-center text-4xl text-sky-700 mt-8'>Carregando...</h1>}
            </div>
        </div>
    )
}