import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { TemplateTier } from '@/lib/types'
import { MiniCardPreview } from '@/components/templates/MiniCardPreview'

const FEATURED = [
  { slug: 'rose-bloom-wedding', name: 'Rose Bloom', category: 'Wedding', tier: 'premium' as TemplateTier, price: 0, emoji: '🌹', bg: 'from-rose-100 to-pink-50' },
  { slug: 'royal-dark-wedding', name: 'Royal Dark', category: 'Wedding', tier: 'premium' as TemplateTier, price: 49900, emoji: '👑', bg: 'from-amber-900 to-stone-900' },
  { slug: 'destination-beach-wedding', name: 'Destination Beach', category: 'Wedding', tier: 'premium' as TemplateTier, price: 49900, emoji: '🌊', bg: 'from-teal-700 to-cyan-900' },
  { slug: 'emerald-nikkah-wedding', name: 'Emerald Nikkah', category: 'Wedding', tier: 'premium' as TemplateTier, price: 49900, emoji: '🌙', bg: 'from-emerald-900 to-teal-900' },
  { slug: 'classic-maroon-wedding', name: 'Classic Maroon', category: 'Wedding', tier: 'premium' as TemplateTier, price: 49900, emoji: '🪔', bg: 'from-rose-900 to-red-950' },
  { slug: 'vintage-story-book-wedding', name: 'Vintage Story Book', category: 'Wedding', tier: 'premium' as TemplateTier, price: 49900, emoji: '📖', bg: 'from-amber-100 to-stone-200' },
  { slug: 'our-wedding-story', name: 'Our Wedding Story', category: 'Wedding', tier: 'premium' as TemplateTier, price: 49900, emoji: '🎞️', bg: 'from-slate-900 to-[#0d1526]' },
]

export function FeaturedTemplates() {
  return (
    <section className="py-20 md:py-32 bg-[#FCF9F6] relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-12 md:mb-16 gap-6 text-center sm:text-left">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Handcrafted templates</p>
            <h2 className="font-playfair text-4xl sm:text-5xl text-foreground tracking-wide">Featured Designs</h2>
          </div>
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-medium text-maroon hover:text-gold transition-colors pb-2 border-b border-transparent hover:border-gold">
            View all collection <span>→</span>
          </Link>
        </div>

        {/* 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {FEATURED.map((t) => (
            <div key={t.slug} className="group bg-white rounded-3xl overflow-hidden border border-gold/10 shadow-sm hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 flex flex-col">
              {/* Preview */}
              <Link
                href={`/templates/${t.slug}`}
                className="relative block"
              >
                <MiniCardPreview
                  htmlFilePath={`/templates/${t.slug}.html`}
                  templateName={t.name}
                  category={t.category.toLowerCase()}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/20 transition-all duration-500 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-sm pointer-events-none z-10">
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-white text-maroon text-sm font-semibold px-8 py-3.5 rounded-full shadow-xl"
                  >
                    Preview Card
                  </span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <Badge tier={t.tier} className="shadow-sm backdrop-blur-md bg-white/90 border-gold/30 text-xs px-3 py-1 font-medium text-foreground uppercase tracking-wider">{t.tier}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-brown-muted font-medium shadow-sm border border-white/50">
                    {t.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-playfair text-xl md:text-2xl text-foreground font-medium pr-4">{t.name}</h3>
                  <p className="font-semibold text-gold mt-1 text-sm md:text-base whitespace-nowrap">{formatPrice(t.price)}</p>
                </div>
                <Link
                  href={`/customize/${t.slug}`}
                  id={`customise-${t.slug}`}
                  className="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-transparent via-gold/10 to-transparent border border-gold/30 text-maroon text-sm font-semibold tracking-wide hover:bg-maroon hover:text-gold-light hover:border-maroon transition-all duration-300"
                >
                  Personalise ✦
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-medium text-maroon hover:text-gold transition-colors pb-1 border-b border-maroon">
            View all templates <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
