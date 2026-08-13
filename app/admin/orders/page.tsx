'use client'

import { useEffect, useState } from 'react'
import { OrdersTable } from '@/components/admin/OrdersTable'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Order, OrderStatus } from '@/lib/types'
import toast from 'react-hot-toast'

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders')
        if (!res.ok) throw new Error('Failed to fetch admin orders')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load system orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const reloadOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      if (res.ok) setOrders(await res.json())
    } catch (e) {
      console.error(e)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update status')
      }

      toast.success('Order status updated!')
      reloadOrders()
    } catch (err) {
      console.error(err)
      toast.error('Failed to update status.')
    }
  }

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
          Manage System Orders
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Review details of all orders and manually override statuses.
        </p>
      </div>

      <OrdersTable orders={orders} onStatusUpdate={handleStatusUpdate} />
    </div>
  )
}
