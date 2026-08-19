'use client';
import { useState, useEffect } from 'react';
import { WhatsAppShareModal } from './WhatsAppShareModal';

interface ShareBarProps {
  cardUrl: string;
  person1Name: string;
  person2Name?: string;
  eventDate: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;
  category: string;
  tier: string;
  autoOpen?: boolean;
  onAutoOpenClose?: () => void;
}

export function ShareBar(props: ShareBarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wedvibe.in';
  const fullCardUrl = `${appUrl}/card/${props.cardUrl}`;

  useEffect(() => {
    if (props.autoOpen) setModalOpen(true);
  }, [props.autoOpen]);

  const handleModalClose = () => {
    setModalOpen(false);
    if (props.onAutoOpenClose) props.onAutoOpenClose();
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(fullCardUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <>
      {/* Floating bar at bottom of card page */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(232,160,184,0.3)',
        padding: '12px 20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      }}>

        {/* WhatsApp share — primary */}
        <button
          onClick={() => setModalOpen(true)}
          style={{
            flex: 1,
            padding: '13px',
            background: '#25D366',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(37,211,102,0.2)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.543 4.122 1.49 5.892L.055 23.454a.5.5 0 0 0 .614.612l5.704-1.497A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.368l-.36-.214-3.724.977.994-3.63-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z"/>
          </svg>
          Share on WhatsApp
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          style={{
            padding: '13px 16px',
            background: linkCopied ? '#f0fdf4' : '#f5f5f5',
            color: linkCopied ? '#16a34a' : '#555',
            border: `1px solid ${linkCopied ? '#86efac' : '#e5e7eb'}`,
            borderRadius: '12px',
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}
        >
          {linkCopied ? '✓ Copied!' : '🔗 Copy link'}
        </button>

        {/* Create your own CTA — viral marketing */}
        <a
          href="https://wedvibe.in/templates"
          style={{
            padding: '13px 14px',
            background: '#2a1810',
            color: '#fdf8f4',
            borderRadius: '12px',
            fontSize: '12px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Create yours ✨
        </a>

      </div>

      {/* Share modal */}
      {modalOpen && (
        <WhatsAppShareModal
          {...props}
          isOpen={modalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
