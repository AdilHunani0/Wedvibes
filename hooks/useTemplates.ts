'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Template, TemplateCategory, TemplateTier } from '@/lib/types'

interface UseTemplatesOptions {
  category?: TemplateCategory
  tier?: TemplateTier
  limit?: number
  initialTemplates?: Template[]
}

export function useTemplates(options: UseTemplatesOptions = {}) {
  const [templates, setTemplates] = useState<Template[]>(options.initialTemplates || [])
  const [loading, setLoading] = useState(!options.initialTemplates || options.initialTemplates.length === 0)
  const [error, setError] = useState<string | null>(null)

  const fetchTemplates = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (options.category) query = query.eq('category', options.category)
      if (options.tier) query = query.eq('tier', options.tier)
      if (options.limit) query = query.limit(options.limit)

      const { data, error } = await query
      if (error) {
        setError(error.message)
      } else {
        setTemplates(data || [])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates')
    } finally {
      setLoading(false)
    }
  }, [options.category, options.tier, options.limit])

  useEffect(() => {
    // If initialTemplates provided and no filters changed, don't refetch on mount
    if (options.initialTemplates && options.initialTemplates.length > 0 && !options.category && !options.tier && !options.limit) {
      return
    }
    fetchTemplates()
  }, [fetchTemplates, options.category, options.tier, options.limit, options.initialTemplates])

  return { templates, loading, error, refetch: fetchTemplates }
}
