'use client'
import React, { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'
import { SiWorldhealthorganization } from 'react-icons/si'
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'
import InputNumber from '@/components/InputNumber/InputNumber'
import { useRouter } from 'next/navigation'

const EditOng = ({params}) => {
  const router = useRouter()
  const id = params.params[0]


  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [number,setNumber] = useState('')
  const [descricao,setDescricao] = useState('')
  const [sobre,setSobre] = useState('')

  const [alertName, setAlertName] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)
  const [alertDescricao, setAlertDescricao] = useState(false)
  const [alertSobre, setAlertSobre] = useState(false)

  useEffect(() => {
    const timeoutName = setTimeout(() => setAlertName(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);
    const timeoutDescricao = setTimeout(() => setAlertDescricao(false), 2000);
    const timeoutSobre = setTimeout(() => setAlertSobre(false), 2000);

    return () => {
      clearTimeout(timeoutName);
      clearTimeout(timeoutEmail);
      clearTimeout(timeoutDescricao);
      clearTimeout(timeoutSobre);
    };
  }, [alertName, alertEmail, alertDescricao, alertSobre]);


  function handleSubmit(){
    if (!verifyName || !verifyEmail || !verifyDescricao || !verifySobre){
      return 
    }

    set

  }

  function verifyName(name){
    if (name.length > 3) {
      setName(name)
      return true
    } else {
      setName('')
      setAlertName(true)
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

  function redirect(id){
    router.push(`info_ong/${id}`)
  }
  
  
  return (
    <main className='flex flex-row-reverse px-20 pt-20 justify-around max-[1100px]:justify-between max-[1100px]:px-8 max-[1100px]:pt-4 max-[400px]:px-2 max-[870px]:flex-col-reverse max-[870px]:mt-12 min-[870px]:mt-10 max-[432px]:mt-2 '>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col p-2 max-[350px]:p-0 gap-2 max-[870px]:w-80 max-[870px]:mx-auto'>
          <label htmlFor='descricao' className='text-2xl text-gray-700 font-semibold'>Descrição da ONG:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='descricao' onChange={({target}) => setDescricao(target.value)} data-limit-rows="true" value={descricao} name="descricao" rows="4" cols="50"></textarea>
          { alertDescricao ? (
            <p className='text-red-500 text-sm'>
              Descrição inválida
            </p>
          ) : null}
        </div>
        <div className='flex flex-col p-2 gap-2 max-[870px]:w-80 max-[870px]:mx-auto'>
          <label htmlFor='sobre' className='text-2xl text-gray-700 font-semibold'>Sobre a ONG:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='sobre' onChange={({target}) => setSobre(target.value)} value={sobre} name="sobre" rows="4" cols= "50"></textarea>
          { alertSobre ? (
            <p className='text-red-500 text-sm'>
              Sobre inválido
            </p>
          ) : null}
        </div>
        <div className='w-80 mx-auto flex gap-4 min-[870px]:hidden'>
            <button onClick={handleSubmit} className='w-1/2 font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
              Salvar
            </button>
            <button onClick={() => redirect(id)} className='w-1/2 font-bold py-3 text-white bg-red-500 hover:bg-red-300 rounded-lg'>
              Cancelar
            </button>
          </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-center text-gray-700 font-semibold text-3xl mb-3'>
            Editar ONG
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <InputSignIn
          type="text"
          name="nome"
          placeholder="Nome da sua ONG"
          icon={SiWorldhealthorganization}
          setValue={setName}
          value={name}
          />
          {alertName ? (
            <p className='text-red-500 text-sm'>
              Nome inválido
            </p>
          ) : null }
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
          <InputNumber Icon={FiPhone} setNumber={setNumber}/>
          <div className='w-full hidden gap-4 min-[870px]:flex'>
            <button onClick={handleSubmit} className='w-1/2 font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
              Salvar
            </button>
            <button onClick={() => redirect(id)} className='w-1/2 font-bold py-3 text-white bg-red-500 hover:bg-red-300 rounded-lg'>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditOng
