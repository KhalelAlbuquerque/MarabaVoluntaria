'use client'

import { useState } from "react"


export default function Teste(){

    const [image, setImage] = useState("")

    function convertToBase64(e){
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImage(reader.result)
            console.log(reader.result)
        }
        reader.onerror = (error=>{
            console.log(error)
        })
    }

    return(
        <div className="w-full h-screen bg-red-200 flex items-center justify-center">
            <div className="w-[60%] h-96 bg-white m-auto flex flex-col gap-6 items-center justify-center">
                <p>Vamos upload imagem!</p>
                <div>
                    <input type="file" accept="image/*" onChange={convertToBase64}/>
                    {image == '' || image==null ? '' : <img src={image} alt="2" width={100} height={100} />}
                </div>
            </div>
        </div>
    )

}