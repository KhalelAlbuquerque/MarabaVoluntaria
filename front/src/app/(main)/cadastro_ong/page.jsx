'use client'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { VscOrganization } from 'react-icons/vsc'
import { FiPhone } from 'react-icons/fi'
import { SiWorldhealthorganization } from 'react-icons/si'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'

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

  function handleSubmit(e) {
    e.preventDefault();
    verifyNumber(number)
    verifyPass(password)
    verifyUser(user)
    verifyEmail(email)
    verifyCnpj(cnpj)
    verifyDescricao(descricao)
    verifySobre(sobre)
    redirect()
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

  function redirect() {
    if (verifyNumber(number) && verifyPass(password) && verifyUser(user) && verifyEmail(email) && verifyCnpj(cnpj) && verifyDescricao(descricao) && verifySobre(sobre)) {
      router.push('/home')
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

  function verifyCnpj(cnpj){
    if (RegExCnpj.test(cnpj)) {
      setCnpj(cnpj)
      return true
    } else {
      setCnpj('')
      setAlertCnpj(true)
      return false
    }
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

  let descricaoOng = 'Somos uma instituição que atua a 51 anos na Ceilândia-DF, com atendimento gratuito a crianças e para a comunidade por meio de cursos profissionalizantes.'
  let sobreOng = 'O Centro Social Luterano Cantinho do Girassol foi fundado em 16 de março de 1972 (oFIcialmente em 20 de maio de 1974), em Ceilândia – Distrito Federal, mantido pela Comunidade Evangélica de ConFIssão Luterana de Brasília, como um Centro de auxílio a crianças e adolescentes de baixa renda residentes na região.'

  return (
    <main className='flex flex-row-reverse px-20 items-center justify-around max-[720px]:flex-col max-[720px]:mt-12 min-[720px]:mt-10 max-[432px]:mt-2 '>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='descircao' className='text-2xl font-semibold'>Descrição da ONG:</label>
          <textarea className='border-2 p-2 rounded-lg' id='descricao' onChange={({target}) => setDescricao(target.value)} value={descricao} name="descricao" rows="4" cols="50"></textarea>
          { alertDescricao ? (
            <p className='text-red-500 text-sm'>
              Descrição inválida
            </p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='sobre' className='text-2xl font-semibold'>Sobre a ONG:</label>
          <textarea className='border-2 p-2 rounded-lg' id='sobre' onChange={({target}) => setSobre(target.value)} value={sobre} name="sobre" rows="6" cols= "50"></textarea>
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
