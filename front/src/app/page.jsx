import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

import React from 'react'

import HomeGrid from '@/components/HomeGrid/HomeGrid.jsx'

export default function Home() {

  return (
    <div className='flex flex-col'>
      <header>
        <Header/>
      </header>
      <main className='px-20 pt-4 pb-32 flex flex-col max-[530px]:px-12 max-[390px]:px-6 max-[350px]:px-2'>
          <HomeGrid/>
      </main>
      <footer className='fixed bottom-0 w-full'>
       <Footer/>
      </footer>
    </div>
  )
}