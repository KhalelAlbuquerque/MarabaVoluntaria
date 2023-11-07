import React from 'react'
import gifLoading from './Spin-1s-200px.gif'
import Image from 'next/image'

const LoadingHome = () => {
  return (
    <div className='flex justify-center mt-20'>
        <Image
        src={gifLoading}
        width={200}
        height={200}
        alt='gif loading'
        />
    </div>
  )
}

export default LoadingHome
