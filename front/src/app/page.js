import Image from 'next/image'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

export default function Home() {
  return (
    <div className='flex flex-col gap-16'>
      <header>
        <Header/>
      </header>
      <footer className='fixed bottom-0 w-full'>
       <Footer/>
      </footer>
    </div>
  )
}
