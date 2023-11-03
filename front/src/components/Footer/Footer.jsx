import React from 'react';
import { BiLogoTiktok,BiLogoFacebook,BiLogoInstagram,BiLogoTwitter,BiLogoYoutube } from 'react-icons/bi';

export default function Footer(){
    return(
        <footer className='flex flex-col items-center justify-center py-2 bg-sky-300 gap-1'>
            <div className='flex items-center justify-center gap-2 animate-slide-in'>
                <a href='https://tiktok.com'><BiLogoTiktok className='text-2xl hover:text-white transition-colors duration-500 hover:scale-125 hover:transition-transform hover:duration-300' /></a>
                <a href='https://facebook.com'><BiLogoFacebook className='text-2xl hover:text-blue-500 transition-colors duration-500 hover:scale-125 hover:transition-transform hover:duration-300' /></a>
                <a href='https://instagram.com'><BiLogoInstagram className='text-2xl hover:text-white transition-colors duration-500 hover:scale-125 hover:transition-transform hover:duration-300' /></a>
                <a href='https://twitter.com'><BiLogoTwitter className='text-2xl hover:text-sky-700 transition-colors duration-500 hover:scale-125 hover:transition-transform hover:duration-300' /></a>
                <a href='https://youtube.com'><BiLogoYoutube className='text-2xl hover:text-red-500 transition-colors duration-500 hover:scale-125 hover:transition-transform hover:duration-300' /></a>
            </div>
            <div className='text-center'>
                Todos os Direitos Reservados ©️ marabavoluntaria.com 2023
            </div>
        </footer>
    )
}
