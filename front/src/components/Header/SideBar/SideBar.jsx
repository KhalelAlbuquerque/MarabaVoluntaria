'use client'
import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

export default function SideBar(){

    const [toggleSide, setToggleSide] = React.useState(false)
    
    return(
        <div className='flex justify-center items-center'>
            {toggleSide ? 
                <div className="fixed flex flex-col w-1/2 max-w-screen bg-gray-500 h-screen top-0 left-0 p-4 animate-slide-in" style={{ boxShadow: '8px 0 6px rgba(0, 0, 0, 0.3)' }}>
                    <div className="flex justify-end">
                        <button onClick={() => setToggleSide(false)} className="text-black text-xl font-bold py-2 px-4">
                            X
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 items-center animate-slide-in">
                        <a className="text-sky-950 hover:text-sky-300 hover:underline cursor-pointer transition-colors duration-300">Home</a>
                        <a className="text-sky-950 hover:text-sky-300 hover:underline cursor-pointer transition-colors duration-300">Sou uma ONG</a>
                        <a className="text-sky-950 hover:text-sky-300 hover:underline cursor-pointer transition-colors duration-300">Login</a>
                        <a className="text-sky-950 hover:text-sky-300 hover:underline cursor-pointer transition-colors duration-300">Ajuda</a>
                    </div>
                </div> 
                : 
                <div onClick={() => setToggleSide(true)}>
                    <GiHamburgerMenu className='text-gray-500 text-3xl'/>
                </div>
            }
        </div>
    )
}
