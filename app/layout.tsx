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
  metadataBase: new URL('https://wedvibe.in'),
  title: {
    default: 'WedVibe — Premium Animated Wedding Invitations',
    template: '%s | WedVibe'
  },
  description: 'India\'s most stunning digital animated wedding cards. Select from elegant templates, customise instantly, and share on WhatsApp. Free trial available.',
  keywords: [
    'digital wedding invitation',
    'animated wedding card india',
    'whatsapp wedding invitation',
    'online wedding card',
    'digital invitation card india',
    'animated invitation india',
    'wedding card whatsapp share',
    'digital shaadi card',
    'premium wedding e-card'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://wedvibe.in',
    siteName: 'WedVibe',
    images: [{ url: '/engagement-hero.png', width: 1200, height: 630 }],
  },
  verification: {
    google: 'Z_sTPil6SjDVIP7NWKF0-BGeyVukNqMdj1ugPJxsm-E',
  },
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

