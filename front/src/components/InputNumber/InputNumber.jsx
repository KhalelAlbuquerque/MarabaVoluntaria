import React from 'react'
import { InputMask } from 'primereact/inputmask';

const InputNumber = ({Icon,setNumber,}) => {
  return (
    <div className="flex gap-4 bg-white border-2 border-gray-500 items-center rounded-lg px-3 pl-6 py-3 max-[337px]:mx-auto min-[1490px]:w-[600px] sm:w-[300px] lg:mx-auto lg:w-[410px] max-[337px]:w-[250px]">
        <Icon className="flex text-[24px] text-primaryLight-500" />
        <InputMask className='outline-none w-full' onChange={({target}) => setNumber(target.value)} id='phone' placeholder='(99) 99999-9999' mask='(99) 99999-9999'/>
      </div>
  )
}

export default InputNumber
