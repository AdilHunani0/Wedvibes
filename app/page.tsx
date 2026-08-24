import { HeroSection } from '@/components/home/HeroSection'
import { SocialProof } from '@/components/home/SocialProof'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedTemplates } from '@/components/home/FeaturedTemplates'
import { PricingSection } from '@/components/home/PricingSection'
import { PlannerTeaser } from '@/components/home/PlannerTeaser'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

export const metadata = {
  title: 'WedVibe — Premium Animated Digital Wedding Invitations India',
  description: 'Stunning animated wedding invitations. Start for free or upgrade to Premium for just ₹499. Share on WhatsApp instantly. No app needed.',
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
      <CTABanner />
    </div>
  )
}

