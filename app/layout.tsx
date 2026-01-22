import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Lenis from '@/app/components/Lenis' 
import Navbar from './components/navbar/Navbar'
import { Toaster } from 'react-hot-toast' // Import Toaster

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Store - Premium Timepieces',
  description: 'E-commerce for luxury watches with dynamic experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Toast notifications strictly outside Lenis to avoid scroll issues */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        
        <Navbar />
        <Lenis>
          <main>
            {children}
          </main>
        </Lenis>
      </body>
    </html>
  )
}