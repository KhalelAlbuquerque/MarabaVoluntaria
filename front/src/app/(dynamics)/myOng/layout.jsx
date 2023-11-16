import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';

export default function LayoutVaga({children}){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                {children}
            </div>
            <div className='fixed bottom-0 w-full'>
                <Footer/>
            </div>
        </div>
    )
}