'use client'

import { useRef } from 'react'

export function LiveCardDemo() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="relative mx-auto" style={{ width: 220, height: 440 }}>
      {/* iPhone frame */}
      <div className="absolute inset-0 rounded-[32px] bg-[#1a1a1a] shadow-2xl border border-[#333]" style={{ zIndex: 2, pointerEvents: 'none' }}>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a1a] rounded-full z-10" />
        {/* Side buttons */}
        <div className="absolute -left-0.5 top-24 w-0.5 h-8 bg-[#2a2a2a] rounded-l" />
        <div className="absolute -left-0.5 top-36 w-0.5 h-8 bg-[#2a2a2a] rounded-l" />
        <div className="absolute -right-0.5 top-28 w-0.5 h-12 bg-[#2a2a2a] rounded-r" />
      </div>
      {/* Screen */}
      <div className="absolute rounded-[28px] overflow-hidden bg-[#fdf8f4]" style={{ inset: '4px', zIndex: 1 }}>
        <iframe
          ref={iframeRef}
          src="/templates/rose-bloom-wedding.html"
          title="Live card demo"
          className="w-full h-full border-0"
          style={{ transform: 'scale(0.55)', transformOrigin: 'top left', width: '182%', height: '182%', pointerEvents: 'none' }}
        />
      </div>
    </div>
  )
}
