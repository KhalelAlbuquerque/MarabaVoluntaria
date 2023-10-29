'use client'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { VscOrganization } from 'react-icons/vsc'
import { FiPhone } from 'react-icons/fi'
import { SiWorldhealthorganization } from 'react-icons/si'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'
import {signIn} from 'next-auth/react'

import request from '@/helpers/request'
import Notification from '@/components/Notifier/Notification.js'


export default function CadastroOng() {

  const router = useRouter()

  const [user,setUser] = useState('')
  const [cnpj,setCnpj] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [number,setNumber] = useState('')
  const [descricao, setDescricao] = useState('')
  const [sobre, setSobre] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertNumber, setAlertNumber] = useState(false)
  const [alertUser, setAlertUser] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)
  const [alertCnpj, setAlertCnpj] = useState(false)
  const [alertDescricao, setAlertDescricao] = useState(false)
  const [alertSobre, setAlertSobre] = useState(false)



  var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  var RegExCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

  useEffect(() => {
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutNumber = setTimeout(() => setAlertNumber(false), 2000);
    const timeoutUser = setTimeout(() => setAlertUser(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);
    const timeoutCnpj = setTimeout(() => setAlertCnpj(false), 2000);
    const timeoutDescricao = setTimeout(() => setAlertDescricao(false), 2000);
    const timeoutSobre = setTimeout(() => setAlertSobre(false), 2000);

    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutNumber);
      clearTimeout(timeoutUser);
      clearTimeout(timeoutEmail);
      clearTimeout(timeoutCnpj);
      clearTimeout(timeoutDescricao);
      clearTimeout(timeoutSobre);
    };
  }, [alertPass, alertNumber, alertUser, alertEmail, alertCnpj, alertDescricao, alertSobre]);

  async function handleSubmit(e) {
    e.preventDefault();
    if(
      !verifyNumber(number) ||
      !verifyPass(password) ||
      !verifyUser(user) ||
      !verifyEmail(email) ||
      !verifyCnpj(cnpj) ||
      !verifyDescricao(descricao) ||
      !verifySobre(sobre)
    ) return

      const newOng = {
        name: user,
        description: descricao,
        about: sobre,
        email: email,
        password: password,
        phoneNumber: number,
        cnpj: cnpj,
      }

      const requisicao = await request('ong/registrar', 'POST', newOng)

      if (requisicao.ok) {
        try{
          const res = await signIn('credentials',{
            redirect:false,
            email: email,
            password: password,
            userType: 'ong'
          })
          
          if (res.ok) {
            Notification('success', 'Cadastro Efetuado!');
            setLoading(false)
            router.push('/');
          } else {
            Notification('error',res.error);
            setLoading(false)
            return
          }
        }catch(e){
          console.log(e)
        }
      } else {
        Notification('error', requisicao.message);
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


  // regex com erro, sempre negada
  // function verifyCnpj(cnpj){
  //   if (RegExCnpj.test(cnpj)) {
  //     setCnpj(cnpj)
  //     return true
  //   } else {
  //     setCnpj('')
  //     setAlertCnpj(true)
  //     return false
  //   }
  // }

  function verifyCnpj(cnpj){
      setCnpj(cnpj)
      return true

  }

  function verifyDescricao(descricao) {
    if (descricao.length > 10) {
      setDescricao(descricao)
      return true
    } else {
      setDescricao('')
      setAlertDescricao(true)
      return false
    }
  }

  function verifySobre(sobre) {
    if (sobre.length > 10) {
      setSobre(sobre)
      return true
    } else {
      setSobre('')
      setAlertSobre(true)
      return false
    }
  }

  return (
    <main className='flex flex-row-reverse px-20 items-center justify-around max-[720px]:flex-col max-[720px]:mt-12 min-[720px]:mt-10 max-[432px]:mt-2 '>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='descricao' className='text-2xl font-semibold'>Descrição da ONG:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='descricao' onChange={({target}) => setDescricao(target.value)} data-limit-rows="true" value={descricao} name="descricao" rows="4" cols="50"></textarea>
          { alertDescricao ? (
            <p className='text-red-500 text-sm'>
              Descrição inválida
            </p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='sobre' className='text-2xl font-semibold'>Sobre a ONG:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='sobre' onChange={({target}) => setSobre(target.value)} value={sobre} name="sobre" rows="6" cols= "10"></textarea>
          { alertSobre ? (
            <p className='text-red-500 text-sm'>
              Sobre inválido
            </p>
          ) : null}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-center text-gray-700 font-semibold text-3xl mb-8'>
            Faça o cadastro da sua ONG
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <InputSignIn
          type="text"
          name="nome"
          placeholder="Nome da sua ONG"
          icon={SiWorldhealthorganization}
          setValue={setUser}
          value={user}
          />
          {alertUser ? (
            <p className='text-red-500 text-sm'>
              Nome inválido
            </p>
          ) : null }
          <InputSignIn
          type="text"
          name="cnpj"
          placeholder="CNPJ da sua ONG"
          icon={VscOrganization}
          setValue={setCnpj}
          value={cnpj}
          />
          {alertCnpj ? (
            <p className='text-red-500 text-sm'>CNPJ invalido</p>
          ) : null}
          <InputSignIn
          type="email"
          name="email"
          placeholder="Email da ONG"
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
          placeholder="Número da ONG"
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
          placeholder="Senha da ONG"
          icon={AiOutlineLock}
          setValue={setPassword}
          value={password}
          />
          <input value={"ong"} onChange={()=>{}} className='hidden' name='userType'></input>
          {alertPass ? (
            <p className='text-red-500 text-sm'>
              Senha deve conter no mínimo 8 caracteres
            </p>
          ) : null}
          <button onClick={handleSubmit} className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
            Cadastrar ONG
          </button>
        </form>
      </div>
    </main>
  )
}
