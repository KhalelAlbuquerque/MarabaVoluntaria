import Image from 'next/image'
import InputPrimario from '@/components/Input/InputPrimario'
import { AiOutlineMail } from 'react-icons/ai'
import  { AiOutlineLock } from 'react-icons/ai'
import login from './login.png'
import Link from 'next/link'

export default function Login() {
  return (
    <main className='flex justify-around items-center max-[720px]:flex-col max-[720px]:mt-12 min-[720px]:mt-10 max-[432px]:mt-2'>
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
          <p className=' text-center text-gray-700'>Ainda não possui conta? <Link href={"/cadastro"} className="font-bold underline">Cadastre-se</Link></p>
        </div>
      </div>
    </main>
  )
}
