import { HeroSection } from '@/components/home/HeroSection'
import { SocialProof } from '@/components/home/SocialProof'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedTemplates } from '@/components/home/FeaturedTemplates'
import { PricingSection } from '@/components/home/PricingSection'
import { PlannerTeaser } from '@/components/home/PlannerTeaser'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

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

