import { HeroSection } from '@/components/home/HeroSection'
import { SocialProof } from '@/components/home/SocialProof'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedTemplates } from '@/components/home/FeaturedTemplates'
import { PricingSection } from '@/components/home/PricingSection'
import { PlannerTeaser } from '@/components/home/PlannerTeaser'
import { Testimonials } from '@/components/home/Testimonials'
import { CityLinks } from '@/components/home/CityLinks'
import { CTABanner } from '@/components/home/CTABanner'
import { HomeSEOContent } from '@/components/home/HomeSEOContent'

export const metadata = {
  title: "Animated Digital Wedding Card \u20b9499 | WedVibe",
  description:
    'Send animated digital wedding invitations via WhatsApp instantly. Starting \u20b9499 only. Beautiful shaadi cards loved by 1000s of Indian couples. Order now!',
  alternates: {
    canonical: 'https://wedvibe.in',
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Animated Digital Wedding Invitation',
  description:
    'Beautiful animated digital wedding invitations for Indian couples. WhatsApp-ready, fully customisable, delivered within minutes.',
  brand: { '@type': 'Brand', name: 'WedVibe' },
  image: 'https://wedvibe.in/og-image.jpg',
  url: 'https://wedvibe.in',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '499',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'WedVibe' },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a digital wedding invitation cost at WedVibe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WedVibe digital wedding invitations start at just \u20b9499. This includes a fully animated design, personalisation with your wedding details, and a WhatsApp-ready file you can share instantly.',
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
        text: 'Most WedVibe digital wedding invitations are ready within a few minutes of placing your order. For custom designs, delivery may take up to 24 hours.',
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
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WedVibe',
  description:
    "India's leading animated digital wedding invitation platform. WhatsApp-ready shaadi cards starting at \u20b9499.",
  url: 'https://wedvibe.in',
  telephone: '+91-8200736691',
  email: 'support@wedvibe.in',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  areaServed: [
    'Delhi', 'Mumbai', 'Ahmedabad', 'Jaipur', 'Surat',
    'Chennai', 'Pune', 'Kolkata', 'Hyderabad', 'India',
  ],
  priceRange: '\u20b9499',
  openingHours: 'Mo-Su 09:00-21:00',
  sameAs: ['https://www.instagram.com/wedvibe.in_/'],
  logo: 'https://wedvibe.in/logo.png',
  image: 'https://wedvibe.in/og-image.jpg',
}

export default function Home() {
  return (
    <>
      {/* Homepage-specific JSON-LD schema blocks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <FeaturedTemplates />
        <PricingSection />
        <PlannerTeaser />
        <Testimonials />
        <CityLinks />
        <CTABanner />
        <HomeSEOContent />
      </div>
    </>
  )
}
