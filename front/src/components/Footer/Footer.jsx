import React from 'react';
import { BiLogoTiktok,BiLogoFacebook,BiLogoInstagram,BiLogoTwitter,BiLogoYoutube } from 'react-icons/bi';
import Link from 'next/link';

export default function Footer(){
    return(
        <footer className='flex flex-col items-center justify-center py-4 bg-sky-300 gap-2'>
            <div className='flex items-center justify-center gap-2 animate-slide-in'>
                <a href='https://tiktok.com'><BiLogoTiktok className='text-3xl hover:text-white transition-colors duration-500' /></a>
                <a href='https://facebook.com'><BiLogoFacebook className='text-3xl hover:text-blue-500 transition-colors duration-500' /></a>
                <a href='https://instagram.com'><BiLogoInstagram className='text-3xl hover:text-white transition-colors duration-500' /></a>
                <a href='https://twitter.com'><BiLogoTwitter className='text-3xl hover:text-sky-700 transition-colors duration-500' /></a>
                <a href='https://youtube.com'><BiLogoYoutube className='text-3xl hover:text-red-500 transition-colors duration-500' /></a>
            </div>
            <div className='text-center'>
                Todos os Direitos Reservados ©️ FODASE.com 2023
            </div>
        </footer>
    )
}
