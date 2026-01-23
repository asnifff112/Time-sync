import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Lenis from '@/app/components/Lenis' 
import Navbar from './components/navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/app/context/authcontext' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Store - Premium Timepieces',
  description: 'E-commerce for luxury watches with dynamic experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* 1. AuthProvider: ഇത് ആപ്പിന് ചുറ്റും ഒരു സുരക്ഷാ കവചം പോലെ നിൽക്കുന്നു */}
        <AuthProvider>
          
          {/* 2. Notifications */}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0F172A',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)'
              },
            }}
          />
          
          {/* 3. Navbar: AuthProvider-ന് ഉള്ളിലായത് കൊണ്ട് user സ്റ്റേറ്റ് ഇവിടെ ലഭിക്കും */}
          <Navbar />
          
          {/* 4. Smooth Scrolling & Content */}
          <Lenis>
            <main className="min-h-screen">
              {children}
            </main>
          </Lenis>
          
        </AuthProvider>
      </body>
    </html>
  )
}