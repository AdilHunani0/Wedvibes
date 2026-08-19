'use client'

import { useState } from 'react'
import { getWhatsAppShareUrl } from '@/lib/utils'
import type { Order } from '@/lib/types'

interface ShareActionsProps {
  order: Order
}

export function ShareActions({ order }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const cardLink = `${appUrl}/card/${order.card_url || order.id}`

  // Supabase one-to-many join returns an array — normalize it
  const customization = Array.isArray(order.customization)
    ? order.customization[0]
    : order.customization

  const p1 = customization?.person1_name || ''
  const p2 = customization?.person2_name || ''
  const names = p1 && p2 ? `${p1} & ${p2}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(cardLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareApi = () => {
    if (navigator.share) {
      navigator.share({
        title: names ? `${names} Wedding Invitation` : 'Wedding Invitation',
        text: `You're invited to celebrate with us! View our beautiful animated card:`,
        url: cardLink,
      }).catch(console.error)
    } else {
      handleCopy()
    }
  }

  const whatsAppUrl = getWhatsAppShareUrl(order.card_url || order.id, names)

  return (
    <div className="flex items-center gap-6">
      {/* WhatsApp Share */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
        <span className="text-[10px] font-semibold tracking-wider text-white/80">WhatsApp</span>
      </a>

      {/* Divider */}
      <div className="w-[1px] h-8 bg-[#e8c97e]/20" />

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex flex-col items-center gap-1 text-[#e8c97e] hover:text-yellow-200 transition-colors cursor-pointer group"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">
          {copied ? '✓' : '🔗'}
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-white/80">
          {copied ? 'Copied!' : 'Copy Link'}
        </span>
      </button>

      {/* Native Share */}
      {typeof window !== 'undefined' && typeof navigator.share === 'function' && (
        <>
          <div className="w-[1px] h-8 bg-[#e8c97e]/20" />
          <button
            onClick={handleShareApi}
            className="flex flex-col items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📤</span>
            <span className="text-[10px] font-semibold tracking-wider text-white/80">Share</span>
          </button>
        </>
      )}
    </div>
  )
}
