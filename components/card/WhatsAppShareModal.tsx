'use client';
import { useState } from 'react';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardUrl: string;          // e.g. "pq7r2x"
  person1Name: string;      // e.g. "Priya"
  person2Name?: string;     // e.g. "Arjun" (optional for birthday/opening)
  eventDate: string;        // e.g. "15 February 2026"
  eventTime?: string;       // e.g. "11:00 AM onwards"
  venueName?: string;       // e.g. "The Royal Garden Hall"
  venueAddress?: string;    // e.g. "Andheri West, Mumbai"
  category: string;         // "wedding" | "birthday" | "opening" | "engagement"
}

export function WhatsAppShareModal({
  isOpen,
  onClose,
  cardUrl,
  person1Name,
  person2Name,
  eventDate,
  eventTime,
  venueName,
  venueAddress,
  category,
}: WhatsAppShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wedvibe.in';
  const fullCardUrl = `${appUrl}/card/${cardUrl}`;

  // ═══════════════════════════════════════
  // CUTE MESSAGE TEMPLATES PER CATEGORY
  // ═══════════════════════════════════════

  const generateMessage = () => {
    const name1 = (person1Name && person1Name !== 'null') ? person1Name : 'The Couple';
    const name2 = (person2Name && person2Name !== 'null') ? person2Name : '';

    if (category === 'wedding') {
      return `❤️ *You are Invited!* ❤️

We joyfully invite you to celebrate the wedding of

*${name1} weds ${name2}*

🙏 We would be incomplete without your blessings

📅 ${eventDate}
${eventTime ? `🕐 ${eventTime}` : ''}
${venueName ? `📍 ${venueName}` : ''}
${venueAddress ? `    ${venueAddress}` : ''}

Open our animated wedding invitation 💐
👇
${fullCardUrl}

Come, celebrate love with us! 🎉`;
    }

    if (category === 'engagement') {
      return `❤️ *We Said Yes!* ❤️

With hearts full of happiness, we invite you to celebrate our engagement!

*${name1} & ${name2}*

📅 ${eventDate}
${eventTime ? `🕐 ${eventTime}` : ''}
${venueName ? `📍 ${venueName}` : ''}

View our engagement invitation 💐
👇
${fullCardUrl}

Your presence makes it more special! 🎉`;
    }

    if (category === 'birthday') {
      return `🎉 *It's Party Time!* 🎉

*${name1}* is celebrating and YOU are invited!

📅 ${eventDate}
${eventTime ? `🕐 ${eventTime}` : ''}
${venueName ? `📍 ${venueName}` : ''}

View the invitation 🎂
👇
${fullCardUrl}

Get ready for a wonderful time! ❤️`;
    }

    if (category === 'opening') {
      return `🎉 *Grand Opening!* 🎉

You are invited to the grand opening of

*${name1}*

⭐ Come celebrate this new beginning with us!

📅 ${eventDate}
${eventTime ? `🕐 ${eventTime}` : ''}
${venueName ? `📍 ${venueName}` : ''}

View our invitation 👇
${fullCardUrl}

Your presence means everything! 🙏`;
    }

    // Default fallback
    return `❤️ *You are Invited!* ❤️

*${name1}${name2 ? ` & ${name2}` : ''}*

📅 ${eventDate}
${eventTime ? `🕐 ${eventTime}` : ''}
${venueName ? `📍 ${venueName}` : ''}

View our animated invitation:
${fullCardUrl}

We hope to see you there! 🎉`;
  };

  const [message, setMessage] = useState(generateMessage);

  const handleWhatsAppShare = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(fullCardUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const handleReset = () => {
    setMessage(generateMessage());
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>

        {/* HEADER */}
        <div style={{
          background: 'linear-gradient(135deg, #2a0d18, #4a1525)',
          padding: '24px 24px 20px',
          position: 'relative',
          textAlign: 'center',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          {/* Animated heart/icon */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(249,184,204,0.2)',
            border: '1px solid rgba(240,160,180,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '24px',
          }}>
            {category === 'wedding' ? '💌' :
             category === 'birthday' ? '🎂' :
             category === 'engagement' ? '💍' :
             category === 'opening' ? '🎊' : '💌'}
          </div>

          <h2 style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 4px',
            fontFamily: 'Georgia, serif',
          }}>
            Your card is ready! 🎉
          </h2>
          <p style={{
            color: 'rgba(249,184,204,0.8)',
            fontSize: '13px',
            margin: 0,
          }}>
            Share this beautiful invitation with your guests
          </p>
        </div>

        {/* BODY */}
        <div style={{ padding: '20px 24px 24px' }}>

          {/* Message label + reset */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Your WhatsApp message
            </span>
            <button
              onClick={handleReset}
              style={{
                fontSize: '11px',
                color: '#a0522d',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 6px',
              }}
            >
              Reset to default
            </button>
          </div>

          {/* Editable message textarea */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '13px',
                lineHeight: '1.7',
                border: '1px solid #e8a0b8',
                borderRadius: '12px',
                background: '#fff9fb',
                color: '#2a1810',
                resize: 'none',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {/* Character feel — show it's editable */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '10px',
              fontSize: '10px',
              color: '#ccc',
            }}>
              tap to edit
            </div>
          </div>
          <p style={{ fontSize: '11px', color: '#aaa', marginTop: '6px', marginBottom: '4px' }}>
            *text* = bold in WhatsApp · _text_ = italic
          </p>

          {/* Card URL preview */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f5f5f5',
            borderRadius: '8px',
            padding: '8px 12px',
            marginTop: '10px',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '12px', color: '#888', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              🔗 {fullCardUrl}
            </span>
            <button
              onClick={handleCopyLink}
              style={{
                fontSize: '11px',
                background: linkCopied ? '#22c55e' : '#2a1810',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
            >
              {linkCopied ? 'Copied!' : 'Copy link'}
            </button>
          </div>

          {/* PRIMARY: WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            style={{
              width: '100%',
              padding: '15px',
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '10px',
              transition: 'transform 0.1s, background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#128C7E'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.543 4.122 1.49 5.892L.055 23.454a.5.5 0 0 0 .614.612l5.704-1.497A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.368l-.36-.214-3.724.977.994-3.63-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z"/>
            </svg>
            Share on WhatsApp
          </button>

          {/* SECONDARY actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={handleCopyMessage}
              style={{
                padding: '11px',
                background: copied ? '#f0fdf4' : '#f9f9f9',
                color: copied ? '#16a34a' : '#555',
                border: `1px solid ${copied ? '#86efac' : '#e5e7eb'}`,
                borderRadius: '10px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy message'}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${person1Name}${person2Name ? ` & ${person2Name}` : ''}'s Invitation`,
                    text: message,
                    url: fullCardUrl,
                  });
                } else {
                  handleCopyLink();
                }
              }}
              style={{
                padding: '11px',
                background: '#f9f9f9',
                color: '#555',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              📤 More options
            </button>
          </div>

          {/* WedVibe branding note */}
          <p style={{
            textAlign: 'center',
            fontSize: '11px',
            color: '#bbb',
            marginTop: '14px',
            marginBottom: 0,
          }}>
            Made with love on wedvibe.in 💌
          </p>

        </div>
      </div>
    </div>
  );
}
