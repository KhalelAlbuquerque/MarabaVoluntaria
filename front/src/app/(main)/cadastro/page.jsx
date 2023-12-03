'use client'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'
import { useState,useEffect } from 'react'

import cadastro from '../login/login-removebg-preview.png'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import request from '@/helpers/request'
import Notification from '@/components/Notifier/Notification.js'
import {signIn} from 'next-auth/react'
import LoadingHome from '@/components/LoadingHome/LoadingHome'
import defaultPfp from '@/../public/pfp64.js'


export default function Cadastro() {

  const router = useRouter()
  const {data: session, status} = useSession()
  

  const [user,setUser] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [number,setNumber] = useState('')
  const [image, setImage] = useState(defaultPfp)
  const [alertPass, setAlertPass] = useState(false)
  const [alertNumber, setAlertNumber] = useState(false)
  const [alertUser, setAlertUser] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  

  var RegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  function prepareAmbient(){
    if(status == 'loading') return
    if(status == 'authenticated') {router.push('/'); return Notification("error", "Você já está autenticado!")}
    const timeoutPass = setTimeout(() => setAlertPass(false), 2000);
    const timeoutNumber = setTimeout(() => setAlertNumber(false), 2000);
    const timeoutUser = setTimeout(() => setAlertUser(false), 2000);
    const timeoutEmail = setTimeout(() => setAlertEmail(false), 2000);

    setIsLoading(false)

    return () => {
      clearTimeout(timeoutPass);
      clearTimeout(timeoutNumber);
      clearTimeout(timeoutUser);
      clearTimeout(timeoutEmail);
    };
  }

  useEffect(() => {
    prepareAmbient()
  }, [alertPass, alertNumber, alertUser, alertEmail, status]);

  async function handleSubmit(e) {
    e.preventDefault();
    if(
      !verifyNumber(number) ||
      !verifyPass(password) ||
      !verifyUser(user) ||
      !verifyEmail(email)
    ) return

    const resImg = await request('image/create', "PUT", {image64: image})
    let userImageId
    if(resImg.ok){
      userImageId = resImg
    }else{
      return Notification("error", "Erro ao subir imagem")
    }

    const newUser = {
      name: user,
      email: email,
      password: password,
      phoneNumber: number,
      image: userImageId
    }

    const requisicao = await request("user/registrar", "POST", newUser)
    
    if(requisicao.ok){
      const res = await signIn('credentials',{
        redirect:false,
        email: email,
        password: password,
        userType: 'user'
      })
      
      if (res.ok) {
        Notification('success', 'Cadastro Efetuado!');
        router.push('/');
      } else {
        Notification('error',res.error);
        return
      }
    }else{
      Notification('error', requisicao.message)
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
    <div>
      <div className='max-[890px]:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-r-4 shadow-2xl rounded-full'>
        <MdOutlineKeyboardArrowRight className='text-5xl'/>
      </div>
      <main className='flex justify-between max-[890px]:justify-start max-[890px]:items-center  max-[890px]:mt-12 max-[890px]:flex-col max-[840px]:items-center h-screen'>
        <div className='flex justify-center items-center w-1/2 bg-indigo-100 max-[890px]:bg-white max-[890px]:w-full'>
          <Image
            src={cadastro}
            alt='Imagem de cadastro'
            className='max-[1025px]:w-[400px] max-[768px]:w-[400px] max-[425px]:w-[300px] max-[890px]:w-[300px]'
          />
        </div>
        <div className='flex flex-col justify-center items-center w-1/2 max-[890px]:w-full'>
          <div>
            <h1 className='text-center text-gray-700 font-semibold text-4xl mb-8'>
              Faça seu cadastro
            </h1>
          </div>
          <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4 items-center'>
            <input type="file" onChange={convertToBase64} accept='image/*'/>
            {image == "" || image == null ? '' : <img src={image} alt="xD" className='w-40 h-40' />}
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
            <input onChange={()=>{}} value={"user"} className='hidden' name='userType'></input>
            <button className='mx-auto w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg max-[337px]:mx-auto min-[1490px]:w-[600px] sm:w-[300px] lg:mx-auto lg:w-[410px] max-[337px]:w-[250px]'>
              Cadastrar
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}