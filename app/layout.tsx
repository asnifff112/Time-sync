import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' 
import Navbar from './components/navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/app/context/authcontext' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Time Sync - Premium Timepieces',
  description: 'E-commerce for luxury watches with dynamic experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
       
        <AuthProvider>
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
          
          <Navbar />
          
          {/* 4. Smooth Scrolling & Content */}
          
            <main className="min-h-screen">
              {children}
            </main>
        
          
        </AuthProvider>
      </body>
    </html>
  )
}