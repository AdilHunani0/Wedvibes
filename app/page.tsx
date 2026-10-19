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

export default function Home() {
  return (
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
  )
}
