'use client'
import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

export default function SideBar(){

    const [toggleSide, setToggleSide] = React.useState(false)

    return(
        <div className='flex justify-center items-center'>
            {toggleSide ? 
                <div className="fixed flex flex-col w-1/2 max-w-screen bg-gray-500 h-screen top-0 left-0 p-4">
                    <div className="flex justify-end">
                        <button onClick={() => setToggleSide(false)} className="text-black text-xl font-bold py-2 px-4">
                            X
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <a>Home</a>
                        <a>Sou uma ONG</a>
                        <a>Login</a>
                        <a>Ajuda</a>
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
