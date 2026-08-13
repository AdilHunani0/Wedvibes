'use client'

import { useState } from 'react'
import { ShareActions } from './ShareActions'
import type { Order } from '@/lib/types'

interface CardViewerProps {
  order: Order
}

export function CardViewer({ order }: CardViewerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  
  // Public storage URL for the generated card
  const generatedPath = order.generated_card_path || `${order.id}.html`
  const cardSrc = `/api/render/${generatedPath}`

  return (
    <div className="relative w-full h-screen bg-[#2a1810] overflow-hidden">
      {/* Full-screen Invitation Card Iframe */}
      <div className="absolute inset-0 w-full h-full">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2a1810] text-[#e8c97e] z-10">
            <p className="text-4xl animate-bounce mb-3">🌸</p>
            <p className="text-sm font-semibold tracking-widest font-playfair animate-pulse">
              LOADING YOUR INVITATION...
            </p>
          </div>
        )}
        <iframe
          src={cardSrc}
          onLoad={() => setIframeLoaded(true)}
          className="w-full h-full border-none"
          title={`${order.template?.name || 'Wedding'} Invitation`}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>

      {/* Action Menu OUTSIDE the iframe */}
      {iframeLoaded && (
        <div className="absolute bottom-6 left-6 z-50 bg-[#1a0f0a]/80 backdrop-blur-md border border-[#e8c97e]/20 rounded-2xl p-3 px-5 flex justify-start items-center shadow-2xl transition-all">
          <ShareActions order={order} />
        </div>
      )}
    </div>
  )
}
