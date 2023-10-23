'use client'
import { VscOrganization } from 'react-icons/vsc'
import { MdDateRange } from 'react-icons/md'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'

export default function CadastroVaga() {

  const router = useRouter()

  const [title,setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [weeklyHours, setWeeklyHours] = useState('')
  const [descricao, setDescricao] = useState('')
  const [sobre, setSobre] = useState('')

  // ALERTS !!!!
  const [alertDescricao, setAlertDescricao] = useState(false)
  const [alertSobre, setAlertSobre] = useState(false)
  const [alertTitle, setAlertTitle] = useState(false)
  const [alertWeeklyHours, setAlertWeeklyHours] = useState(false)
  const [alertStartDate, setAlertStartDate] = useState(false);
  const [alertEndDate, setAlertEndDate] = useState(false);

  useEffect(() => {
    const timeoutDescricao = setTimeout(() => setAlertDescricao(false), 2000);
    const timeoutSobre = setTimeout(() => setAlertSobre(false), 2000);
    const timeoutTitle = setTimeout(() => setAlertTitle(false), 2000);
    const timeoutWeeklyHours = setTimeout(() => setAlertWeeklyHours(false), 2000);
    const timeoutStartDate = setTimeout(() => setAlertStartDate(false), 2000);
    const timeoutEndDate = setTimeout(() => setAlertEndDate(false), 2000);

    return () => {
      clearTimeout(timeoutDescricao);
      clearTimeout(timeoutSobre);
      clearTimeout(timeoutTitle);
      clearTimeout(timeoutWeeklyHours);
      clearTimeout(timeoutStartDate);
      clearTimeout(timeoutEndDate);
    };
  }, [alertDescricao, alertSobre, alertTitle, alertWeeklyHours, alertStartDate, alertEndDate]);

function handleSubmit(e) {
    e.preventDefault();
    const dataValidas = verifyDatas()

    if (dataValidas) {
        setStartDate(startDate)
        setEndDate(endDate)
        verifyTitle(title)
        verifyDescricao(descricao)
        verifySobre(sobre)
    }
    // redirect()
}

  function verifyTitle(title) {
    if (title.length > 5 && title.length < 20) {
      setTitle(title)
      return true
    } else {
      setTitle('')
      setAlertTitle(true)
      return false
    }
  }
  
  function verifyDescricao(descricao) {
      if (descricao.length > 10 && descricao.length < 30) {
          setDescricao(descricao)
          return true
        } else {
            setDescricao('')
            setAlertDescricao(true)
      return false
    }
}

function verifySobre(sobre) {
    if (sobre.length > 10 && sobre.length < 30) {
        setSobre(sobre)
        return true
    } else {
        setSobre('')
        setAlertSobre(true)
        return false
    }
}

function verifyDatas() {
    const dataAtual = new Date();
    const dataInicioObj = new Date(startDate);
    console.log(dataAtual)
    console.log(dataInicioObj)
    const dataConclusaoObj = new Date(endDate);
  
    if (dataInicioObj >= dataAtual) {
      setStartDate(startDate);
  
      if (dataConclusaoObj <= dataInicioObj) {
        setAlertEndDate(true);
        return false;
      } else {
        setAlertEndDate(false);
        setEndDate(endDate);
        return true;
      }
  
    } else {
      setAlertStartDate(true);
      return false;
    }
  }

function redirect() {
  if (verifyDescricao(descricao) && verifySobre(sobre)) {
    router.push('/home')
  }
}

return (
    <main className='flex flex-row-reverse px-20 items-center justify-around max-[830px]:flex-col-reverse max-[720px]:mt-12 min-[720px]:mt-10 max-[432px]:mt-2 '>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='descricao' className='text-2xl font-semibold'>Descrição da Atividade:</label>
          <textarea className='border-2 border-gray-300 p-2 rounded-lg resize-none' id='descricao' onChange={({target}) => setDescricao(target.value)} data-limit-rows="true" value={descricao} name="descricao" rows="4" cols="50"></textarea>
          { alertDescricao ? (
            <p className='text-red-500 text-sm'>
              Descrição inválida
            </p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='sobre' className='text-2xl font-semibold'>Sobre a atividade:</label>
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
            Faça o cadastro da sua atividade
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <div>
            <label className='font-semibold text-lg'>Titulo da atividade:</label>
            <InputSignIn
            type="text"
            name="title"
            placeholder="Digite o nome da sua atividade"
            icon={VscOrganization}
            setValue={setTitle}
            value={title}
            />
            { alertTitle ? (
                <p className='text-red-500 text-sm'>
                Título inválido
                </p>
            ) : null}
          </div>
          <div>
            <label className='font-semibold text-lg'>Data de Inicio:</label>
            <InputSignIn
            type="date"
            name="startDate"
            icon={MdDateRange}
            setValue={setStartDate}
            value={startDate}
            />
            { alertStartDate ? (
                <p className='text-red-500 text-sm'>
                A data de inicio não pode ser anterior á data atual
                </p>
            ) : null}
          </div>
          <div>
            <label className='font-semibold text-lg'>Data de conclusão</label>
            <InputSignIn
            type="date"
            name="endDate"
            icon={MdDateRange}
            setValue={setEndDate}
            value={endDate}
            />
            { alertEndDate ? (
                <p className='text-red-500 text-sm'>
                A data de conclusão não pode ser anterior á data de inicio
                </p>
            ) : null}
          </div>
          <button onClick={handleSubmit} className='w-full font-bold py-3 text-white bg-sky-300 hover:bg-green-300 rounded-lg'>
            Cadastrar Atividade
          </button>
        </form>
      </div>
    </main>
  )
}
