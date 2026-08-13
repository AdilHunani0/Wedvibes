'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDateShort, formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'
import type { Order, OrderStatus } from '@/lib/types'

interface OrdersTableProps {
  orders: Order[]
  onStatusUpdate?: (orderId: string, newStatus: OrderStatus) => Promise<void>
}

export function OrdersTable({ orders, onStatusUpdate }: OrdersTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    if (!onStatusUpdate) return
    setUpdatingId(orderId)
    try {
      await onStatusUpdate(orderId, newStatus)
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-[#e8c97e]/20 rounded-2xl p-12 text-center shadow-md">
        <p className="text-4xl mb-2">🛍️</p>
        <h3 className="font-playfair text-lg font-bold text-[#2a1810]">No Orders</h3>
        <p className="text-xs text-[#a07060]">There are no client orders recorded in the system.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e8c97e]/20 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf8f4] border-b border-[#e8c97e]/20 text-xs font-bold text-[#6b3d2a] uppercase tracking-wider">
              <th className="px-6 py-4">Client / Contact</th>
              <th className="px-6 py-4">Template</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 font-mono text-center">Customization</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8c97e]/10 text-sm text-[#2a1810]">
            {orders.map((order) => {
              const statusColor = ORDER_STATUS_COLORS[order.status] || '#6b7280'
              const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status
              const userEmail = order.guest_email || order.profile?.full_name || 'Guest'

              return (
                <tr key={order.id} className="hover:bg-[#fdf8f4]/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{userEmail}</div>
                    {order.profile?.phone && (
                      <span className="text-[10px] text-[#a07060] block">{order.profile.phone}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-xs uppercase tracking-wider text-[#a0522d]">
                      {order.template?.name || 'Deleted Template'}
                    </div>
                    <span className="text-[10px] text-[#a07060] capitalize">{order.payment_method} payment</span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {formatDateShort(order.created_at)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {order.customization ? (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        ✓ Complete
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                        ⏳ Missing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {order.amount_paid ? formatPrice(order.amount_paid) : '—'}
                  </td>
                  <td className="px-6 py-4">
                    {onStatusUpdate ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1 rounded-lg border border-[#e8c97e]/40 text-xs text-[#2a1810] bg-white outline-none cursor-pointer focus:border-[#c9a96e]"
                      >
                        {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: `${statusColor}15`,
                          color: statusColor,
                        }}
                      >
                        {statusLabel}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.card_url ? (
                      <Link
                        href={`/card/${order.card_url}`}
                        target="_blank"
                        className="text-xs font-bold text-[#a0522d] hover:text-[#2a1810] underline"
                      >
                        View Card ↗
                      </Link>
                    ) : (
                      <span className="text-xs text-[#a07060]">Not ready</span>
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
