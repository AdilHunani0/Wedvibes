'use client'

import { useState } from 'react'
import { FilterBar } from './FilterBar'
import { TemplateCard } from './TemplateCard'
import { useTemplates } from '@/hooks/useTemplates'
import { TemplateCardSkeleton } from '@/components/ui/Skeleton'
import type { TemplateCategory, TemplateTier } from '@/lib/types'

export function TemplateGrid() {
  const [category, setCategory] = useState<string>('all')

  const { templates, loading, error } = useTemplates({
    category: category !== 'all' ? (category as TemplateCategory) : undefined,
  })

  return (
    <div className="space-y-8">
      <FilterBar
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center font-medium">
          Failed to load templates: {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <TemplateCardSkeleton key={i} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-16 bg-[#fdf8f4] border border-[#e8c97e]/30 rounded-2xl">
          <p className="text-4xl mb-4">💌</p>
          <h3 className="font-playfair text-xl text-[#2a1810] mb-2 font-semibold">No Templates Found</h3>
          <p className="text-sm text-[#6b3d2a]">
            Try adjusting your filters to find the perfect animated invitation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}
