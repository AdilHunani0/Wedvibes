import { TemplateGrid } from '@/components/templates/TemplateGrid'
import { createAdminClient } from '@/lib/supabase/server'
import type { Template } from '@/lib/types'

export const metadata = {
  title: 'Animated Wedding Card Templates India | WedVibe',
  description:
    'Browse 50+ animated digital wedding card templates. WhatsApp-ready designs for every style — Hindu, Muslim, Christian & more. Starting \u20b9499. Preview free!',
  alternates: { canonical: 'https://wedvibe.in/templates' },
}

export const revalidate = 60

export default async function TemplatesPage() {
  const supabase = createAdminClient()
  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-bold text-[#a0522d] bg-[#fdf8f4] border border-[#e8c97e]/40 px-3 py-1 rounded-full">
          Template Designs
        </span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#2a1810] mt-4 mb-3">
          Browse Animated Digital Wedding Card Templates — All Styles, All Budgets
        </h1>
        <p className="text-sm text-[#6b3d2a]">
          Find the perfect design for your celebration. Filter by categories (wedding, engagement, anniversary) and price tiers to get started.
        </p>
      </div>

      <TemplateGrid initialTemplates={(templates as Template[]) || []} />
    </div>
  )
}
