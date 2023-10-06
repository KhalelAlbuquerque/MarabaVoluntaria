import Header from '@/components/Header/Header.jsx'
import Footer from '@/components/Footer/Footer.jsx'
import InputPrimario from '@/components/Input/InputPrimario.jsx'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'

import cadastro from './cadastro.png'

export default function Cadastro() {
  return (
    <div className='flex flex-col gap-16'>
      <header>
        <Header/>
      </header>
      <main className='flex justify-around items-center'>
        <div className='max-[1034px]:hidden flex'>
          <Image
            src={cadastro}
            alt='Imagem de cadastro'
            width={500}
            height={500}
            layout='intrinsic'
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div>
            <h1 className='text-center text-gray-700 font-semibold text-4xl mb-8'>
              Tela Cadastro
            </h1>
          </div>
          <div className='p-4 flex flex-col gap-4'>
            <InputPrimario
            type="text"
            name="name"
            placeholder="Nome"
            icon={GoPerson}
            />
            <InputPrimario
            type="text"
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
            <button className='w-full rounded-3xl py-3 text-white bg-sky-300 hover:bg-green-300'>
              Cadastrar
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
