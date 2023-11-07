import Image from 'next/image'
import { BsWhatsapp } from 'react-icons/bs'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { BiLogoLinkedin } from 'react-icons/bi'
import { BsYoutube } from 'react-icons/bs'

export default function Ajuda(){
    return(
        <main>
            <div className='w-4/5 mx-auto'>
                <div className='flex gap-1 justify-center text-lg mt-12'>
                    <div className='text-center text-2xl'>
                        <h2>O Atados tem o objetivo de <strong className='text-blue-300'>mobilizar pessoas e gerar transformações positivas na sociedade,</strong> através das seguintes frentes:</h2>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center gap-8 mt-12 h-52'>
                    <div>
                        <Image src='https://atados.com.br/static/icons/frame1.svg'
                        width={150}
                        height={100}
                        className='flex justify-center w-full'
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div>
                        <Image src='https://atados.com.br/static/icons/frame2.svg'
                        width={150}
                        height={100}
                        className='flex justify-center w-full'
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div>
                        <Image src='https://atados.com.br/static/icons/frame3.svg'
                        width={150}
                        height={100}
                        className='flex justify-center w-full'
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div>
                        <Image src='https://atados.com.br/static/icons/frame4.svg'
                        width={150}
                        height={100}
                        className='flex justify-center w-full'
                        alt='Foto page ajuda'
                        />
                    </div>
                </div>
                <div className='w-full h-28 flex justify-between items-center gap-4'>
                    <div>
                        <p className='uppercase text-center'>
                            nossa plataforma digital gratuita
                        </p>
                    </div>
                    <div>
                        <p className='uppercase text-center'>
                            projetos que fazemos com empresas
                        </p>
                    </div>
                    <div>
                        <p className='uppercase text-center'>
                            projetos que fazemos com empresas
                        </p>
                    </div>
                    <div>
                        <p className='uppercase text-center'>
                            projetos que fazemos com empresas
                        </p>
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex text-orange-500 w-72 gap-2 mt-12'>
                        <p className='text-5xl font-bold'>1.</p>
                        <p className='uppercase'>nós despertamos para a atuação social</p>
                    </div>
                    <div className='mx-8'>
                        <Image
                        src={"https://atados.com.br/static/icons/arrow-up-right.svg"}
                        width={100}
                        height={100}
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div className='flex text-orange-500 w-60 gap-2 mt-12'>
                        <p className='text-5xl font-bold'>2.</p>
                        <p className='uppercase'>conectamos com oportunidades</p>
                    </div>
                    <div className='pt-16 mr-8 '>
                        <Image
                        src={"https://atados.com.br/static/icons/arrow-down-right.svg"}
                        width={100}
                        height={100}
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div className='flex text-orange-500 w-72 gap-2 mt-12'>
                        <p className='text-5xl font-bold'>3.</p>
                        <p className='uppercase'>desenvolvemos projetos de impacto social</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-orange-500 text-5xl'>Fortalecemos a nossa rede</h1>
                    <p className='text-gray-500'>Não se trata só de uma plataforma, as equipes do Atados trabalham diariamente promovendo fortalecimento da nossa rede. Confira como:</p>
                </div>
                <div>
                    <ul className='text-gray-700 mt-5'>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Se conecte com outras organizações por meio de encontros organizados pelo Atados;
                        </li>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Receba conteúdos que selecionamos para fortalecer e apoiar sua instituição;
                        </li>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Tenha acesso à materiais que desenvolvemos para melhorar sua gestão de voluntariado;
                        </li>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Participe de eventos e capacitações oferecidas pelo atados e parceiros.
                        </li>
                    </ul>
                </div>
                <div className='w-full flex mb-16'>
                    <div className='w-1/2 mt-12 flex flex-col gap-4'>
                        <h1 className='text-3xl font-bold'>Adorei e quero ficar por dentro de tudo!</h1>
                        <p>Tá fácil! Abaixo você encontra todas nossas redes sociais e grupos de whatsapp. Além disso, com seu email cadastrado no site você já recebe notícias periodicamente!</p>
                        <p>Ou <a className='underline text-blue-500' href='#'>trabalhe conosco</a> , vem ser Atader!</p>
                        <div className='flex text-4xl gap-4'>
                            <div className='border-2 rounded-full p-3 border-purple-500 cursor-pointer'>
                                <AiOutlineInstagram className='text-purple-500'/>
                            </div>
                            <div className='border-2 rounded-full p-3 border-blue-800 cursor-pointer'>
                                <BiLogoFacebook className='text-blue-800'/>
                            </div>
                            <div className='border-2 rounded-full p-3 border-blue-600 cursor-pointer'>
                                <BiLogoLinkedin className='text-blue-600'/>
                            </div>
                            <div className='border-2 rounded-full p-3 border-green-500 cursor-pointer'>
                                <BsWhatsapp className='text-green-500'/>
                            </div>
                            <div className='border-2 rounded-full p-3 border-red-700 cursor-pointer'>
                                <BsYoutube className='text-red-700'/>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <Image
                        src={"https://atados.com.br/static/svg/05.svg"}
                        width={500}
                        height={500}
                        alt='Foto page ajuda'
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}