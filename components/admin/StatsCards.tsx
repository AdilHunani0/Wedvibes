'use client'

import { formatPrice } from '@/lib/utils'
import type { AdminStats } from '@/lib/types'

interface StatsCardsProps {
  stats: AdminStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: '💰',
      change: 'Lifetime earnings',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Orders Today',
      value: stats.ordersToday,
      icon: '🛒',
      change: 'Recent purchases',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      title: 'Active Profiles',
      value: stats.activeUsers,
      icon: '👥',
      change: 'Registered users',
      color: 'text-green-600 bg-green-50 border-green-100',
    },
    {
      title: 'Credits Sold',
      value: stats.creditsSold,
      icon: '🪙',
      change: 'Purchased by planners',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white rounded-2xl border p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300`}
        >
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#a07060] uppercase tracking-wider block">
              {card.title}
            </span>
            <h3 className="font-playfair text-2xl font-bold text-[#2a1810]">
              {card.value}
            </h3>
            <span className="text-[10px] text-[#a07060] block font-medium">
              {card.change}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${card.color}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  )
}
