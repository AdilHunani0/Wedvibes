'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatPrice } from '@/lib/utils'

interface RevenueChartProps {
  data?: { date: string; revenue: number }[]
}

export function RevenueChart({ data = [] }: RevenueChartProps) {
  // Format chart data safely
  const chartData = data.map((d) => ({
    date: d.date,
    amount: d.revenue / 100, // paise → rupees
  }))

  return (
    <div className="bg-white rounded-2xl border border-[#e8c97e]/20 p-6 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-[#e8c97e]/10 pb-4">
        <div>
          <h3 className="font-playfair text-lg font-bold text-[#2a1810]">
            Revenue Over Time
          </h3>
          <p className="text-xs text-[#a07060] mt-0.5">
            Daily order value trends in INR
          </p>
        </div>
      </div>

      <div className="h-72 w-full text-xs">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#a07060]">
            No sales data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a0522d" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a0522d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e8c97e20"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                stroke="#a07060"
                tick={{ fontSize: 12 }}
                minTickGap={20}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#a07060"
                tickFormatter={(value) => `₹${value}`}
                width={60}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#2a1810',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                }}
                formatter={(value) => [
                  formatPrice(Number(value) * 100),
                  'Revenue',
                ]}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#a0522d"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}