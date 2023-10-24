'use client'
import Image from 'next/image'
import InputPrimario from '@/components/Input/InputPrimario'
import { AiOutlineMail } from 'react-icons/ai'
import  { AiOutlineLock } from 'react-icons/ai'
import login from './login.png'
import Link from 'next/link'
// import { cookies } from "next/headers"
// import checkLogin from '@/api/checkToken'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'
import { useRouter } from 'next/navigation'


import Notification from '@/components/Notifier/Notification.js'

// funcao teste, nao usar nessa pagina, recolhe cookies do usuario
// export function checalogin(){
//   "use strict"

//   console.log(checkLogin())
// }

export default function Login() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertEmail,setAlertEmail] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)



  let passwordFetch = '12345678'
  let emailFetch = 'josuedantas@unifesspa.edu.br'

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

    const response = await fetch('http://localhost:3001/auth/login', {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      Notification('success', "Login Efetuado!")
      router.push('/')
    } else {
      Notification('error', `Credenciais inválidas`)
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

  function redirect(){
    if (verifyEmail(email) && verifyPass(password) && currentUser()) {
      router.push('/')
    }
  }


  function currentUser(){
    if (email === emailFetch && password === passwordFetch) {
      return true
    } else {
      setWrongUser(true)
      return false
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
            Faça seu login
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
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
          {alertPass ? <p className="text-red-500">Senha deve ter no mínimo 8 caracteres</p> : null}
          {wrongUser ? <p className="text-red-500">Email ou senha incorretos</p> : null}
          <button  onClick={handleSubmit} className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
            Login
          </button>
          <p className=' text-center text-gray-700'>Ainda não possui conta? <Link href={"/cadastro"} className="font-bold underline">Cadastre-se</Link></p>
        </form>
      </div>
    </main>
  )
}
