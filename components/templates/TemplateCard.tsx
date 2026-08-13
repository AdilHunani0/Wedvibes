'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { Template } from '@/lib/types'

const EMOJI_MAP: Record<string, string> = {
  'rose-bloom-wedding': '🌹',
  'royal-dark-wedding': '👑',
  'destination-beach-wedding': '🌊',
  'vintage-story-book-wedding': '📖',
  'emerald-nikkah-wedding': '🌙',
  'classic-maroon-wedding': '🍷',
  'our-wedding-story': '🎞️',
  'engagement-navy-story': '💍',
}

const BG_MAP: Record<string, string> = {
  'rose-bloom-wedding': 'from-rose-100 to-pink-50',
  'royal-dark-wedding': 'from-amber-900 to-stone-900',
  'destination-beach-wedding': 'from-teal-700 to-cyan-900',
  'vintage-story-book-wedding': 'from-amber-100 to-stone-200',
  'emerald-nikkah-wedding': 'from-emerald-900 to-teal-900',
  'classic-maroon-wedding': 'from-red-950 to-rose-950',
  'our-wedding-story': 'from-slate-900 to-[#0d1526]',
  'engagement-navy-story': 'from-[#0d1526] to-[#16233d]',
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const emoji = EMOJI_MAP[template.slug] || '💌'
  const bg = BG_MAP[template.slug] || 'from-[#f7efe8] to-[#fdf8f4]'

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#e8c97e]/30 hover:border-[#c9a96e] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Preview */}
      <Link 
        href={`/templates/${template.slug}`}
        className={`relative block h-56 bg-gradient-to-br ${bg} flex items-center justify-center overflow-hidden`}
      >
        {template.preview_image_url ? (
          <Image
            src={template.preview_image_url}
            alt={template.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-500 select-none">
            {emoji}
          </span>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#2a1810] text-sm font-medium px-5 py-2.5 rounded-full shadow-lg"
          >
            Preview card
          </span>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <Badge tier={template.tier}>
            {template.tier.charAt(0).toUpperCase() + template.tier.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#6b3d2a] font-medium capitalize">
            {template.category}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-playfair text-lg text-[#2a1810] leading-tight">{template.name}</h3>
          <span className="font-bold text-[#a0522d] text-lg shrink-0 ml-2">{formatPrice(template.price)}</span>
        </div>

        {template.features.length > 0 && (
          <ul className="mb-4 space-y-1 flex-1">
            {template.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#6b3d2a]">
                <span className="text-[#c9a96e]">✓</span> {f}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/customize/${template.slug}`}
          id={`card-customise-${template.slug}`}
          className="mt-auto block text-center py-2.5 rounded-xl bg-[#2a1810] text-[#e8c97e] text-sm font-medium hover:bg-[#3d2218] transition-colors"
        >
          Customise ✦
        </Link>
      </div>
    </div>
  )
}
