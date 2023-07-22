import { Nunito } from 'next/font/google'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import { Providers } from '@/redux/provider'
import LoginModal from '@/components/modals/authModal/LoginModal'
import RegisterModal from '@/components/modals/authModal/RegisterModal'
import ToasterProvider from '@/providers/ToastProvider'
import NewListing from '@/components/modals/listModal/NewListing'
import SearchModal from '@/components/modals/listModal/SearchModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <NewListing />
          <RegisterModal />
          <Navbar />
          {children}
          
        </Providers>
        </body>
    </html>
  )
}
