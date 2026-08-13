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
              <Link
                href={`/card/${cardUrl}`}
                target="_blank"
                className="block text-center py-2.5 rounded-xl bg-[#2a1810] text-[#e8c97e] text-xs font-bold hover:bg-[#3d2218] transition-colors"
              >
                Open Invitation ↗
              </Link>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleCopyLink(cardUrl, card.id)}
                className="w-full justify-center py-2 text-xs font-semibold"
              >
                {isCopied ? 'Copied Link! ✓' : 'Copy Share Link 🔗'}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
