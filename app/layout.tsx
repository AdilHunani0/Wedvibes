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
    default: 'Animated Digital Wedding Card ₹499 | WedVibe',
    template: '%s | WedVibe'
  },
  description: 'Send animated digital wedding invitations via WhatsApp instantly. Starting ₹499 only. Beautiful shaadi cards loved by 1000s of Indian couples. Order now!',
  keywords: [
    'digital wedding invitation',
    'animated wedding card india',
    'whatsapp wedding invitation',
    'online wedding card india',
    'digital invitation card india',
    'animated shaadi invitation',
    'wedding card whatsapp share',
    'digital shaadi card',
    'online wedding card maker india',
    'wedding card online india'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://wedvibe.in',
    siteName: 'WedVibe',
    title: 'Animated Digital Wedding Card ₹499 | WedVibe',
    description: 'Send animated digital wedding invitations via WhatsApp instantly. Starting ₹499. Beautiful shaadi cards for Indian couples.',
    images: [{ url: '/engagement-hero.png', width: 1200, height: 630, alt: 'WedVibe animated digital wedding invitation card' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animated Digital Wedding Card ₹499 | WedVibe',
    description: 'Send animated digital wedding invitations via WhatsApp instantly. Starting ₹499.',
    images: ['/engagement-hero.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'WedVibe',
      url: 'https://wedvibe.in',
      logo: 'https://wedvibe.in/logo.png',
      description: "India's leading animated digital wedding invitation platform.",
      sameAs: [
        'https://www.instagram.com/wedvibe.in_/',
        'https://facebook.com/wedvibe.in'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Animated Digital Wedding Invitation',
      description: 'Beautiful animated digital wedding invitations for Indian couples. WhatsApp-ready, fully customisable, delivered within minutes.',
      brand: { '@type': 'Brand', name: 'WedVibe' },
      image: 'https://wedvibe.in/engagement-hero.png',
      url: 'https://wedvibe.in',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: '499',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'WedVibe' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'WedVibe',
      description: "India's leading animated digital wedding invitation platform. WhatsApp-ready shaadi cards starting at ₹499.",
      url: 'https://wedvibe.in',
      telephone: '+91-8200736691',
      email: 'support@wedvibe.in',
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      areaServed: ['Delhi', 'Mumbai', 'Ahmedabad', 'Jaipur', 'Surat', 'Chennai', 'Pune', 'Kolkata', 'Hyderabad', 'India'],
      priceRange: '₹499',
      openingHours: 'Mo-Su 09:00-21:00',
      logo: 'https://wedvibe.in/logo.png',
      image: 'https://wedvibe.in/engagement-hero.png',
      sameAs: ['https://www.instagram.com/wedvibe.in_/'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does a digital wedding invitation cost at WedVibe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WedVibe digital wedding invitations start at just ₹499. This includes a fully animated design, personalisation with your wedding details, and a WhatsApp-ready file you can share instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I share my digital wedding card on WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Once your WedVibe card is ready, you receive a shareable file or link. Simply open WhatsApp, select your contacts or broadcast list, and share directly. No app downloads required for your guests.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to receive my animated wedding card?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most WedVibe digital wedding invitations are ready within minutes of placing your order. For custom designs, delivery may take up to 24 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customise the animated wedding card with my own details?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Every WedVibe invitation is fully personalised with your names, wedding date, venue, and all pre-wedding event details including mehendi, haldi, and sangeet.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is a digital wedding invitation better than a printed one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Digital wedding invitations are faster, cheaper, and eco-friendly. They can be shared with hundreds of guests instantly on WhatsApp without printing or courier costs, and guests can revisit them anytime on their phone.',
          },
        },
      ],
    },
  ]

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffaf5] text-[#2a1810]">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  )
}

