'use client'

import { useState } from 'react'
import type { Order } from '@/lib/types'

interface CardViewerProps {
  order: Order
}

export function CardViewer({ order }: CardViewerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

  // Use /api/render which sets Content-Type: text/html so the browser renders correctly
  const generatedPath = order.generated_card_path || `${order.id}.html`
  const cardSrc = `/api/render/${generatedPath}`

  // Normalize customization (Supabase returns array for joins)
  const customization = Array.isArray(order.customization)
    ? order.customization[0]
    : order.customization

  return (
    <div className="relative w-full h-screen bg-[#2a1810] overflow-hidden">
      {/* Full-screen Invitation Card Iframe */}
      <div className="absolute inset-0 w-full h-full">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2a1810] text-[#e8c97e] z-10">
            <p className="text-5xl animate-bounce mb-4">🌸</p>
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

    </div>
  )
}
