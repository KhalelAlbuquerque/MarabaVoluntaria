import './globals.css'
import { Inter } from 'next/font/google'
import ToastContainer from "@/components/Notifier/ToastContainer"
import { PrimeReactProvider } from 'primereact/api';
import  Providers  from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Marabá Voluntária',
  description: 'Seu site de voluntariado!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body suppressHydrationWarning={true} className={inter.className}>
          <Providers>
            <ToastContainer/>
            {/* <PrimeReactProvider> */}
              <main>
                {children}
              </main>
            {/* </PrimeReactProvider> */}
          </Providers>
        </body>
    </html>
  )
}
