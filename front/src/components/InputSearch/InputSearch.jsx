'use client'
import React, { useState } from 'react'

import { FcSearch } from 'react-icons/fc'

const InputSearch = ({setChange, className}) => {

  return (
    <div className={`${className}`}>
        <div className='border-2 border-black bg-white rounded-lg px-3 py-2.5 w-[400px] max-[650px]:w-[300px] max-[500px]:w-[250px] flex items-center gap-3'>
            <FcSearch className='text-2xl'/>
            <input className='outline-none' placeholder='Pesquisar...' type='text' onChange={({target}) => setChange(target.value)} />
        </div>
    </div>
  )
}

export default InputSearch
