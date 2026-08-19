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
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#e8a0b8]/30 p-3 sm:p-4 flex gap-2 sm:gap-3 items-center z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">

        {/* WhatsApp share — primary */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 py-2.5 sm:py-3 bg-[#25D366] text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_2px_4px_rgba(37,211,102,0.2)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="sm:w-[18px] sm:h-[18px]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.543 4.122 1.49 5.892L.055 23.454a.5.5 0 0 0 .614.612l5.704-1.497A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.368l-.36-.214-3.724.977.994-3.63-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z"/>
          </svg>
          <span className="hidden sm:inline">Share on WhatsApp</span>
          <span className="sm:hidden">Share</span>
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs cursor-pointer whitespace-nowrap transition-colors border ${
            linkCopied ? 'bg-green-50 text-green-600 border-green-300' : 'bg-gray-50 text-gray-600 border-gray-200'
          }`}
        >
          {linkCopied ? '✓ Copied!' : '🔗 Copy link'}
        </button>

        {/* Create your own CTA — viral marketing */}
        <a
          href="https://wedvibe.in/templates"
          className="py-2.5 sm:py-3 px-3 sm:px-4 bg-[#2a1810] text-[#fdf8f4] rounded-xl text-[11px] sm:text-xs no-underline whitespace-nowrap flex items-center gap-1"
        >
          <span className="hidden sm:inline">Create yours</span> ✨
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
