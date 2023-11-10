import Header from '@/components/Header/Header'
import SideBarUser from '@/components/SidebarUser/SideBarUser'

export const metadata = {
  title: 'Seu perfil',
  description: 'Generated by create next app',
}

export default function UserLayout({ children }) {
  return (
    <div className='flex max-[390px]:flex-col'>
        <div className='max-[390px]:hidden flex'>
          <SideBarUser/>
        </div>
        <div className='max-[390px]:flex hidden'>
          <Header/>
        </div>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}