import Image from 'next/image'
import { BsWhatsapp } from 'react-icons/bs'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { BiLogoLinkedin } from 'react-icons/bi'
import { BsYoutube } from 'react-icons/bs'

export default function Ajuda(){
    return(
        <main>
            <div className='lg:w-4/5 lg:mx-auto w-full px-10 max-[450px]:px-4 max-[418px]:px-2'>
                <div className='flex gap-1 justify-center text-lg mt-12'>
                    <div className='text-center text-2xl'>
                        <h2>A Marabá Voluntária tem o objetivo de <strong className='text-blue-300'>mobilizar pessoas e gerar transformações positivas na sociedade,</strong> através das seguintes frentes:</h2>
                    </div>
                </div>
                <div className='w-full flex justify-around md:justify-between items-end gap-8 mt-12'>
                    <div>
                        <Image src='https://atados.com.br/static/icons/frame1.svg'
                        width={150}
                        height={100}
                        className='flex justify-center w-full'
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div className='hidden md:flex'>
                        <Image src='https://atados.com.br/static/icons/frame2.svg'
                        width={150}
                        height={100}
                        className='flex justify-center w-full'
                        alt='Foto page ajuda'
                        />
                    </div>
                    <div className='hidden md:flex'>
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
                        className='flex justify-center w-full '
                        alt='Foto page ajuda'
                        />
                    </div>
                </div>
                <div className='w-full h-28 flex justify-around md:justify-between items-center gap-1 sm:gap-4 text-sm md:text-md'>
                    <div>
                        <p className='uppercase text-center'>
                            nossa plataforma digital gratuita
                        </p>
                    </div>
                    <div className='hidden md:flex'>
                        <p className='uppercase text-center'>
                            projetos que fazemos com empresas
                        </p>
                    </div>
                    <div className='hidden md:flex'>
                        <p className='uppercase text-center'>
                            nossos projetos sociais autorais
                        </p>
                    </div>
                    <div>
                        <p className='uppercase text-center'>
                            fortalecimento de rede
                        </p>
                    </div>
                </div>
                <div className='flex max-[415px]:px-5 sm:px-32 justify-between flex-col gap-3 lg:gap-0 mb-12 md:flex-row md:gap-8 md:px-0'>
                    <div className='flex pt-12 text-orange-500 w-full md:w-72 gap-2 md:mt-12'>
                        <p className='text-5xl font-bold'>1.</p>
                        <p className='uppercase'>nós despertamos para a atuação social</p>
                    </div>
                    <div className='flex pt-12 text-orange-500 w-full md:w-72 gap-2 md:mt-12 md'>
                        <p className='text-5xl font-bold'>2.</p>
                        <p className='uppercase'>conectamos com oportunidades</p>
                    </div>
                    <div className='flex pt-12 mt-0 text-orange-500 w-full md:w-72 gap-2 md:mt-12'>
                        <p className='text-5xl font-bold'>3.</p>
                        <p className='uppercase'>desenvolvemos projetos de impacto social</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-orange-500 text-5xl'>Fortalecemos a nossa rede</h1>
                    <p className='text-gray-500'>Não se trata só de uma plataforma, as equipes do Marabá Voluntaria trabalham diariamente promovendo fortalecimento da nossa rede. Confira como:</p>
                </div>
                <div>
                    <ul className='text-gray-700 mt-5'>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Se conecte com outras organizações.
                        </li>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Receba conteúdos que selecionamos para fortalecer e apoiar sua instituição.
                        </li>
                        <li className='flex items-center gap-4'>
                            <p className='bg-orange-500 rounded-full w-4 h-4'></p>
                            Participe de eventos e capacitações oferecidas pelo Marabá Voluntaria e parceiros.
                        </li>
                    </ul>
                </div>
                <div className='w-full flex items-center mb-32'>
                    <div className='md:mt-12 my-12 flex flex-col gap-4 w-full md:w-1/2'>
                        <h1 className='text-3xl font-bold'>Adorei e quero ficar por dentro de tudo!</h1>
                        <p>Tá fácil! Abaixo você encontra todas nossas redes sociais e grupos de whatsapp.</p>
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
                    <div className='w-1/2 hidden md:flex'>
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