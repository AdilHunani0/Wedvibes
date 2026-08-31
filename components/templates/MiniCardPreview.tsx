'use client';
import { useState, useRef, useEffect } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [iframeHtml, setIframeHtml] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch and prepare HTML to prevent 404s from unreplaced placeholders
  useEffect(() => {
    if (isVisible && !iframeHtml) {
      fetch(htmlFilePath)
        .then(res => res.text())
        .then(html => {
          let h = html;
          // Provide generic fallbacks for images so they don't 404
          const genericImg = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600';
          h = h.replace(/\{\{COUPLE_PHOTOS_\d+\}\}/g, genericImg);
          h = h.replace(/\{\{GALLERY_PHOTOS_\d+\}\}/g, genericImg);
          h = h.replace(/\{\{PHOTO_\d+\}\}/g, genericImg);
          h = h.replace(/\{\{BRIDE_FAMILY_PHOTO_1\}\}/g, genericImg);
          h = h.replace(/\{\{GROOM_FAMILY_PHOTO_1\}\}/g, genericImg);
          
          h = h.replace(/\{\{BRIDE_NAME\}\}/g, 'Bride');
          h = h.replace(/\{\{GROOM_NAME\}\}/g, 'Groom');
          
          // Strip logic blocks and remaining placeholders
          h = h.replace(/\{\{#if [^}]+\}\}([\s\S]*?)\{\{\/if\}\}/g, '');
          h = h.replace(/\{\{[^}]+\}\}/g, '');
          
          setIframeHtml(h);
        })
        .catch(err => console.error('MiniPreview fetch err:', err));
    }
  }, [isVisible, htmlFilePath, iframeHtml]);

  // Only load iframe when card scrolls into view — performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Category background colors
  const categoryBg: Record<string, string> = {
    wedding:     'linear-gradient(145deg, #fff0f5, #fce4ec)',
    birthday:    'linear-gradient(145deg, #f3e8ff, #ede9fe)',
    engagement:  'linear-gradient(145deg, #fef9ee, #fef3c7)',
    opening:     'linear-gradient(145deg, #f0fdf4, #dcfce7)',
    anniversary: 'linear-gradient(145deg, #eff6ff, #dbeafe)',
  };

  const bg = categoryBg[category] || 'linear-gradient(145deg, #f9fafb, #f3f4f6)';

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex items-center justify-center transition-all duration-300"
      style={{
        height: '300px',
        background: bg,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            background: '#000000',
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
              zIndex: 10,
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

          {/* Loading skeleton — shown while iframe loads */}
          {!iframeLoaded && isVisible && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
                backgroundSize: '200% 200%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.1)',
                borderTop: '2px solid rgba(255,255,255,0.4)',
                animation: 'spin 1s linear infinite',
              }}/>
            </div>
          )}

          {/* Not visible yet — dark placeholder */}
          {!isVisible && (
            <div
              className="absolute inset-0"
              style={{ background: '#1a1a1a' }}
            />
          )}

          {/* THE ACTUAL CARD IFRAME */}
          {isVisible && iframeHtml && (
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
                transition: 'opacity 0.3s ease',
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
            zIndex: 10,
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
          background: 'rgba(0,0,0,0.55)',
          color: 'white',
          fontSize: '11px',
          padding: '5px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          whiteSpace: 'nowrap',
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

      {/* "Click to interact" pill — shows when hovered */}
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
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          fontSize: '11px',
          padding: '5px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
        }}>
          Click to view full preview ✨
        </div>
      </div>

      {/* Add keyframe styles */}
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
