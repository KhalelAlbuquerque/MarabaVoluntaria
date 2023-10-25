import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';

export default function LayoutMain({children}){
    return (
        <div className='flex flex-col min-h-screen'>
            <div>
                <Header/>
            </div> 
            <div>
                {children}
            </div>
            <div className='mt-auto w-full'>
                <Footer/>
            </div>
        </div>
    )
}