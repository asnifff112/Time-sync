import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Lenis from '@/app/components/Lenis' 
import Navbar from './components/navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/app/context/authcontext' // AuthProvider ഇമ്പോർട്ട് ചെയ്യുക

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Store - Premium Timepieces',
  description: 'E-commerce for luxury watches with dynamic experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthProvider എല്ലാത്തിനും മുകളിൽ വരണം */}
        <AuthProvider>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          
          {/* Navbar ഇപ്പോൾ AuthProvider-ന് ഉള്ളിലാണ്, അതുകൊണ്ട് എറർ മാറിക്കൊള്ളും */}
          <Navbar />
          
          <Lenis>
            <main>
              {children}
            </main>
          </Lenis>
        </AuthProvider>
      </body>
    </html>
  )
}