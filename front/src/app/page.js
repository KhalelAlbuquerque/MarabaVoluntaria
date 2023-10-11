import Image from 'next/image'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'
import CardVaga from '@/components/Card/CardVaga.jsx'

export default function Home() {
  return (
    <div className='flex flex-col'>
      <header>
        <Header/>
      </header>
      <main className='px-20 pt-10 pb-32'>
        <div className='flex justify-start gap-6 flex-wrap'>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
          <CardVaga descricao="asasdasdasdasdadsa"/>
        </div>
      </main>
      <footer className='fixed bottom-0 w-full'>
       <Footer/>
      </footer>
    </div>
  )
}
