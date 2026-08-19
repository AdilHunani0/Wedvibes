'use client'

import { useState } from 'react'
import { SharePanel } from './SharePanel'
import type { Order } from '@/lib/types'

interface CardViewerProps {
  order: Order
}

export function CardViewer({ order }: CardViewerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

  // Load directly from Supabase CDN — bypasses /api/render proxy for instant load
  const generatedPath = order.generated_card_path || `${order.id}.html`
  const cardSrc = `${supabaseUrl}/storage/v1/object/public/generated-cards/${generatedPath}`

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

      {/* Floating Share Button — always visible after load */}
      {iframeLoaded && !showShare && (
        <button
          onClick={() => setShowShare(true)}
          className="absolute bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-2xl hover:bg-[#128C7E] transition-all active:scale-95 animate-pulse-slow"
        >
          <span className="text-lg">💬</span>
          <span>Share Invitation</span>
        </button>
      )}

      {/* Share Panel Overlay */}
      {showShare && (
        <SharePanel
          order={order}
          customization={customization}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  )
}
