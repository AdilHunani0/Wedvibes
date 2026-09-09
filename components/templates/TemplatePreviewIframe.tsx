'use client'

import { useState } from 'react'

interface Props {
  srcDoc: string
  src?: string
  title: string
}

export function TemplatePreviewIframe({ srcDoc, src, title }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full h-full relative">
      {/* Shimmer skeleton shown while iframe loads */}
      {!loaded && (
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0609 0%, #2a0a10 40%, #1a0609 100%)' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.08) 50%, transparent 100%)',
              animation: 'shimmer 1.6s infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              textAlign: 'center',
              color: 'rgba(232,207,154,0.5)',
              fontSize: '13px',
              fontFamily: 'serif',
              letterSpacing: '0.15em',
            }}
          >
            ✦ Loading Preview ✦
          </div>
          <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
        </div>
      )}

      {/* Template iframe */}
      <iframe
        srcDoc={srcDoc || undefined}
        src={!srcDoc ? src : undefined}
        className="w-full h-full border-none bg-transparent"
        title={title}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
