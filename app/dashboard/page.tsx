'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatDateShort } from '@/lib/utils'
import type { Order } from '@/lib/types'

export default function DashboardOverview() {
  const { user, profile } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchStats = async () => {
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
    fetchStats()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="text-[#a0522d]" />
      </div>
    )
  }

  const completedCards = orders.filter((o) => o.status === 'delivered')
  const pendingPayments = orders.filter((o) => o.status === 'pending')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
          Welcome Back, {profile?.full_name || 'Valued Client'} 🌸
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Manage your active invitations, order history, and credits.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e8c97e]/20 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#a07060] tracking-wider block">
            Credits Balance
          </span>
          <h3 className="text-3xl font-bold text-[#a0522d] font-playfair">
            {profile?.credits || 0}
          </h3>
          <Link
            href="/dashboard/credits"
            className="text-[10px] text-[#c9a96e] hover:text-[#a0522d] font-semibold underline block mt-2"
          >
            Buy credits pack →
          </Link>
        </div>

        <div className="bg-white border border-[#e8c97e]/20 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#a07060] tracking-wider block">
            Invitations Created
          </span>
          <h3 className="text-3xl font-bold text-[#2a1810] font-playfair">
            {completedCards.length}
          </h3>
          <Link
            href="/dashboard/cards"
            className="text-[10px] text-[#c9a96e] hover:text-[#a0522d] font-semibold underline block mt-2"
          >
            View my active cards →
          </Link>
        </div>

        <div className="bg-white border border-[#e8c97e]/20 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#a07060] tracking-wider block">
            Pending Orders
          </span>
          <h3 className="text-3xl font-bold text-[#2a1810] font-playfair">
            {pendingPayments.length}
          </h3>
          <Link
            href="/dashboard/orders"
            className="text-[10px] text-[#c9a96e] hover:text-[#a0522d] font-semibold underline block mt-2"
          >
            Check order history →
          </Link>
        </div>
      </div>

      {/* Quick Launch CTA */}
      <div className="bg-gradient-to-br from-[#fdf8f4] to-[#f7efe8]/60 border border-[#e8c97e]/30 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="font-playfair text-lg font-bold text-[#2a1810]">
            Need a new digital invitation?
          </h4>
          <p className="text-xs text-[#6b3d2a] mt-1">
            Choose from our beautiful selection of dynamic, animated cards.
          </p>
        </div>
        <Link
          href="/templates"
          className="px-6 py-3 rounded-xl bg-[#2a1810] text-[#e8c97e] text-xs font-bold hover:bg-[#3d2218] transition-colors shadow-md"
        >
          Create Invitation ✦
        </Link>
      </div>

      {/* Recent Orders teaser */}
      <div className="space-y-4">
        <h3 className="font-playfair text-xl font-bold text-[#2a1810]">Recent Orders</h3>
        {orders.length === 0 ? (
          <div className="bg-white border border-[#e8c97e]/10 p-6 rounded-xl text-center text-xs text-[#a07060]">
            No order activity recorded yet.
          </div>
        ) : (
          <div className="bg-white border border-[#e8c97e]/20 rounded-2xl shadow-md overflow-hidden divide-y divide-[#e8c97e]/10">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-[#fdf8f4]/20 transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-sm text-[#2a1810]">
                    {order.template?.name || 'Wedding Card'}
                  </h4>
                  <span className="text-[10px] text-[#a07060]">
                    Ordered {formatDateShort(order.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs capitalize font-bold text-[#a0522d]">
                    Status: {order.status}
                  </span>
                  {order.status === 'delivered' && order.card_url && (
                    <Link
                      href={`/card/${order.card_url}`}
                      className="text-xs font-bold px-3 py-1.5 bg-[#fdf8f4] text-[#a0522d] border border-[#e8c97e]/30 rounded-lg hover:bg-[#f7efe8]"
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
