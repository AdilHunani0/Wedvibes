'use client'

import type { TemplateCategory } from '@/lib/types'

const CATEGORIES: { value: TemplateCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Designs' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'birthday', label: 'Birthday' },
]

interface FilterBarProps {
  selectedCategory: string
  onCategoryChange: (v: string) => void
}

export function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => onCategoryChange(c.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === c.value
                ? 'bg-[#2a1810] text-[#e8c97e] shadow-md'
                : 'bg-white border border-[#e8c97e]/50 text-[#6b3d2a] hover:border-[#c9a96e] hover:text-[#2a1810]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
