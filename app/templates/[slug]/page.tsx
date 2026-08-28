import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { TIER_LABELS, PRICING_FEATURES } from '@/lib/constants'
import fs from 'fs/promises'
import path from 'path'
import { cache } from 'react'

const getTemplate = cache(async (slug: string) => {
  const supabase = createAdminClient()
  const { data: template } = await supabase
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return template
})

/**
 * Resolves {{#if KEY}}...{{else}}...{{/if}} and {{#if KEY}}...{{/if}} blocks
 * in the template HTML for the preview page.
 */
function resolveConditionalsWithElse(
  html: string,
  data: Record<string, string | boolean | string[]>
): string {
  function hasValue(key: string): boolean {
    const value = data[key.toLowerCase()] ?? data[key]
    return (
      value !== undefined &&
      value !== null &&
      value !== false &&
      value !== 'false' &&
      (Array.isArray(value) ? value.length > 0 : String(value).trim() !== '')
    )
  }

  let previous = ''
  let current = html
  let safety = 0

  while (current !== previous && safety < 30) {
    previous = current

    // IMPORTANT: Process no-else blocks FIRST.
    // The {{else}} regex is greedy across block boundaries when a {{#if}} has
    // no {{else}} of its own (e.g. ADD_MUSIC) but later blocks do. Running
    // no-else first removes those outer wrappers so they don't interfere.
    current = current.replace(
      /\{\{#if ([A-Za-z0-9_]+)\}\}((?:(?!\{\{#if|\{\{\/if\}\}|\{\{else\}\})[\s\S])*?)\{\{\/if\}\}/g,
      (_match, key, content) => (hasValue(key) ? content : '')
    )

    // Then handle {{#if KEY}}...{{else}}...{{/if}}
    current = current.replace(
      /\{\{#if ([A-Za-z0-9_]+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
      (_match, key, ifContent, elseContent) => (hasValue(key) ? ifContent : elseContent)
    )

    safety++
  }

  return current
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data: templates } = await supabase
    .from('templates')
    .select('slug')
    .eq('is_active', true)
  
  return templates?.map((t) => ({
    slug: t.slug,
  })) || []
}

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const template = await getTemplate(slug)

  if (!template) {
    return { title: 'Template Not Found | WedVibe' }
  }

  const priceText = template.price > 0 ? `Premium cards at ₹${template.price / 100}` : 'Free trial available'

  return {
    title: `${template.name} — Animated ${template.category || 'Wedding'} Invitation | WedVibe`,
    description: `Customise the ${template.name} animated invitation card. Share instantly via WhatsApp. ${priceText}.`,
  }
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params
  const template = await getTemplate(slug)

  if (!template) {
    notFound()
  }

  const features = PRICING_FEATURES[template.tier as keyof typeof PRICING_FEATURES] || template.features || []

  // Preview page logic: render template static iframe inside a mockup device
  let templateHtml = ''
  try {
    const publicPath = path.join(process.cwd(), 'public', 'templates', `${template.slug}.html`)
    templateHtml = await fs.readFile(publicPath, 'utf8')
    
    templateHtml = templateHtml.replace(/\{\{PERSON1_NAME\}\}/g, 'Groom')
    templateHtml = templateHtml.replace(/\{\{PERSON2_NAME\}\}/g, 'Bride')
    // Destination Beach additions
    templateHtml = templateHtml.replace(/\{\{GROOM_NAME\}\}/g, 'Kabir')
    templateHtml = templateHtml.replace(/\{\{BRIDE_NAME\}\}/g, 'Simran')
    templateHtml = templateHtml.replace(/\{\{COUPLE_TAGLINE\}\}/g, 'Two souls, one heart')
    templateHtml = templateHtml.replace(/\{\{WEDDING_DATE\}\}/g, '21 Nov')
    templateHtml = templateHtml.replace(/\{\{WEDDING_DATE_LABEL\}\}/g, 'Friday through Sunday · Goa')
    templateHtml = templateHtml.replace(/\{\{COUNTDOWN_TARGET\}\}/g, '2026-11-21T17:30:00+05:30')
    templateHtml = templateHtml.replace(/\{\{FOOTER_DATE\}\}/g, '20–22 · November · 2026 · Goa')

    // Royal Dark specific
    templateHtml = templateHtml.replace(/\{\{SCRATCH_DATE\}\}/g, '21 — 23 NOVEMBER 2026')
    templateHtml = templateHtml.replace(/\{\{SCRATCH_LOCATION\}\}/g, 'Friday through Sunday · Udaipur')
    
    // Haldi
    templateHtml = templateHtml.replace(/\{\{HALDI_DATE\}\}/g, '20th November 2026')
    templateHtml = templateHtml.replace(/\{\{HALDI_TIME\}\}/g, '10:00 AM onwards')
    templateHtml = templateHtml.replace(/\{\{HALDI_VENUE_NAME\}\}/g, 'Taj Exotica Resort & Spa')
    templateHtml = templateHtml.replace(/\{\{HALDI_VENUE_ADDRESS\}\}/g, 'Benaulim, Goa')
    templateHtml = templateHtml.replace(/\{\{HALDI_DRESS_CODE\}\}/g, 'Shades of yellow')

    // Wedding
    templateHtml = templateHtml.replace(/\{\{WEDDING_CEREMONY_DATE\}\}/g, '21st November 2026')
    templateHtml = templateHtml.replace(/\{\{WEDDING_CEREMONY_TIME\}\}/g, '4:00 PM – Sunset')
    templateHtml = templateHtml.replace(/\{\{WEDDING_VENUE_NAME\}\}/g, 'Taj Exotica Resort & Spa')
    templateHtml = templateHtml.replace(/\{\{WEDDING_VENUE_ADDRESS\}\}/g, 'Private Beachfront, Benaulim, Goa')
    templateHtml = templateHtml.replace(/\{\{WEDDING_MUHURAT_NOTE\}\}/g, 'Pheras at 5:30 PM')

    // Reception
    templateHtml = templateHtml.replace(/\{\{RECEPTION_DATE\}\}/g, '22nd November 2026')
    templateHtml = templateHtml.replace(/\{\{RECEPTION_TIME\}\}/g, '7:30 PM onwards')
    templateHtml = templateHtml.replace(/\{\{RECEPTION_VENUE_NAME\}\}/g, 'Taj Exotica Resort & Spa')
    templateHtml = templateHtml.replace(/\{\{RECEPTION_VENUE_ADDRESS\}\}/g, 'Grand Ballroom, Benaulim, Goa')
    templateHtml = templateHtml.replace(/\{\{RECEPTION_NOTE\}\}/g, 'Dinner, dance & celebrations')

    // Family
    templateHtml = templateHtml.replace(/\{\{BRIDE_FATHER_NAME\}\}/g, 'Mr. Devendra Singh')
    templateHtml = templateHtml.replace(/\{\{BRIDE_MOTHER_NAME\}\}/g, 'Mrs. Neha Singh')
    templateHtml = templateHtml.replace(/\{\{GROOM_FATHER_NAME\}\}/g, 'Mr. Rajesh Kapoor')
    templateHtml = templateHtml.replace(/\{\{GROOM_MOTHER_NAME\}\}/g, 'Mrs. Shalini Kapoor')

    // Gallery Captions
    templateHtml = templateHtml.replace(/\{\{GALLERY_CAPTION_1\}\}/g, 'Where it began')
    templateHtml = templateHtml.replace(/\{\{GALLERY_CAPTION_2\}\}/g, 'Sun-kissed')
    templateHtml = templateHtml.replace(/\{\{GALLERY_CAPTION_3\}\}/g, 'Toes in the sand')
    templateHtml = templateHtml.replace(/\{\{GALLERY_CAPTION_4\}\}/g, 'Golden hour')
    templateHtml = templateHtml.replace(/\{\{GALLERY_CAPTION_5\}\}/g, 'Just us, always')
    templateHtml = templateHtml.replace(/\{\{GALLERY_CAPTION_6\}\}/g, 'Forever begins here')

    // General replacements
    templateHtml = templateHtml.replace(/\{\{EVENT_DATE\}\}/g, 'Saturday, 12th December 2026')
    templateHtml = templateHtml.replace(/\{\{EVENT_TIME\}\}/g, '11:00 AM onwards')
    templateHtml = templateHtml.replace(/\{\{VENUE_NAME\}\}/g, 'Grand Palace Hall')
    templateHtml = templateHtml.replace(/\{\{VENUE_ADDRESS\}\}/g, 'Palace Road, Vasanth Nagar, Bengaluru, Karnataka')
    templateHtml = templateHtml.replace(/\{\{FAMILY_BRIDE_FATHER\}\}/g, 'Mr. Ramesh Sharma')
    templateHtml = templateHtml.replace(/\{\{FAMILY_BRIDE_MOTHER\}\}/g, 'Mrs. Savitha Sharma')
    templateHtml = templateHtml.replace(/\{\{FAMILY_GROOM_FATHER\}\}/g, 'Mr. Suresh Kumar')
    templateHtml = templateHtml.replace(/\{\{FAMILY_GROOM_MOTHER\}\}/g, 'Mrs. Sunitha Kumar')
    templateHtml = templateHtml.replace(/\{\{EXTRA_MESSAGE\}\}/g, 'Your presence is our biggest blessing.')
    
    const isBirthdayCard = slug === 'birthday-love-card'
    const isRoyalDark = slug === 'royal-dark-wedding'

    const fallbackPhotos = (slug === 'our-wedding-story' || isRoyalDark)
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

    // Birthday card specific placeholder replacements
    if (isBirthdayCard) {
      templateHtml = templateHtml.replace(/\{\{RECIPIENT_NAME\}\}/g, 'My Love')
      templateHtml = templateHtml.replace(/\{\{SENDER_NAME\}\}/g, 'Your Love')
      templateHtml = templateHtml.replace(/\{\{BIRTHDAY_DATE\}\}/g, 'August 3, 2025')
      templateHtml = templateHtml.replace(/\{\{HERO_EYEBROW\}\}/g, 'A little something for you')
      templateHtml = templateHtml.replace(/\{\{HERO_TAGLINE\}\}/g, 'To the one who makes my heart skip a beat — this day is as special as you are')
      templateHtml = templateHtml.replace(/\{\{LETTER_GREETING\}\}/g, 'My Dearest Love,')
      templateHtml = templateHtml.replace(/\{\{LETTER_BODY\}\}/g, 'On this day that gave the world you, I find myself overwhelmed with gratitude. You walked into my life and turned ordinary moments into extraordinary memories.')
      templateHtml = templateHtml.replace(/\{\{LETTER_SIGN\}\}/g, 'Forever yours, with all my love')
      templateHtml = templateHtml.replace(/\{\{REASON_1\}\}/g, 'The way your eyes light up when you talk about things you love')
      templateHtml = templateHtml.replace(/\{\{REASON_2\}\}/g, 'How you remember every tiny detail of things I\'ve long forgotten')
      templateHtml = templateHtml.replace(/\{\{REASON_3\}\}/g, 'Your hugs that make the whole world feel safe and warm again')
      templateHtml = templateHtml.replace(/\{\{REASON_4\}\}/g, 'Just... you. All of you. Every flaw, every perfection.')
      templateHtml = templateHtml.replace(/\{\{MEM1_CAPTION\}\}/g, 'The Day We Met')
      templateHtml = templateHtml.replace(/\{\{MEM1_DATE\}\}/g, 'Where it all began')
      templateHtml = templateHtml.replace(/\{\{MEM2_CAPTION\}\}/g, 'Our First Date')
      templateHtml = templateHtml.replace(/\{\{MEM2_DATE\}\}/g, 'Nervous laughs & stolen glances')
      templateHtml = templateHtml.replace(/\{\{MEM3_CAPTION\}\}/g, 'That Coffee Shop')
      templateHtml = templateHtml.replace(/\{\{MEM3_DATE\}\}/g, 'Our little corner of the world')
      templateHtml = templateHtml.replace(/\{\{MEM4_CAPTION\}\}/g, 'Our First Trip')
      templateHtml = templateHtml.replace(/\{\{MEM4_DATE\}\}/g, 'Getting lost & finding ourselves')
      templateHtml = templateHtml.replace(/\{\{MEM5_CAPTION\}\}/g, 'Sunset Together')
      templateHtml = templateHtml.replace(/\{\{MEM5_DATE\}\}/g, 'Golden hour with you')
      templateHtml = templateHtml.replace(/\{\{MEM6_CAPTION\}\}/g, 'Just Us, Always')
      templateHtml = templateHtml.replace(/\{\{MEM6_DATE\}\}/g, 'My favourite photo in the world')
      templateHtml = templateHtml.replace(/\{\{CANDLE_WISH\}\}/g, 'May this year bring you all the joy, laughter, and love you deserve...')
      templateHtml = templateHtml.replace(/\{\{PROMISE_ICON\}\}/g, '💍')
      templateHtml = templateHtml.replace(/\{\{PROMISE_TEXT\}\}/g, 'I promise to be there for every birthday, every adventure, every ordinary Tuesday.')
    }


    for (let i = 1; i <= 6; i++) {
      templateHtml = templateHtml.replace(new RegExp(`\\{\\{PHOTO_${i}\\}\\}`, 'g'), fallbackPhotos[i - 1])
      templateHtml = templateHtml.replace(new RegExp(`\\{\\{GALLERY_PHOTOS_${i}\\}\\}`, 'g'), fallbackPhotos[i - 1])
      if (i <= 3) {
        templateHtml = templateHtml.replace(new RegExp(`\\{\\{COUPLE_PHOTOS_${i}\\}\\}`, 'g'), fallbackPhotos[i - 1])
      }
      if (i <= 1) {
        templateHtml = templateHtml.replace(new RegExp(`\\{\\{BRIDE_FAMILY_PHOTO_${i}\\}\\}`, 'g'), fallbackPhotos[0])
        templateHtml = templateHtml.replace(new RegExp(`\\{\\{GROOM_FAMILY_PHOTO_${i}\\}\\}`, 'g'), fallbackPhotos[1])
      }
    }

    // Resolve all {{#if}}...{{else}}...{{/if}} and {{#if}}...{{/if}} blocks.
    // This is critical for templates that have Handlebars conditionals inside <script> tags
    // (e.g., ADD_MUSIC, countdown_target) which would break JS if left unresolved.
    const previewData: Record<string, string | boolean | string[]> = {
      add_music: true,
      couple_photos_0: fallbackPhotos[0],
      couple_photos_1: fallbackPhotos[1],
      couple_photos_2: fallbackPhotos[2],
      gallery_photos_0: fallbackPhotos[0],
      gallery_photos_1: fallbackPhotos[1],
      gallery_photos_2: fallbackPhotos[2],
      gallery_photos_3: fallbackPhotos[3],
      gallery_photos_4: fallbackPhotos[4],
      gallery_photos_5: fallbackPhotos[5],
      bride_family_photo_0: fallbackPhotos[0],
      groom_family_photo_0: fallbackPhotos[1],
      countdown_target: '2026-11-21T17:30:00+05:30',
    }
    templateHtml = resolveConditionalsWithElse(templateHtml, previewData)
  } catch (e) {
    console.error('Failed to load template html:', e)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Interactive Normal Preview */}
        <div className="flex justify-center items-center bg-[#fdf8f4]/60 border border-[#e8c97e]/20 rounded-3xl shadow-inner py-8 h-[80vh] min-h-[600px]">
          <div className="w-full max-w-[390px] h-full shadow-lg rounded-2xl overflow-hidden border border-neutral-200">
            {/* Content preview iframe */}
            <iframe
              srcDoc={templateHtml || undefined}
              src={templateHtml ? undefined : `/templates/${template.slug}.html`}
              className="w-full h-full border-none bg-white"
              title="Interactive Card Demo"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/templates"
              className="text-xs font-semibold text-[#a0522d] hover:text-[#2a1810] transition-colors"
            >
              ← Back to Gallery
            </Link>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="text-xs text-[#a07060] capitalize font-medium">{template.category}</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#2a1810]">
              {template.name}
            </h1>
            <div className="flex items-center gap-3">
              <Badge tier={template.tier}>
                {TIER_LABELS[template.tier as keyof typeof TIER_LABELS]} Tier
              </Badge>
              <span className="font-bold text-2xl text-[#a0522d]">
                {formatPrice(template.price)}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#6b3d2a] leading-relaxed">
            Craft a beautiful storytelling invitation. Our dynamic cards feature elegant music controls, automated animations, customizable guest details, and RSVP tracking.
          </p>

          <div className="border-t border-[#e8c97e]/20 pt-6 space-y-4">
            <h3 className="font-bold text-sm text-[#2a1810] uppercase tracking-wider">Features included:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6b3d2a]">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-[#e8c97e]/20 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/customize/${template.slug}`}
              id="detail-customize-cta"
              className="px-8 py-4 rounded-xl bg-[#2a1810] text-[#e8c97e] font-semibold text-center hover:bg-[#3d2218] transition-colors shadow-lg"
            >
              Customise this Card ✦
            </Link>
            <div className="flex items-center justify-center p-3 text-xs text-[#a07060] bg-[#fdf8f4] border border-[#e8c97e]/20 rounded-xl font-medium">
              🪙 Costs {template.credit_cost} Credit{template.credit_cost !== 1 ? 's' : ''} for planners
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
