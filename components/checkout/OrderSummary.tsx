'use client'

import { formatPrice } from '@/lib/utils'
import { TIER_LABELS, TIER_COLORS } from '@/lib/constants'
import type { Order } from '@/lib/types'

interface OrderSummaryProps {
  order: Order
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const template = order.template
  const customization = order.customization

  if (!template) return null

  return (
    <div className="bg-white rounded-2xl border border-[#e8c97e]/20 p-6 shadow-xl space-y-6">
      <h3 className="font-playfair text-xl font-bold text-[#2a1810] border-b border-[#e8c97e]/20 pb-4">
        Order Summary
      </h3>

      {/* Item info */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="font-semibold text-lg text-[#2a1810]">{template.name}</h4>
          <p className="text-xs text-[#a07060] capitalize">{template.category} Template</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: TIER_COLORS[template.tier] }}
            />
            <span className="text-xs font-semibold text-[#6b3d2a]">
              {TIER_LABELS[template.tier]} Tier
            </span>
          </div>
        </div>
        <span className="font-bold text-[#a0522d] text-xl shrink-0">
          {formatPrice(template.price)}
        </span>
      </div>

      {/* Details list */}
      {customization && (
        <div className="bg-[#fdf8f4] rounded-xl p-4 border border-[#e8c97e]/20 text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-[#a07060]">Names</span>
            <span className="font-semibold text-[#2a1810]">
              {customization.person1_name} & {customization.person2_name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a07060]">Date</span>
            <span className="font-semibold text-[#2a1810]">
              {customization.event_date ? new Date(customization.event_date).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a07060]">Time</span>
            <span className="font-semibold text-[#2a1810]">
              {customization.event_time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a07060]">Venue</span>
            <span className="font-semibold text-[#2a1810] truncate max-w-[200px]" title={customization.venue_name}>
              {customization.venue_name}
            </span>
          </div>
          {customization.photo_urls.length > 0 && (
            <div className="flex justify-between">
              <span className="text-[#a07060]">Photos uploaded</span>
              <span className="font-semibold text-[#2a1810]">
                {customization.photo_urls.length} photo(s)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-[#e8c97e]/20 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#6b3d2a]">Subtotal</span>
          <span className="text-[#2a1810] font-medium">{formatPrice(template.price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6b3d2a]">Platform fee</span>
          <span className="text-green-600 font-semibold">FREE</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-[#e8c97e]/20 pt-3">
          <span className="text-[#2a1810]">Total</span>
          <span className="text-[#a0522d]">{formatPrice(template.price)}</span>
        </div>
      </div>
    </div>
  )
}
