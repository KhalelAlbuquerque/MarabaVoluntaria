import Header from '@/components/Header/Header.jsx'
import Footer from '@/components/Footer/Footer.jsx'
import InputPrimario from '@/components/Input/InputPrimario.jsx'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'

import cadastro from './cadastro.png'

export default function Cadastro() {
  return (
    <div className='flex flex-col'>
      <header>
        <Header/>
      </header>
      <main className='flex justify-around items-center max-[720px]:flex-col max-[720px]:mt-12 min-[720px]:mt-32'>
        <div>
          <Image
            src={cadastro}
            alt='Imagem de cadastro'
            className='max-[1025px]:w-[400px] max-[768px]:w-[400px] max-[425px]:w-[300px] max-[720px]:w-[300px]'
            layout='intrinsic'
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div>
            <h1 className='text-center text-gray-700 font-semibold text-4xl mb-8'>
              Faça seu cadastro
            </h1>
          </div>
          <div className='p-4 flex flex-col gap-4'>
            <InputPrimario
            type="text"
            name="nome"
            placeholder="Nome"
            icon={GoPerson}
            />
            <InputPrimario
            type="email"
            name="email"
            placeholder="Email"
            icon={AiOutlineMail} 
            />
            <InputPrimario
            type="password"
            name="password"
            placeholder="Senha"
            icon={AiOutlineLock}
            />  
            <button className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
              Login
            </button>
          </div>
        </div>
      </main>
      <footer className='fixed bottom-0 w-full'>
       <Footer/>
      </footer>
    </div>
  )
}
