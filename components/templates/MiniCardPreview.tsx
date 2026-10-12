'use client';
import { useState, useRef, useEffect } from 'react';

// Global in-memory cache to prevent re-fetching and re-parsing template HTML files
const previewHtmlCache = new Map<string, string>();

interface MiniCardPreviewProps {
  htmlFilePath: string;
  templateName: string;
  category: string;
}

export function MiniCardPreview({ 
  htmlFilePath, 
  templateName,
  category,
}: MiniCardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);
  const [iframeHtml, setIframeHtml] = useState<string | null>(() => previewHtmlCache.get(htmlFilePath) || null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Activate iframe rendering on hover or user interaction
  const handleInteraction = () => {
    setIsHovered(true);
    if (!shouldRenderIframe) {
      setShouldRenderIframe(true);
    }
  };

  // Fetch and prepare HTML only when needed (on hover / interaction)
  useEffect(() => {
    if (!shouldRenderIframe) return;

    if (previewHtmlCache.has(htmlFilePath)) {
      setIframeHtml(previewHtmlCache.get(htmlFilePath)!);
      return;
    }

    let isMounted = true;
    fetch(htmlFilePath)
      .then(res => res.text())
      .then(html => {
        if (!isMounted) return;
        let h = html;
        // Generic fallbacks for placeholders so assets don't 404
        const genericImg = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600';
        h = h.replace(/\{\{COUPLE_PHOTOS_\d+\}\}/g, genericImg);
        h = h.replace(/\{\{GALLERY_PHOTOS_\d+\}\}/g, genericImg);
        h = h.replace(/\{\{PHOTO_\d+\}\}/g, genericImg);
        h = h.replace(/\{\{BRIDE_FAMILY_PHOTO_1\}\}/g, genericImg);
        h = h.replace(/\{\{GROOM_FAMILY_PHOTO_1\}\}/g, genericImg);
        
        h = h.replace(/\{\{COUPLE_INITIALS\}\}/g, 'G&B');
        h = h.replace(/\{\{BRIDE_PARENTS\}\}/g, 'D/o Mr. & Mrs. Sharma');
        h = h.replace(/\{\{GROOM_PARENTS\}\}/g, 'S/o Mr. & Mrs. Singh');
        h = h.replace(/\{\{BRIDE_BIO\}\}/g, 'A beautiful soul');
        h = h.replace(/\{\{GROOM_BIO\}\}/g, 'A handsome prince');
        h = h.replace(/\{\{STORY_YEAR_1\}\}/g, '2021');
        h = h.replace(/\{\{STORY_HEADING_1\}\}/g, 'First Met');
        h = h.replace(/\{\{STORY_TEXT_1\}\}/g, 'We met at a coffee shop...');
        h = h.replace(/\{\{STORY_YEAR_2\}\}/g, '2023');
        h = h.replace(/\{\{STORY_HEADING_2\}\}/g, 'The Proposal');
        h = h.replace(/\{\{STORY_TEXT_2\}\}/g, 'He got down on one knee...');
        h = h.replace(/\{\{STORY_YEAR_3\}\}/g, '2026');
        h = h.replace(/\{\{STORY_HEADING_3\}\}/g, 'Forever');
        h = h.replace(/\{\{STORY_TEXT_3\}\}/g, 'Tying the knot...');
        h = h.replace(/\{\{SCRATCH_DATE\}\}/g, '21 — 23 NOVEMBER 2026');
        h = h.replace(/\{\{SCRATCH_LOCATION\}\}/g, 'Udaipur');
        h = h.replace(/\{\{COUNTDOWN_TARGET\}\}/g, '2026-11-21T17:30:00+05:30');
        h = h.replace(/\{\{WEDDING_DATE\}\}/g, '21st Nov 2026');
        h = h.replace(/\{\{HALDI_DATE\}\}/g, '20th Nov 2026');
        h = h.replace(/\{\{RECEPTION_DATE\}\}/g, '22nd Nov 2026');
        h = h.replace(/\{\{EVENT_DATE\}\}/g, '21st Nov 2026');
        h = h.replace(/\{\{EVENT_TIME\}\}/g, '11:00 AM');
        h = h.replace(/\{\{VENUE_NAME\}\}/g, 'Grand Palace Hall');
        
        // Strip logic blocks and remaining placeholders
        h = h.replace(/\{\{#if [^}]+\}\}([\s\S]*?)\{\{\/if\}\}/g, '');
        h = h.replace(/\{\{[^}]+\}\}/g, '');

        // Auto open doors in mini preview so animated interior & video are visible
        h = h.replace('</body>', '<script>setTimeout(function(){ if(typeof openDoors==="function") openDoors(); }, 700);</script></body>');
        
        previewHtmlCache.set(htmlFilePath, h);
        setIframeHtml(h);
      })
      .catch(err => console.error('MiniPreview fetch err:', err));

    return () => {
      isMounted = false;
    };
  }, [shouldRenderIframe, htmlFilePath]);

  // Category background colors
  const categoryBg: Record<string, string> = {
    wedding:     'linear-gradient(145deg, #fff0f5, #fce4ec)',
    birthday:    'linear-gradient(145deg, #f3e8ff, #ede9fe)',
    engagement:  'linear-gradient(145deg, #fef9ee, #fef3c7)',
    opening:     'linear-gradient(145deg, #f0fdf4, #dcfce7)',
    anniversary: 'linear-gradient(145deg, #eff6ff, #dbeafe)',
  };

  const categoryEmoji: Record<string, string> = {
    wedding: '💍',
    birthday: '🎂',
    engagement: '✨',
    opening: '🎉',
    anniversary: '🥂',
  };

  const bg = categoryBg[category] || 'linear-gradient(145deg, #f9fafb, #f3f4f6)';
  const emoji = categoryEmoji[category] || '💌';

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex items-center justify-center transition-all duration-300"
      style={{
        height: '300px',
        background: bg,
      }}
      onMouseEnter={handleInteraction}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleInteraction}
    >
      {/* Outer phone frame wrapper — subtle scale on hover */}
      <div
        style={{
          transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Phone outer bezel */}
        <div
          style={{
            width: '150px',
            height: '290px',
            borderRadius: '24px',
            border: '3px solid #1a1a1a',
            background: '#0d0705',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isHovered
              ? '0 32px 64px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)'
              : '0 12px 40px rgba(0,0,0,0.18)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Top notch */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '46px',
              height: '8px',
              background: '#1a1a1a',
              borderRadius: '0 0 8px 8px',
              zIndex: 20,
            }}
          />

          {/* Side button details */}
          <div style={{
            position: 'absolute',
            right: '-5px',
            top: '60px',
            width: '4px',
            height: '36px',
            background: '#2a2a2a',
            borderRadius: '0 2px 2px 0',
          }}/>
          <div style={{
            position: 'absolute',
            left: '-5px',
            top: '50px',
            width: '4px',
            height: '22px',
            background: '#2a2a2a',
            borderRadius: '2px 0 0 2px',
          }}/>
          <div style={{
            position: 'absolute',
            left: '-5px',
            top: '80px',
            width: '4px',
            height: '22px',
            background: '#2a2a2a',
            borderRadius: '2px 0 0 2px',
          }}/>

          {/* INSTANT LUXURY POSTER (Visible before hover and while iframe fades in) */}
          {(!iframeLoaded || !shouldRenderIframe) && (
            <div
              className="absolute inset-0 flex flex-col justify-between items-center p-3 text-center select-none"
              style={{
                background: 'linear-gradient(170deg, #1f110c 0%, #120906 50%, #29150d 100%)',
              }}
            >
              {/* Header motif */}
              <div className="w-full flex justify-between text-[#e8c97e]/40 text-[9px] pt-2">
                <span>✦</span>
                <span className="text-[10px] text-[#e8c97e]/60 font-serif">WedVibe</span>
                <span>✦</span>
              </div>

              {/* Center card info */}
              <div className="flex flex-col items-center my-auto px-1">
                <span className="text-2xl mb-1 filter drop-shadow">{emoji}</span>
                <h4 className="font-playfair text-[#fdf8f4] text-xs font-bold tracking-tight line-clamp-2 leading-snug">
                  {templateName}
                </h4>
                <div className="w-6 h-px bg-[#e8c97e]/40 my-1.5" />
                <span className="text-[9px] tracking-widest uppercase text-[#e8c97e] font-medium">
                  {category} Invite
                </span>
                {shouldRenderIframe && !iframeLoaded && (
                  <div className="mt-2 flex items-center gap-1.5 text-[8px] text-[#e8c97e]/80">
                    <span className="w-2 h-2 rounded-full border border-[#e8c97e] border-t-transparent animate-spin" />
                    <span>Loading animation…</span>
                  </div>
                )}
              </div>

              {/* Footer motif */}
              <div className="w-full flex justify-between text-[#e8c97e]/40 text-[9px] pb-1">
                <span>✦</span>
                <span className="text-[8px] text-[#e8c97e]/50 tracking-wider">TAP OR HOVER</span>
                <span>✦</span>
              </div>
            </div>
          )}

          {/* THE ACTUAL CARD IFRAME (Mounted lazily on hover/tap) */}
          {shouldRenderIframe && iframeHtml && (
            <iframe
              key={htmlFilePath}
              srcDoc={iframeHtml}
              loading="lazy"
              title={`${templateName} animated preview`}
              onLoad={() => setIframeLoaded(true)}
              style={{
                width: '390px',
                height: '844px',
                border: 'none',
                transform: 'scale(0.382)',
                transformOrigin: 'top left',
                marginLeft: '-1px',
                marginTop: '-1px',
                pointerEvents: 'none',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          )}

          {/* Bottom home indicator bar */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '3px',
            background: 'rgba(255,255,255,0.25)',
            borderRadius: '2px',
            zIndex: 20,
          }}/>
        </div>

        {/* Phone right edge shadow for 3D depth */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '-5px',
          width: '5px',
          height: '275px',
          background: 'linear-gradient(180deg, #555, #333, #555)',
          borderRadius: '0 4px 4px 0',
        }}/>

        {/* Phone bottom edge shadow for 3D depth */}
        <div style={{
          position: 'absolute',
          bottom: '-5px',
          left: '8px',
          right: '5px',
          height: '5px',
          background: 'linear-gradient(90deg, #444, #222, #444)',
          borderRadius: '0 0 4px 4px',
        }}/>
      </div>

      {/* "Hover to animate" pill — shows when NOT hovered */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          background: 'rgba(0,0,0,0.65)',
          color: 'white',
          fontSize: '11px',
          padding: '5px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(232, 201, 126, 0.3)',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#4ade80',
            display: 'inline-block',
            animation: 'ping 1.5s ease-in-out infinite',
          }}/>
          Hover to animate
        </div>
      </div>

      {/* "Click to view full preview" pill — shows when hovered */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          background: 'rgba(0,0,0,0.75)',
          color: 'white',
          fontSize: '11px',
          padding: '5px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(232, 201, 126, 0.4)',
        }}>
          Click to view full preview ✨
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
