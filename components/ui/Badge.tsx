import type { TemplateTier } from '@/lib/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'rose' | 'green' | 'blue' | 'gray' | 'tier'
  tier?: TemplateTier
  className?: string
}

const variants: Record<string, string> = {
  gold: 'bg-[#e8c97e]/20 text-[#8B6914] border border-[#c9a96e]/30',
  rose: 'bg-rose-100 text-rose-700 border border-rose-200',
  green: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200',
  gray: 'bg-gray-100 text-gray-600 border border-gray-200',
}

const tierVariants: Record<TemplateTier, string> = {
  basic: 'bg-gray-100 text-gray-600 border border-gray-200',
  standard: 'bg-[#e8c97e]/20 text-[#8B6914] border border-[#c9a96e]/30',
  premium: 'bg-[#2a1810] text-[#e8c97e] border border-[#c9a96e]/30',
}

export function Badge({ children, variant = 'gold', tier, className = '' }: BadgeProps) {
  const cls = tier ? tierVariants[tier] : variants[variant]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${cls} ${className}`}>
      {children}
    </span>
  )
}
