'use client'
import Image from 'next/image'
import  { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import login from '../login/login.png'
import Link from 'next/link'
// import { cookies } from "next/headers"
// import checkLogin from '@/api/checkToken'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'
import { useRouter } from 'next/navigation'

import request from '@/api/request'
import Notification from '@/components/Notifier/Notification.js'

import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'

// funcao teste, nao usar nessa pagina, recolhe cookies do usuario
// export function checalogin(){
//   "use strict"

//   console.log(checkLogin())
// }

export default function LoginOng() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertEmail,setAlertEmail] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)


  // TIRAR QUANDO CRIAR O SAVE ONG
  const { SaveOng } = useContext(AuthContext)


  useEffect(() => {
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);
    const timeoutWrongUser = setTimeout(() => setWrongUser(false), 3000);
 
    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutEmail);
      clearTimeout(timeoutWrongUser);
    };
  }, [alertPass, alertEmail, wrongUser]);

  
  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!verifyEmail(email) || !verifyPass(password)) return;
  
    const requisicao = await request('auth/ong/login', 'POST',  { email, password });

    if (requisicao.ok) {
      Notification('success', 'Login Efetuado!');
      SaveOng(requisicao.ongName, requisicao.accessToken, requisicao.ongImg)
      setCookie(null, 'token', requisicao.accessToken, {
        maxAge: 30*24*60*60,
        path: '/'
      })
      router.push('/');
    } else {
      Notification('error', requisicao.message);
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
          {alertPass ? <p className="text-red-500">Senha deve ter no mínimo 8 caracteres</p> : null}
          {wrongUser ? <p className="text-red-500">Email ou senha incorretos</p> : null}
          <button  onClick={handleSubmit} className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
            Login
          </button>
          <p className=' text-center text-gray-700'>Ainda não possui conta? <Link href={"/cadastro_ong"} className="font-bold underline">Cadastre sua ONG</Link></p>
        </form>
      </div>
    </main>
  )
}
