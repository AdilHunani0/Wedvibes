import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { MainLayoutWrapper } from '@/components/layout/MainLayoutWrapper'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WedVibe — Premium Animated Wedding Invitations',
  description: 'India\'s most stunning digital animated wedding cards. Select from elegant templates, customise instantly, and share on WhatsApp.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[#fffaf5] text-[#2a1810]">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  )
}

