'use client'

import { useState } from 'react'
import type { Order } from '@/lib/types'

interface Customization {
  person1_name?: string
  person2_name?: string
  event_date?: string
  venue_name?: string
  photo_urls?: string[]
}

interface SharePanelProps {
  order: Order
  customization?: Customization | null
  onClose: () => void
}

export function SharePanel({ order, customization, onClose }: SharePanelProps) {
  const [copied, setCopied] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const cardLink = `${appUrl}/card/${order.card_url || order.id}`

  const p1 = customization?.person1_name && customization.person1_name !== 'null' ? customization.person1_name : ''
  const p2 = customization?.person2_name && customization.person2_name !== 'null' ? customization.person2_name : ''
  const names = p1 && p2 ? `${p1} & ${p2}` : ''

  const eventDate = customization?.event_date
    ? new Date(customization.event_date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const venue = customization?.venue_name && customization.venue_name !== 'null' ? customization.venue_name : ''

  // Craft a warm, personal WhatsApp message
  const whatsAppMessage = names
    ? `We are getting married! ✨\n\n${names} joyfully invite you to celebrate our special day.\n\n${eventDate ? `📅 Date: ${eventDate}\n` : ''}${venue ? `📍 Venue: ${venue}\n` : ''}\nPlease tap the link below to view our interactive invitation for all the details:\n${cardLink}`
    : `You're invited! 🌸\n\nPlease tap the link below to view our interactive wedding invitation for all the details:\n${cardLink}`

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cardLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${names} — Wedding Invitation`,
        text: `You're invited to the wedding of ${names}! Open their beautiful interactive invitation:`,
        url: cardLink,
      }).catch(console.error)
    }
  }

  return (
    /* Backdrop */
    <div
      className="absolute inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-sm mx-4 mb-0 sm:mb-0 bg-[#1a0f0a] border border-[#e8c97e]/20 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#c9a96e] via-[#e8c97e] to-[#c9a96e]" />

        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#e8c97e]/30" />
        </div>

        <div className="p-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#e8c97e]/50 hover:text-[#e8c97e] text-xl transition-colors"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-3xl mb-2">💌</p>
            <h2 className="font-playfair text-lg font-bold text-[#e8c97e]">
              Forward this Invitation
            </h2>
            <p className="text-xs text-[#a07060] mt-1">
              Share {names}&apos;s wedding invitation with friends &amp; family
            </p>
          </div>

          {/* WhatsApp — Primary */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full bg-[#25D366] hover:bg-[#20c45e] text-white font-bold px-5 py-4 rounded-2xl transition-all active:scale-[.98] mb-3 shadow-lg shadow-green-900/30"
          >
            <span className="text-2xl">💬</span>
            <div className="text-left">
              <p className="text-sm font-bold">Share on WhatsApp</p>
              <p className="text-xs font-normal opacity-80">Send a personal invitation message</p>
            </div>
            <span className="ml-auto text-lg opacity-70">↗</span>
          </a>

          {/* Message Preview */}
          <div className="bg-[#0d0804] border border-[#e8c97e]/10 rounded-xl p-3 mb-4 text-left">
            <p className="text-[10px] text-[#a07060] font-bold uppercase tracking-wider mb-1.5">Message Preview</p>
            <p className="text-xs text-[#d4b896] leading-relaxed whitespace-pre-line">
              {whatsAppMessage.split('\n').slice(0, 5).join('\n')}
              {whatsAppMessage.split('\n').length > 5 && '...'}
            </p>
          </div>

          {/* Secondary actions */}
          <div className="flex gap-3">
            {/* Copy link */}
            <button
              onClick={handleCopy}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border font-semibold text-xs transition-all active:scale-[.97] ${
                copied
                  ? 'bg-[#e8c97e]/10 border-[#e8c97e]/40 text-[#e8c97e]'
                  : 'border-[#e8c97e]/20 text-[#e8c97e]/70 hover:border-[#e8c97e]/40 hover:text-[#e8c97e]'
              }`}
            >
              <span className="text-xl">{copied ? '✓' : '🔗'}</span>
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            {/* Native share (mobile only) */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border border-[#e8c97e]/20 text-[#e8c97e]/70 hover:border-[#e8c97e]/40 hover:text-[#e8c97e] font-semibold text-xs transition-all active:scale-[.97]"
              >
                <span className="text-xl">📤</span>
                <span>More Apps</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
