'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { CreditTransaction } from '@/lib/types'

export function useCredits(userId?: string) {
  const [credits, setCredits] = useState<number>(0)
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    if (!userId) return
    setTimeout(() => setLoading(true), 0)
    const [profileRes, txRes] = await Promise.all([
      supabase.from('profiles').select('credits').eq('id', userId).single(),
      supabase.from('credit_transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50)
    ])
    if (profileRes.data) setCredits(profileRes.data.credits)
    if (txRes.data) setTransactions(txRes.data)
    setLoading(false)
  }, [userId])

  useEffect(() => {
    loadData()
  }, [loadData])

  return { credits, transactions, loading, refetch: loadData }
}
