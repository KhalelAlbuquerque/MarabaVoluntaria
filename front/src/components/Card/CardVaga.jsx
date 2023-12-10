'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';

import { BsFillPersonPlusFill } from "react-icons/bs";
import LoadingHome from '../LoadingHome/LoadingHome';

export default function CardVaga({vagas}) {

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      const windowSize = window.innerWidth;
      const isMobile = windowSize <= 510;
      setIsMobile(isMobile);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (!vagas) {
    return (
      <>
        <LoadingHome/>
      </>
    )
  }

  if (isMobile){
    return (
      <div className='flex flex-col w-[90%] max-[400px]:w-[98%] mx-auto gap-5 mt-6'>
        {vagas.map(async(data, index) => (
          <Link href={`vaga/${data._id}`} className='flex border-2 border-zinc-300 rounded-2xl relative hover:scale-105 transition-transform duration-300'>
            <div>
              <Image
                src={data.image.image.image}
                alt="Picture of the author"
                className="rounded-l-2xl w-[120px] h-full border-r-2 border-zinc-300"
                width={0}
                height={0}
              />
            </div>
            <div className="max-[400px]:hidden absolute bottom-2 left-4 py-2 bg-sky-300 w-[70px] rounded-3xl flex justify-center gap-2">
                  <BsFillPersonPlusFill className="text-white text-lg" />
                  <p className="text-white text-sm">{index + 1}</p>
                </div>
            <div className='flex flex-col gap-3 min-[400px]:items-start min-[400px]:px-4 mt-4'>
              <h1 className='text-blue-900 font-bold text-center'>
                {data.title}
              </h1>
              <p className='text-gray-700 font-semibold text-sm text-center'>
                {data.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className='flex justify-center gap-8 flex-wrap mt-6'>
      {vagas.map(async(data, index) => (
        <Link key={index + 1} className='hover:scale-105 transition-transform duration-300' href={`vaga/${data._id}`}>
          <div className="flex flex-col w-72 max-[770px]:w-56 max-[770px]:h-[400px] bg-neutral-100 rounded-2xl shadow-2xl pb-4 h-[465px] border-2 border-zinc-300 relative">
  
            <div className='h-48'>
              <div className="h-full overflow-hidden relative">
                <Image
                  src={data.image.image.image}
                  alt="Picture of the author"
                  className="rounded-t-2xl rounded-b-xl w-full h-full"
                  width={0}
                  height={0}
                />
                <div className="absolute bottom-2 left-4 py-2 bg-sky-300 w-[70px] rounded-3xl flex justify-center gap-2">
                  <BsFillPersonPlusFill className="text-white text-lg" />
                  <p className="text-white text-sm">{index + 1}</p>
                </div>
              </div>
            </div>
  
            <div className="px-6 flex-grow">
              <div className="text-xl font-semibold mb-3">
                <p className="text-start text-blue-900">{data.title}</p>
              </div>
              <div>
                <p className="text-start text-gray-700 font-semibold text-sm">{data.description}</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button className="bg-sky-600 px-8 max-[770px]:px-2 max-[770px]:w-[150px] py-3 rounded-xl text-white font-bold shadow-2xl">
                Ver vaga
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}