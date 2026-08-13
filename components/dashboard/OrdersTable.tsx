'use client'

import Link from 'next/link'
import { formatDateShort, formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'
import type { Order } from '@/lib/types'

interface OrdersTableProps {
  orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white border border-[#e8c97e]/20 rounded-2xl p-12 text-center shadow-lg">
        <p className="text-4xl mb-3">🛍️</p>
        <h3 className="font-playfair text-lg font-bold text-[#2a1810] mb-1">No Orders Found</h3>
        <p className="text-xs text-[#a07060] mb-4">You haven&apos;t ordered any templates yet.</p>
        <Link
          href="/templates"
          className="inline-block text-xs font-semibold px-5 py-2.5 bg-[#2a1810] text-[#e8c97e] rounded-xl hover:bg-[#3d2218] transition-colors"
        >
          Browse Templates ✦
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e8c97e]/20 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf8f4] border-b border-[#e8c97e]/20 text-xs font-bold text-[#6b3d2a] uppercase tracking-wider">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Template</th>
              <th className="px-6 py-4">Tier</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8c97e]/10 text-sm text-[#2a1810]">
            {orders.map((order) => {
              const template = order.template
              const statusColor = ORDER_STATUS_COLORS[order.status] || '#6b7280'
              const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status

              return (
                <tr key={order.id} className="hover:bg-[#fdf8f4]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#a07060]">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {formatDateShort(order.created_at)}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {template?.name || 'Deleted Template'}
                  </td>
                  <td className="px-6 py-4 capitalize text-xs">
                    {template?.tier || '—'}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {order.amount_paid ? formatPrice(order.amount_paid) : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `${statusColor}15`,
                        color: statusColor,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                      {statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'delivered' && order.card_url ? (
                      <Link
                        href={`/card/${order.card_url}`}
                        className="inline-flex items-center text-xs font-bold text-[#a0522d] hover:text-[#2a1810] underline"
                      >
                        View Card ✨
                      </Link>
                    ) : order.status === 'pending' ? (
                      <Link
                        href={`/checkout/${order.id}`}
                        className="inline-flex items-center text-xs font-bold px-3 py-1.5 bg-[#a0522d] text-white rounded-lg hover:bg-[#8b4513] transition-colors"
                      >
                        Pay Now
                      </Link>
                    ) : (
                      <span className="text-xs text-[#a07060] font-medium">Processing</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
