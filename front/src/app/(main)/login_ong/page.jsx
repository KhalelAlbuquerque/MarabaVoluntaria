'use client'
import Image from 'next/image'
import  { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import login from '../login/login.png'
import Link from 'next/link'

import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'
import { useRouter } from 'next/navigation'
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react'

import Notification from '@/components/Notifier/Notification.js'
import gifLoading from '@/components/Loading/loading.gif'
import LoadingHome from '@/components/LoadingHome/LoadingHome'

export default function LoginOng() {

  const router = useRouter()
  const {data:session, status} = useSession()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertEmail,setAlertEmail] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  function prepareAmbient(){
    if(status == 'loading') return
    if(status == 'authenticated') {router.push('/'); return Notification("error", "Você já está autenticado!")}
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);
    const timeoutWrongUser = setTimeout(() => setWrongUser(false), 3000);
    setIsLoading(false)
    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutEmail);
      clearTimeout(timeoutWrongUser);
    };
  }



  useEffect(() => {
    prepareAmbient()
  }, [alertPass, alertEmail, wrongUser, status]);

  
  async function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault();
  
    if (!verifyEmail(email) || !verifyPass(password)) return;
  
    const res = await signIn('credentials',{
      redirect:false,
      email: email,
      password: password,
      userType: 'ong'
    })
    
    if (res.ok) {
      Notification('success', 'Login Efetuado!');
      setIsLoading(false)
      router.push('/');
    } else {
      Notification('error',res.error);
      setIsLoading(false)
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
    if (email === '') { // verificação padrão deixa quando o valor é vazio
      setEmail('')
      setAlertEmail(true)
      return false
    } else {
      setEmail(email)
      return true
    }
  }

  if(isLoading) return <LoadingHome/>

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
            Faça login com sua ONG
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <InputSignIn
            type="email"
            name="email"
            placeholder="Email ONG"
            icon={AiOutlineMail}
            value={email}
            setValue={setEmail}
          />
          {alertEmail ? <p className="text-red-500">Email inválido</p> : null}
          <InputSignIn
            type="password"
            name="password"
            placeholder="Senha ONG"
            icon={AiOutlineLock}
            value={password}
            setValue={setPassword}
          />
          <input value={'ong'} onChange={()=>{}} className='hidden' name='userType'></input>
          {alertPass ? <p className="text-red-500">Senha deve ter no mínimo 8 caracteres</p> : null}
          {wrongUser ? <p className="text-red-500">Email ou senha incorretos</p> : null}
          <button  onClick={handleSubmit} className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg max-[337px]:w-[250px] max-[337px]:mx-auto'>
            { isLoading ? <div className='flex gap-5 justify-center'><p>Login</p><Image alt='gif loading' src={gifLoading} height={20}/></div> : 'Login' }
          </button>
          <p className=' text-center text-gray-700'>Ainda não possui conta? <Link href={"/cadastro_ong"} className="font-bold underline">Cadastre sua ONG</Link></p>
        </form>
      </div>
    </main>
  )
}
