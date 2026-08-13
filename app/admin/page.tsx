'use client'

import { useEffect, useState } from 'react'
import { StatsCards } from '@/components/admin/StatsCards'
import { RevenueChart } from '@/components/admin/RevenueChart'
import { OrdersTable } from '@/components/admin/OrdersTable'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { AdminStats, OrderStatus } from '@/lib/types'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (!res.ok) throw new Error('Failed to fetch admin stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load admin dashboard stats')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const reloadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) setStats(await res.json())
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
      reloadStats() // Refetch stats to show updated status
    } catch (err) {
      console.error(err)
      toast.error('Failed to update order status.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="text-[#a0522d]" />
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
          Admin Console Overview
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Review system health, lifetime collections, daily revenue trends, and client actions.
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue trend area chart */}
        <div className="lg:col-span-12">
          <RevenueChart data={stats.revenueByDay} />
        </div>

        {/* Recent orders table */}
        <div className="lg:col-span-12 space-y-4">
          <h3 className="font-playfair text-xl font-bold text-[#2a1810]">Recent Orders Activity</h3>
          <OrdersTable orders={stats.recentOrders} onStatusUpdate={handleStatusUpdate} />
        </div>
      </div>
    </div>
  )
}
