import Image from 'next/image'
import Header from '@/components/Header/Header.jsx'
import Footer from '@/components/Footer/Footer.jsx'
import InputPrimario from '@/components/Input/InputPrimario'
import { AiOutlineMail } from 'react-icons/ai'
import  { AiOutlineLock } from 'react-icons/ai'
import login from './login.png'

export default function Login() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header/>
      </header>
      <main className='flex justify-around items-center max-[720px]:flex-col max-[720px]:mt-12 min-[720px]:mt-32'>
        <div>
          <Image
            src={login}
            alt='Imagem de cadastro'
            className='max-[1025px]:w-[400px] max-[768px]:w-[400px] max-[425px]:w-[300px] max-[720px]:w-[300px]'
            layout='intrinsic'
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div>
            <h1 className='text-center text-gray-700 font-semibold text-4xl mb-8'>
              Faça seu login
            </h1>
          </div>
          <div className='p-4 flex flex-col gap-4'>
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
      <footer className='mt-auto w-full'>
       <Footer/>
      </footer>
    </div>
  )
}
