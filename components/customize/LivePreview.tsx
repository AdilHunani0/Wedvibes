'use client'

import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { CustomizationFormData } from '@/lib/types'

interface LivePreviewProps {
  templateSlug: string
  formData: CustomizationFormData
}

function formatDate(dateStr: string | undefined, fallback: string): string {
  if (!dateStr) return fallback
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch { return fallback }
}

function applyPlaceholders(templateSlug: string, html: string, f: CustomizationFormData): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = f as any
  const bride = d.person2_name || d.bride_name || 'Bride'
  const groom = d.person1_name || d.groom_name || 'Groom'

  const wTime = d.event_time || d.wedding_time || '11:00 AM onwards'
  const venue = d.venue_name || d.wedding_venue_name || 'Grand Palace Hall'
  const addr  = d.venue_address || d.wedding_venue_address || 'Palace Road, Bengaluru'
  const msg   = d.extra_message || d.couple_tagline || 'Your presence is our biggest blessing.'

  const isBirthdayCard = templateSlug === 'birthday-love-card'
  const isRoyalDark = templateSlug === 'royal-dark-wedding'

  const FALLBACK_PHOTOS = (templateSlug === 'our-wedding-story' || isRoyalDark)
    ? [
        '/our-wedding-story-1.jpg',
        '/our-wedding-story-2.jpg',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
      ]
    : isBirthdayCard
    ? [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600',
        'https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=600',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600',
        'https://images.unsplash.com/photo-1502214651168-80321e897e44?q=80&w=600',
        'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
      ]
    : [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
      ]

  // Names
  html = html.replace(/\{\{BRIDE_NAME\}\}/g, bride)
  html = html.replace(/\{\{GROOM_NAME\}\}/g, groom)
  html = html.replace(/\{\{PERSON1_NAME\}\}/g, groom)
  html = html.replace(/\{\{PERSON2_NAME\}\}/g, bride)

  // Dates
  const fallbackDate = 'Saturday, 12 December 2026'
  const wDate = formatDate(d.event_date || d.wedding_date || d.end_date, fallbackDate)
  html = html.replace(/\{\{WEDDING_DATE\}\}/g, wDate)
  html = html.replace(/\{\{EVENT_DATE\}\}/g, wDate)
  try {
    const dayLabel = (d.event_date || d.wedding_date || d.end_date) 
      ? new Date(d.event_date || d.wedding_date || d.end_date).toLocaleDateString('en-IN', { weekday: 'long' }) 
      : 'Saturday'
    html = html.replace(/\{\{WEDDING_DATE_LABEL\}\}/g, dayLabel)
  } catch { html = html.replace(/\{\{WEDDING_DATE_LABEL\}\}/g, 'Saturday') }
  html = html.replace(/\{\{END_DATE\}\}/g, formatDate(d.end_date, wDate))
  html = html.replace(/\{\{WEDDING_CEREMONY_DATE\}\}/g, formatDate(d.wedding_ceremony_date || d.event_date, wDate))
  html = html.replace(/\{\{HALDI_DATE\}\}/g, formatDate(d.haldi_date, wDate))
  html = html.replace(/\{\{RECEPTION_DATE\}\}/g, formatDate(d.reception_date, wDate))
  html = html.replace(/\{\{NIKKAH_DATE\}\}/g, formatDate(d.nikkah_date || d.event_date, wDate))
  html = html.replace(/\{\{WALIMA_DATE\}\}/g, formatDate(d.walima_date, wDate))

  // Times
  html = html.replace(/\{\{WEDDING_TIME\}\}/g, wTime)
  html = html.replace(/\{\{EVENT_TIME\}\}/g, wTime)
  html = html.replace(/\{\{WEDDING_CEREMONY_TIME\}\}/g, d.wedding_ceremony_time || wTime)
  html = html.replace(/\{\{HALDI_TIME\}\}/g, d.haldi_time || '10:00 AM')
  html = html.replace(/\{\{RECEPTION_TIME\}\}/g, d.reception_time || '7:00 PM')
  html = html.replace(/\{\{NIKKAH_TIME\}\}/g, d.nikkah_time || wTime)
  html = html.replace(/\{\{WALIMA_TIME\}\}/g, d.walima_time || '7:00 PM')

  // Venues
  html = html.replace(/\{\{VENUE_NAME\}\}/g, venue)
  html = html.replace(/\{\{VENUE_ADDRESS\}\}/g, addr)
  html = html.replace(/\{\{WEDDING_VENUE_NAME\}\}/g, d.wedding_venue_name || venue)
  html = html.replace(/\{\{WEDDING_VENUE_ADDRESS\}\}/g, d.wedding_venue_address || addr)
  html = html.replace(/\{\{HALDI_VENUE_NAME\}\}/g, d.haldi_venue_name || venue)
  html = html.replace(/\{\{HALDI_VENUE_ADDRESS\}\}/g, d.haldi_venue_address || addr)
  html = html.replace(/\{\{RECEPTION_VENUE_NAME\}\}/g, d.reception_venue_name || venue)
  html = html.replace(/\{\{RECEPTION_VENUE_ADDRESS\}\}/g, d.reception_venue_address || addr)
  html = html.replace(/\{\{NIKKAH_VENUE_NAME\}\}/g, d.nikkah_venue_name || venue)
  html = html.replace(/\{\{NIKKAH_VENUE_ADDRESS\}\}/g, d.nikkah_venue_address || addr)
  html = html.replace(/\{\{WALIMA_VENUE_NAME\}\}/g, d.walima_venue_name || venue)

  // Extra / misc
  html = html.replace(/\{\{EXTRA_MESSAGE\}\}/g, msg)
  html = html.replace(/\{\{COUPLE_TAGLINE\}\}/g, d.couple_tagline || msg)
  html = html.replace(/\{\{WEDDING_MUHURAT_NOTE\}\}/g, d.wedding_muhurat_note || '')
  html = html.replace(/\{\{HALDI_DRESS_CODE\}\}/g, d.haldi_dress_code || 'Yellow / Pastels')
  html = html.replace(/\{\{RECEPTION_NOTE\}\}/g, d.reception_note || '')
  html = html.replace(/\{\{NIKKAH_NOTE\}\}/g, d.nikkah_note || '')
  html = html.replace(/\{\{WALIMA_NOTE\}\}/g, d.walima_note || '')
  html = html.replace(/\{\{MUSIC_URL\}\}/g, d.music_url || '')
  
  // Custom templates specific fields
  html = html.replace(/\{\{SCRATCH_DATE\}\}/g, formatDate(d.scratch_date, '21 November 2026'))
  html = html.replace(/\{\{SCRATCH_LOCATION\}\}/g, d.scratch_location || 'Friday through Sunday · Udaipur')
  const defaultCountdown = d.scratch_date ? `${d.scratch_date}T10:00:00` : (d.event_date ? `${d.event_date}T10:00:00` : '2026-11-21T17:30:00+05:30')
  html = html.replace(/\{\{COUNTDOWN_TARGET\}\}/g, d.countdown_target || defaultCountdown)
  html = html.replace(/\{\{FOOTER_DATE\}\}/g, d.footer_date || '20–22 · November · 2026 · Goa')
  if (d.wedding_date_label) {
    html = html.replace(/\{\{WEDDING_DATE_LABEL\}\}/g, d.wedding_date_label)
  }

  // Family
  html = html.replace(/\{\{FAMILY_BRIDE_FATHER\}\}/g, d.family_bride_father || 'Mr. Ramesh Sharma')
  html = html.replace(/\{\{FAMILY_BRIDE_MOTHER\}\}/g, d.family_bride_mother || 'Mrs. Savitha Sharma')
  html = html.replace(/\{\{FAMILY_GROOM_FATHER\}\}/g, d.family_groom_father || 'Mr. Suresh Kumar')
  html = html.replace(/\{\{FAMILY_GROOM_MOTHER\}\}/g, d.family_groom_mother || 'Mrs. Sunitha Kumar')
  html = html.replace(/\{\{BRIDE_FATHER_NAME\}\}/g, d.bride_father_name || d.family_bride_father || 'Mr. Ramesh Sharma')
  html = html.replace(/\{\{BRIDE_MOTHER_NAME\}\}/g, d.bride_mother_name || d.family_bride_mother || 'Mrs. Savitha Sharma')
  html = html.replace(/\{\{GROOM_FATHER_NAME\}\}/g, d.groom_father_name || d.family_groom_father || 'Mr. Suresh Kumar')
  html = html.replace(/\{\{GROOM_MOTHER_NAME\}\}/g, d.groom_mother_name || d.family_groom_mother || 'Mrs. Sunitha Kumar')

  // Photos & Captions
  const photos: string[] = (d.photo_urls && d.photo_urls.length > 0) ? d.photo_urls : (d.couple_photos || [])
  const galleryPhotos: string[] = (d.gallery_photos && d.gallery_photos.length > 0) ? d.gallery_photos : []
  for (let i = 1; i <= 6; i++) {
    const url = photos[i - 1] || FALLBACK_PHOTOS[(i - 1) % FALLBACK_PHOTOS.length]
    const galleryUrl = galleryPhotos[i - 1] || FALLBACK_PHOTOS[(i - 1) % FALLBACK_PHOTOS.length]
    html = html.replace(new RegExp(`\\{\\{COUPLE_PHOTOS_${i}\\}\\}`, 'g'), url)
    html = html.replace(new RegExp(`\\{\\{PHOTO_${i}\\}\\}`, 'g'), url)
    html = html.replace(new RegExp(`\\{\\{GALLERY_PHOTOS_${i}\\}\\}`, 'g'), galleryUrl)
    html = html.replace(new RegExp(`\\{\\{GALLERY_CAPTION_${i}\\}\\}`, 'g'), d[`gallery_caption_${i}`] || '')
  }

  const brideFamilyPhoto = (d.bride_family_photo && d.bride_family_photo[0]) || FALLBACK_PHOTOS[0]
  const groomFamilyPhoto = (d.groom_family_photo && d.groom_family_photo[0]) || FALLBACK_PHOTOS[1]
  html = html.replace(/\{\{BRIDE_FAMILY_PHOTO_1\}\}/g, brideFamilyPhoto)
  html = html.replace(/\{\{GROOM_FAMILY_PHOTO_1\}\}/g, groomFamilyPhoto)

  // Strip remaining {{#if}}...{{/if}} blocks — show the "if" content, drop "else" branch
  html = html.replace(/\{\{#if [^}]+\}\}([\s\S]*?)\{\{\/if\}\}/g, (_match, content: string) => {
    const elseIdx = content.indexOf('{{else}}')
    return elseIdx >= 0 ? content.slice(0, elseIdx) : content
  })

  // Strip any remaining raw {{PLACEHOLDER}} tokens
  html = html.replace(/\{\{[^}]+\}\}/g, '')

  return html
}

export function LivePreview({ templateSlug, formData }: LivePreviewProps) {
  const [templateHtml, setTemplateHtml] = useState<string | null>(null)
  const [previewHtml, setPreviewHtml]   = useState<string>('')
  const [loading, setLoading]           = useState(true)

  // Fetch template HTML once
  useEffect(() => {
    setLoading(true)
    setTemplateHtml(null)
    fetch(`/templates/${templateSlug}.html`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.text() })
      .then(html => setTemplateHtml(html))
      .catch(err => console.error('LivePreview: failed to load template', err))
      .finally(() => setLoading(false))
  }, [templateSlug])

  // Apply replacements with debounce
  useEffect(() => {
    if (!templateHtml) return
    const timer = setTimeout(() => {
      setPreviewHtml(applyPlaceholders(templateSlug, templateHtml, formData))
    }, 300)
    return () => clearTimeout(timer)
  }, [templateSlug, templateHtml, formData])

  return (
    <div className="flex flex-col h-full bg-[#f7efe8]/20 border border-[#e8c97e]/20 rounded-2xl overflow-hidden shadow-inner">
      {/* Top bar */}
      <div className="bg-white px-4 py-3 border-b border-[#e8c97e]/20 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-xs font-semibold text-[#6b3d2a]">Live Interactive Preview</span>
      </div>

      {/* Frame */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-[600px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 bg-[#f7efe8]/10 flex-1">
            <LoadingSpinner size="lg" className="text-[#a0522d]" />
            <p className="text-xs font-semibold text-[#6b3d2a]">Loading template layout...</p>
          </div>
        ) : (
          <div className="w-full flex-1 flex justify-center items-center bg-[#f7efe8]/10 py-6 px-4">
            {/* max-w-[390px] handles mobile while preventing squishing/overflow */}
            <div className="w-full max-w-[390px] h-[600px] shadow-lg rounded-2xl overflow-hidden border border-neutral-200">
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-none bg-white"
                title="Live Card Preview"
                sandbox="allow-scripts allow-same-origin"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
