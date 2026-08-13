'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { AdminStats } from '@/lib/types'
import toast from 'react-hot-toast'

const COLORS = ['#a0522d', '#c9a96e', '#6b3d2a', '#e8c97e', '#a07060']

export default function AdminAnalytics() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (!res.ok) throw new Error('Failed to load stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load detailed charts analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="text-[#a0522d]" />
      </div>
    )
  }

  if (!stats) return null

  // Process data for Category chart
  const categoryData = stats.ordersByCategory.map((c) => ({
    name: c.category.toUpperCase(),
    value: c.count,
  }))

  // Process data for Tier chart
  const tierData = stats.tierBreakdown.map((t) => ({
    name: t.tier.toUpperCase(),
    value: t.count,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
          System Analytics
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Detailed metrics showing card categories interest, and customer preference breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Category distribution BarChart */}
        <div className="bg-white rounded-2xl border border-[#e8c97e]/20 p-6 shadow-xl space-y-4">
          <h3 className="font-playfair text-lg font-bold text-[#2a1810]">Orders By Template Category</h3>
          <div className="h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8c97e10" />
                <XAxis dataKey="name" stroke="#a07060" tickLine={false} />
                <YAxis stroke="#a07060" tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2a1810', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#a0522d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tier breakdown PieChart */}
        <div className="bg-white rounded-2xl border border-[#e8c97e]/20 p-6 shadow-xl space-y-4">
          <h3 className="font-playfair text-lg font-bold text-[#2a1810]">Orders By Price Tier</h3>
          <div className="h-64 text-xs flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tierData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {tierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
