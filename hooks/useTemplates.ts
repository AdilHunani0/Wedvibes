'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Template, TemplateCategory, TemplateTier } from '@/lib/types'

interface UseTemplatesOptions {
  category?: TemplateCategory
  tier?: TemplateTier
  limit?: number
}

export function useTemplates(options: UseTemplatesOptions = {}) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTemplates = useCallback(async () => {
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
    setLoading(false)
  }, [options.category, options.tier, options.limit])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      setError(null)
      fetchTemplates()
    }, 0)
    return () => clearTimeout(timer)
  }, [fetchTemplates])

  return { templates, loading, error, refetch: fetchTemplates }
}
