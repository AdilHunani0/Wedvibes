'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { Order } from '@/lib/types'

interface CardGridProps {
  cards: Order[]
}

export function CardGrid({ cards }: CardGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyLink = (cardUrl: string, orderId: string) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const link = `${appUrl}/card/${cardUrl}`
    navigator.clipboard.writeText(link)
    setCopiedId(orderId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleWhatsAppShare = (card: Order) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const link = `${appUrl}/card/${card.card_url || card.id}`
    const p1 = card.customization?.person1_name || 'Groom'
    const p2 = card.customization?.person2_name || 'Bride'
    const message = `We're getting married! 💍✨\n\n${p1} & ${p2} joyfully invite you to celebrate our special day.\n\nPlease tap the link below to view our interactive invitation for all the details:\n\n${link}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (cards.length === 0) {
    return (
      <div className="bg-white border border-[#e8c97e]/20 rounded-2xl p-12 text-center shadow-lg">
        <p className="text-4xl mb-3">🌸</p>
        <h3 className="font-playfair text-lg font-bold text-[#2a1810] mb-1">No Active Cards</h3>
        <p className="text-xs text-[#a07060] mb-4">You haven&apos;t completed any custom cards yet.</p>
        <Link
          href="/templates"
          className="inline-block text-xs font-semibold px-5 py-2.5 bg-[#2a1810] text-[#e8c97e] rounded-xl hover:bg-[#3d2218] transition-colors"
        >
          Create Invitation ✦
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const customization = card.customization
        const template = card.template
        const cardUrl = card.card_url || card.id
        const isCopied = copiedId === card.id

        return (
          <div
            key={card.id}
            className="group bg-white rounded-2xl border border-[#e8c97e]/20 hover:border-[#c9a96e] hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-[#a0522d] bg-[#fdf8f4] border border-[#e8c97e]/40 px-2.5 py-1 rounded-full uppercase">
                  {template?.tier || 'Basic'}
                </span>
                <span className="text-[10px] text-[#a07060] font-medium">
                  {formatDateShort(card.created_at)}
                </span>
              </div>

              {/* Names */}
              <h3 className="font-playfair text-lg font-bold text-[#2a1810] leading-tight mb-2">
                {customization?.person1_name || 'Groom'} & {customization?.person2_name || 'Bride'}
              </h3>
              <p className="text-xs text-[#6b3d2a] mb-4">
                Template: <span className="font-semibold">{template?.name || 'Wedding Card'}</span>
              </p>

              {/* Customization Details teaser */}
              <div className="bg-[#fdf8f4]/50 border border-[#e8c97e]/10 rounded-xl p-3 text-xs text-[#6b3d2a] space-y-1.5 mb-6">
                <div>
                  <span className="text-[#a07060]">Date:</span>{' '}
                  <span className="font-medium text-[#2a1810]">
                    {customization?.event_date
                      ? new Date(customization.event_date).toLocaleDateString('en-IN', {
                          dateStyle: 'medium',
                        })
                      : '—'}
                  </span>
                </div>
                <div className="truncate">
                  <span className="text-[#a07060]">Venue:</span>{' '}
                  <span className="font-medium text-[#2a1810]">{customization?.venue_name || '—'}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 mt-auto">
              <div className="flex gap-2">
                <Link
                  href={`/card/${cardUrl}`}
                  target="_blank"
                  className="flex-1 text-center py-2.5 rounded-xl bg-[#2a1810] text-[#e8c97e] text-xs font-bold hover:bg-[#3d2218] transition-colors"
                >
                  Open ↗
                </Link>
                {/* 5-Day Edit Window */}
                {new Date(card.created_at) > new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) ? (
                  <Link
                    href={`/customize/${template?.slug}?editOrderId=${card.id}`}
                    className="flex-1 text-center py-2.5 rounded-xl bg-white border border-[#e8c97e]/40 text-[#2a1810] text-xs font-bold hover:bg-[#fdf8f4] transition-colors"
                  >
                    Edit ✎
                  </Link>
                ) : (
                  <div
                    title="Edit window (5 days) has expired"
                    className="flex-1 text-center py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-400 text-xs font-bold cursor-not-allowed"
                  >
                    Locked
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCopyLink(cardUrl, card.id)}
                  className="flex-1 justify-center py-2 text-xs font-semibold"
                >
                  {isCopied ? 'Copied ✓' : 'Copy Link 🔗'}
                </Button>
                <Button
                  type="button"
                  onClick={() => handleWhatsAppShare(card)}
                  className="flex-1 justify-center py-2 text-xs font-semibold bg-[#25D366] text-white hover:bg-[#128C7E] border-none"
                >
                  WhatsApp 💬
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

