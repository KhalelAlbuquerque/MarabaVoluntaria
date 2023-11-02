import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';

export default function LayoutMain({children}){
    return (
        <div className='flex flex-col'>
            <div>
                <Header/>
            </div> 
            <div>
                {children}
            </div>
            <div className='fixed w-full bottom-0'>
                <Footer/>
            </div>
        </div>
    )
}