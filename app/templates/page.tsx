import { TemplateGrid } from '@/components/templates/TemplateGrid'

export const metadata = {
  title: 'Templates Gallery | WedVibe',
  description: 'Browse our collection of premium, standard, and basic animated invitation cards.',
}

export default function TemplatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-bold text-[#a0522d] bg-[#fdf8f4] border border-[#e8c97e]/40 px-3 py-1 rounded-full">
          Template Designs
        </span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#2a1810] mt-4 mb-3">
          Select Your Invitation Style
        </h1>
        <p className="text-sm text-[#6b3d2a]">
          Find the perfect design for your celebration. Filter by categories (wedding, engagement, anniversary) and price tiers to get started.
        </p>
      </div>

      <TemplateGrid />
    </div>
  )
}
