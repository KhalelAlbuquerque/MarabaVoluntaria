'use client'
import { VscOrganization } from 'react-icons/vsc'
import { MdDateRange } from 'react-icons/md'
import { useState,useEffect } from 'react'
import InputSignIn from '@/components/Input/InputSignIn'

import { useRouter } from 'next/navigation'
import InputDate from '@/components/InputDate/InputDate'
import request from '@/helpers/request'
import { useSession } from 'next-auth/react'
import Notification from '@/components/Notifier/Notification'
import LoadingHome from '@/components/LoadingHome/LoadingHome'

export default function CadastroPost() {

  const router = useRouter()
  const {data: session, status} = useSession()
  const [title,setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [weeklyHours, setWeeklyHours] = useState('')
  const [descricao, setDescricao] = useState('')
  const [sobre, setSobre] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // ALERTS !!!!
  const [alertDescricao, setAlertDescricao] = useState(false)
  const [alertSobre, setAlertSobre] = useState(false)
  const [alertTitle, setAlertTitle] = useState(false)
  const [alertWeeklyHours, setAlertWeeklyHours] = useState(false)
  const [alertStartDate, setAlertStartDate] = useState(false);
  const [alertEndDate, setAlertEndDate] = useState(false);


  async function prepareAmbient(){

    if(status=='loading') return
    if(status=='unauthenticated') {router.push('/login_ong');return Notification('error', "Você precisa estar logado para acessar essa página")}
    if(session.user.role!='Ong') {router.push('/');return Notification('error', "Você precisa ser uma Ong para acessar essa página")}

    const timeoutDescricao = setTimeout(() => setAlertDescricao(false), 2000);
    const timeoutSobre = setTimeout(() => setAlertSobre(false), 2000);
    const timeoutTitle = setTimeout(() => setAlertTitle(false), 2000);
    const timeoutWeeklyHours = setTimeout(() => setAlertWeeklyHours(false), 2000);
    const timeoutStartDate = setTimeout(() => setAlertStartDate(false), 2000);
    const timeoutEndDate = setTimeout(() => setAlertEndDate(false), 2000);
    setIsLoading(false)

    return () => {
      clearTimeout(timeoutDescricao);
      clearTimeout(timeoutSobre);
      clearTimeout(timeoutTitle);
      clearTimeout(timeoutWeeklyHours);
      clearTimeout(timeoutStartDate);
      clearTimeout(timeoutEndDate);
    };
  }


  useEffect(() => {
    prepareAmbient()
  }, [alertDescricao, alertSobre, alertTitle, alertWeeklyHours, alertStartDate, alertEndDate, status]);

  async function handleSubmit(e) {
      e.preventDefault();
      const dataValidas = verifyDate()

      const formatedStartDate = formatData(startDate)
      const formatedEndDate = formatData(endDate)

      if(!verifyTitle(title)) return
      if(!verifyDescricao(descricao)) return
      if(!verifySobre(sobre)) return

      if (dataValidas) {
          const res = await request('post/novo-post', "POST", {title, description: descricao, startDate: formatedStartDate, endDate: formatedEndDate, weeklyHours, about: sobre}, `Bearer ${session.user.accessToken}`)
          if(res.ok){
            Notification('success', "Post cadastrado, basta aguardar um administrador aprovar")
            router.push('/myOng')
            return
          }else{
            return Notification('error', res.message)
          }
      }
      // redirect()
  }

  function formatData(input){
    var partes = input.split('/');
  
    var data = new Date(partes[2], partes[1] - 1, partes[0]);
    
    var ano = data.getFullYear();
    var mes = padLeft(data.getMonth() + 1, 2);
    var dia = padLeft(data.getDate(), 2);
    var horas = padLeft(data.getHours(), 2);
    var minutos = padLeft(data.getMinutes(), 2);
    var segundos = padLeft(data.getSeconds(), 2);
    var milissegundos = padLeft(data.getMilliseconds(), 3);

    var resultado = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milissegundos}Z`;
    
    return resultado;
  }

  function padLeft(valor, largura, caracter) {
    caracter = caracter || '0';
    valor = valor + '';
    while (valor.length < largura) {
      valor = caracter + valor;
    }
    return valor;
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

  function verifyDate(startDate,endDate){
    return true
  }


return (
    <main className='flex flex-row-reverse px-20 items-center justify-around max-[830px]:flex-col-reverse max-[720px]:mt-12 min-[720px]:mt-10 max-[432px]:mt-2 '>
      {!isLoading ? (
        <>
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
              <label className='font-semibold text-lg'>Horas semanais</label>
              <InputSignIn
                type="number"
                name="weeklyHours"
                placeholder="Digite o número de horas semanais da vaga"
                icon={VscOrganization}
                setValue={setWeeklyHours}
                value={weeklyHours}
                />
            </div>
            <div>
              <label className='font-semibold text-lg'>Data de Inicio:</label>
              <InputDate
              Icon={MdDateRange}
              setDate={setStartDate}
              />
              { alertStartDate ? (
                  <p className='text-red-500 text-sm'>
                  A data de inicio não pode ser anterior á data atual
                  </p>
              ) : null}
            </div>
            <div>
              <label className='font-semibold text-lg'>Data de conclusão</label>
              <InputDate
              Icon={MdDateRange}
              setDate={setEndDate}
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
            <button onClick={()=>router.push('/myOng')} className='w-full font-bold py-3 text-white bg-red-400 hover:bg-red-300 rounded-lg'>
              Cancelar
            </button>
          </form>
        </div>
        </>
      ):(
        <LoadingHome/>
      )}
    </main>
  )
}
