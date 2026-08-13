'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'
import { OrdersTable } from '@/components/dashboard/OrdersTable'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Order } from '@/lib/types'

export default function DashboardOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*, template:templates(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (data) setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
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
          Order History
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Review details of all your current and past purchases.
        </p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
