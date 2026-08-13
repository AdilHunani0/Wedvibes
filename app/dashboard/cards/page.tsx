'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'
import { CardGrid } from '@/components/dashboard/CardGrid'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Order } from '@/lib/types'

export default function DashboardCards() {
  const { user } = useAuth()
  const [cards, setCards] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchCards = async () => {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*, template:templates(*), customization:customizations(*)')
          .eq('user_id', user.id)
          .eq('status', 'delivered')
          .order('created_at', { ascending: false })

        if (data) setCards(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCards()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="text-[#a0522d]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
          My Invitation Cards
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Open, manage, or share link URLs of your active invitations.
        </p>
      </div>

      <CardGrid cards={cards} />
    </div>
  )
}
