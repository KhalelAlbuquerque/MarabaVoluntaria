import loading from './loading.gif'
import Image from 'next/image'

export default function Loading(){

    return(
        <div className='w-full h-full absolute top-0 left-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <Image src={loading}/>
        </div>
    )

}