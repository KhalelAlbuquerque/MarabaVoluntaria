'use client'
import Image from 'next/image'
import InputPrimario from '@/components/Input/InputPrimario'
import { AiOutlineMail } from 'react-icons/ai'
import  { AiOutlineLock } from 'react-icons/ai'
import { AiOutlineLoading } from 'react-icons/ai'

import gifLoading from '@/components/Loading/loading.gif'

import login from './login-removebg-preview.png'
import Link from 'next/link'
// import { cookies } from "next/headers"
// import checkLogin from '@/api/checkToken'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'
import { useRouter } from 'next/navigation'

import Notification from '@/components/Notifier/Notification.js'
import {signIn} from 'next-auth/react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'



export default function Login() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertEmail,setAlertEmail] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);

    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutEmail);
    };
  }, [alertPass, alertEmail]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
  
    if (!verifyEmail(email) || !verifyPass(password)) return;
  
    const res = await signIn('credentials',{
      redirect:false,
      email: email,
      password: password,
      userType: 'user'
    })
    setLoading(false)
    
    if (res.ok) {
      Notification('success', 'Login Efetuado!');
      router.push('/');
    } else {
      Notification('error',res.error);
      return
    }
  }

  function verifyPass(password){
    if (password.length < 8) {
      setAlertPass(true)
      return false
    } else {
      setPassword(password)
      return true
    }
  }

  function verifyEmail(email) {
    if (email === '') {
      setEmail('')
      setAlertEmail(true)
      return false
    } else {
      setEmail(email)
      return true
    }
  }

  return (
    <div>
      <div className='max-[840px]:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-r-4 shadow-2xl rounded-full'>
        <MdOutlineKeyboardArrowRight className='text-5xl'/>
      </div>
      <main className='flex justify-between max-[840px]:justify-start max-[840px]:mt-12 max-[840px]:flex-col max-[840px]:items-center h-screen'> 
        <div className='flex justify-center items-center w-1/2 bg-indigo-100 max-[840px]:bg-white max-[840px]:w-full'>
          <Image
            src={login}
            alt='Imagem de cadastro'
            className='mx-auto max-[1025px]:w-[400px] max-[768px]:w-[400px] max-[425px]:w-[300px] max-[840px]:w-[300px]'
            layout='intrinsic'
          />
        </div>
        <div className='flex flex-col justify-center items-center mx-auto w-1/2 max-[840px]:w-full'>
          <div>
            <h1 className='text-center text-gray-700 font-semibold text-4xl mb-8'>
              Faça seu login
            </h1>
          </div>
          <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4 max-[337px]:w-full'>
            <InputSignIn
            type="email"
            name="email"
            placeholder="Email"
            icon={AiOutlineMail}
            value={email}
            setValue={setEmail}
            />
            {alertEmail ? <p className="text-red-500">Email inválido</p> : null}
            <InputSignIn
            type="password"
            name="password"
            placeholder="Senha"
            icon={AiOutlineLock}
            value={password}
            setValue={setPassword}
            />
            <input value={"user"} onChange={()=>{}} className='hidden' name='userType'></input>
            {alertPass ? <p className="text-red-500">Senha deve ter no mínimo 8 caracteres</p> : null}
            <button  onClick={handleSubmit} className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg max-[337px]:w-[250px] max-[337px]:mx-auto'>
              { loading ? <div className='flex gap-5 justify-center'><p>Login</p><Image src={gifLoading} height={20}/></div> : 'Login' }
            </button>
            <p className=' text-center text-gray-700'>Ainda não possui conta? <Link href={"/cadastro"} className="font-bold underline">Cadastre-se</Link></p>
          </form>
        </div>
      </main>
    </div>
  )
}
