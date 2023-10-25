'use client'
import InputPrimario from '@/components/Input/InputPrimario.jsx'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'
import { useState,useEffect } from 'react'

import cadastro from './cadastro.png'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'

import request from '@/api/request'
import Notification from '@/components/Notifier/Notification.js'

import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'

export default function Cadastro() {

  const router = useRouter()

  const [user,setUser] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [number,setNumber] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertNumber, setAlertNumber] = useState(false)
  const [alertUser, setAlertUser] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)

  
  // TIRAR QUANDO CRIAR O SAVEONG, vai dar erro sem
  // const { SaveUser } = useContext(AuthContext)

  var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  useEffect(() => {
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutNumber = setTimeout(() => setAlertNumber(false), 2000);
    const timeoutUser = setTimeout(() => setAlertUser(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);

    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutNumber);
      clearTimeout(timeoutUser);
      clearTimeout(timeoutEmail);
    };
  }, [alertPass, alertNumber, alertUser, alertEmail]);

  async function handleSubmit(e) {
    e.preventDefault();
    if(
      !verifyNumber(number) ||
      !verifyPass(password) ||
      !verifyUser(user) ||
      !verifyEmail(email)
    ) return

    const newUser = {
      name: user,
      email: email,
      password: password,
      phoneNumber: number
    }

    const requisicao = await request("user/registrar", "POST", newUser)
    
    if(requisicao.ok){
      Notification('success', 'Cadastro Efetuado!');
      router.push('/')
    }else{
      Notification('error', requisicao.message)
    }
    
  }

  function verifyPass(password) {
    if (password.length > 8) {
      setPassword(password);
      return true
    } else {
      setPassword('');
      setAlertPass(true);
      return false
    }
  }

  function verifyNumber(number) {
    if (RegExp.test(number)) {
      setNumber(number);
      return true
    } else {
      setNumber('');
      setAlertNumber(true);
      return false
    }
  }


  function verifyUser(user){
    if (user.length > 3) {
      setUser(user)
      return true
    } else {
      setUser('')
      setAlertUser(true)
      return false
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
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <InputSignIn
          type="text"
          name="nome"
          placeholder="Nome"
          icon={GoPerson}
          setValue={setUser}
          value={user}
          />
          {alertUser ? (
            <p className='text-red-500 text-sm'>
              Nome inválido
            </p>
          ) : null }
          <InputSignIn
          type="email"
          name="email"
          placeholder="Email"
          icon={AiOutlineMail} 
          setValue={setEmail}
          value={email}
          />
          {alertEmail ? (
            <p className='text-red-500 text-sm'>
              Email inválido
            </p>
          ) : null}
          <InputSignIn
          type="text"
          name="number"
          placeholder="Número"
          icon={FiPhone}
          setValue={setNumber}
          value={number}
          />
          {alertNumber ? (
            <p className='text-red-500 text-sm'>
              Número inválido
            </p>
          ) : null}
          <InputSignIn
          type="password"
          name="password"
          placeholder="Senha"
          icon={AiOutlineLock}
          setValue={setPassword}
          value={password}
          />
          {alertPass ? (
            <p className='text-red-500 text-sm'>
              Senha deve conter no mínimo 8 caracteres
            </p>
          ) : null}
          <button className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  )
}
