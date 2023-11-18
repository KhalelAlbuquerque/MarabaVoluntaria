'use client'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { VscOrganization } from 'react-icons/vsc'
import { FiPhone } from 'react-icons/fi'
import { SiWorldhealthorganization } from 'react-icons/si'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'
import {signIn, useSession} from 'next-auth/react'

import request from '@/helpers/request'
import Notification from '@/components/Notifier/Notification.js'
import LoadingHome from '@/components/LoadingHome/LoadingHome'


export default function CadastroOng() {

  const router = useRouter()
  const {data:session, status} = useSession()

  const [user,setUser] = useState('')
  const [cnpj,setCnpj] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [number,setNumber] = useState('')
  const [descricao, setDescricao] = useState('')
  const [sobre, setSobre] = useState('')
  const [image, setImage] = useState('')
  const [alertPass, setAlertPass] = useState(false)
  const [alertNumber, setAlertNumber] = useState(false)
  const [alertUser, setAlertUser] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)
  const [alertCnpj, setAlertCnpj] = useState(false)
  const [alertDescricao, setAlertDescricao] = useState(false)
  const [alertSobre, setAlertSobre] = useState(false)
  const [isLoading, setIsLoading] = useState(true)



  var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  var RegExCnpj = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;


  function prepareAmbient(){
    if(status == 'loading') return
    if(status == 'authenticated') {router.push('/'); return Notification("error", "Você já está autenticado!")}
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutNumber = setTimeout(() => setAlertNumber(false), 2000);
    const timeoutUser = setTimeout(() => setAlertUser(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);
    const timeoutCnpj = setTimeout(() => setAlertCnpj(false), 2000);
    const timeoutDescricao = setTimeout(() => setAlertDescricao(false), 2000);
    const timeoutSobre = setTimeout(() => setAlertSobre(false), 2000);

    setIsLoading(false)

    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutNumber);
      clearTimeout(timeoutUser);
      clearTimeout(timeoutEmail);
      clearTimeout(timeoutCnpj);
      clearTimeout(timeoutDescricao);
      clearTimeout(timeoutSobre);
    };
  }


  useEffect(() => {
    prepareAmbient()
  }, [alertPass, alertNumber, alertUser, alertEmail, alertCnpj, alertDescricao, alertSobre, status]);

  async function handleSubmit(e) {
    e.preventDefault();
    if(isLoading) return
    setIsLoading(true)
    if(
      !verifyNumber(number) ||
      !verifyPass(password) ||
      !verifyUser(user) ||
      !verifyEmail(email) ||
      !verifyCnpj(cnpj) ||
      !verifyDescricao(descricao) ||
      !verifySobre(sobre)
    ) return

      const imageObject = await request('image/create', "PUT", {image64:image})

      let imageId = imageObject.id

      const newOng = {
        name: user,
        description: descricao,
        about: sobre,
        email: email,
        password: password,
        phoneNumber: number,
        cnpj: cnpj,
        image: imageId
      }

      const requisicao = await request('ong/registrar', 'POST', newOng)

      if (requisicao.ok) {
        try{
          const res = await signIn('credentials',{
            redirect:false,
            email: email,
            password: password,
            userType: 'ong',
          })
          
          if (res.ok) {
            Notification('success', 'Cadastro Efetuado!');
            setLoading(false)
            router.push('/');
          } else {
            Notification('error',res.error);
            setIsLoading(false)
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
    if (password.length >= 8) {
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

  function convertToBase64(e){
    var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImage(reader.result)
        }
        reader.onerror = (error=>{
            console.log(error)
        })
  }

  if(isLoading) return <LoadingHome/>

  return (
    <main className='flex mb-32 flex-row-reverse px-20 max-[520px]:px-0 items-center justify-around max-[840px]:flex-col-reverse max-[840px]:mt-12 min-[840px]:mt-10 max-[432px]:mt-2 '>
      <div className='flex flex-col gap-12 max-[840px]:gap-0'>
        <div>
          <input type="file" onChange={convertToBase64} accept='image/*'/>
          {image == "" || image == null ? '' : <img src={image} alt="xD" className='w-40 h-40' />}
        </div>
        <div className='flex flex-col p-2 max-[350px]:p-0 gap-2 max-[840px]:w-80 max-[840px]:mx-auto'>
          <label htmlFor='descricao' className='text-2xl font-semibold'>Descrição da ONG:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='descricao' onChange={({target}) => setDescricao(target.value)} data-limit-rows="true" value={descricao} name="descricao" rows="4" cols="50"></textarea>
          { alertDescricao ? (
            <p className='text-red-500 text-sm'>
              Descrição inválida
            </p>
          ) : null}
        </div>
        <div className='flex flex-col p-2 max-[350px]:p-0 gap-2 max-[840px]:w-80 max-[840px]:mx-auto'>
          <label htmlFor='sobre' className='text-2xl font-semibold'>Sobre a ONG:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='sobre' onChange={({target}) => setSobre(target.value)} value={sobre} name="sobre" rows="6" cols= "10"></textarea>
          { alertSobre ? (
            <p className='text-red-500 text-sm'>
              Sobre inválido
            </p>
          ) : null}
        </div>
        <div className='w-80 mx-auto p-2'>
          <button onClick={handleSubmit} className='w-full font-bold py-3 justify-center hidden max-[840px]:flex text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
              Cadastrar ONG
          </button>
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
          <button type='submit' className='w-full justify-center font-bold py-3 flex max-[840px]:hidden text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
            Cadastrar ONG
          </button>
        </form>
      </div>
    </main>
  )
}
