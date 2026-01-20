import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Lenis from '@/app/components/Lenis' // Smooth scroll like Lando
import Navbar from './components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Store - Premium Timepieces',
  description: 'E-commerce for luxury watches with dynamic experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Lenis>
          {children}
        </Lenis>
      </body>
    </html>
  )
}
