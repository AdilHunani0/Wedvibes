import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { CardViewer } from '@/components/card/CardViewer'
import { ShareBar } from '@/components/card/ShareBar'
import { format } from 'date-fns'
interface PageProps {
  params: Promise<{ cardUrl: string }>
  searchParams: Promise<{ share?: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { cardUrl } = await params
  const supabase = createAdminClient()

  // Try fetching by card_url first, fallback to id
  let { data: order } = await supabase
    .from('orders')
    .select('*, customization:customizations(*), template:templates(*)')
    .eq('card_url', cardUrl)
    .single()

  if (!order) {
    const { data: fallbackOrder } = await supabase
      .from('orders')
      .select('*, customization:customizations(*), template:templates(*)')
      .eq('id', cardUrl)
      .single()
    order = fallbackOrder
  }

  // Supabase one-to-many join returns an array — pick first element
  const customization = Array.isArray(order?.customization)
    ? order.customization[0]
    : order?.customization

  const extraFields = (customization?.extra_fields || {}) as Record<string, string>

  // Resolve names: standard fields → extra_fields → empty
  const cleanVal = (v: string | null | undefined) => (v && v !== 'null' && v !== 'undefined') ? v : ''
  const p1 = cleanVal(customization?.person1_name) || cleanVal(extraFields.groom_name)
  const p2 = cleanVal(customization?.person2_name) || cleanVal(extraFields.bride_name)
  const names = p1 && p2 ? `${p1} & ${p2}` : (p1 || p2 || null)

  const resolvedDate = customization?.event_date || extraFields.wedding_date || extraFields.scratch_date || ''
  const displayDate = resolvedDate
    ? new Date(resolvedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  const venue = cleanVal(customization?.venue_name) || cleanVal(extraFields.wedding_venue_name)

  const template = order?.template

  const ogTitle = names
    ? `${names}'s ${template?.category === 'wedding' ? 'Wedding' : template?.category === 'birthday' ? 'Birthday' : template?.category === 'engagement' ? 'Engagement' : template?.category || ''} Invitation`
    : `You're invited to a ${template?.category || 'Wedding'} Celebration!`

  const ogDescription = [
    displayDate ? `📅 ${displayDate}` : '',
    venue ? `📍 ${venue}` : '',
    'Tap to open our interactive invitation.',
  ].filter(Boolean).join('  ·  ') || 'Tap to open this beautiful interactive invitation.'

  // Use first uploaded photo for the WhatsApp preview image
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wedvibe.in'
  
  let rawOgImage = template?.preview_url || '/our-wedding-story-1.jpg'
  if (customization?.photo_urls && customization.photo_urls.length > 0) {
    // Use Supabase public URL directly for WhatsApp compatibility
    rawOgImage = customization.photo_urls[0]
  } else if (extraFields) {
    // Check extraFields for arrays (like couple_photos, gallery_photos)
    for (const key of Object.keys(extraFields)) {
      const val = extraFields[key]
      if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'string' && val[0].startsWith('http')) {
        rawOgImage = val[0]
        break
      }
    }
  }

  const ogImage = rawOgImage.startsWith('http') 
    ? rawOgImage 
    : `${appUrl}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`


  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: names ? `${names} Wedding Invitation` : 'Wedding Invitation',
      }],
      type: 'website',
      siteName: 'WedVibe',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    other: {
      // WhatsApp specifically reads these
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:secure_url': ogImage,
      'og:image:type': 'image/jpeg',
    }
  }
}

export default async function CardViewerPage({ params, searchParams }: PageProps) {
  const { cardUrl } = await params
  const { share } = await searchParams
  const supabase = createAdminClient()

  // Query order with customizations
  let { data: order } = await supabase
    .from('orders')
    .select('*, template:templates(*), customization:customizations(*)')
    .eq('card_url', cardUrl)
    .single()

  if (!order) {
    const { data: fallbackOrder } = await supabase
      .from('orders')
      .select('*, template:templates(*), customization:customizations(*)')
      .eq('id', cardUrl)
      .single()
    order = fallbackOrder
  }

  if (!order) {
    console.error(`[card] No order found for cardUrl: ${cardUrl}`)
    notFound()
  }

  // Auto-retrigger card generation if paid but not yet delivered
  if (order.status === 'paid') {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    try {
      fetch(`${appUrl}/api/cards/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      }).catch(() => {})
    } catch {}
  }

  // Show friendly status pages instead of hard 404
  if (order.status !== 'delivered') {
    const isFailed = order.status === 'failed'
    return (
      <div className="min-h-screen bg-[#2a1810] flex flex-col items-center justify-center text-[#e8c97e] px-6 text-center">
        <p className="text-5xl mb-4">{isFailed ? '⚠️' : '🌸'}</p>
        <h1 className="font-playfair text-2xl font-bold mb-2">
          {isFailed ? 'Card Generation Failed' : 'Your Invitation is Being Prepared'}
        </h1>
        <p className="text-sm text-[#a07060] max-w-xs leading-relaxed">
          {isFailed
            ? 'Something went wrong while creating this card. Please contact support or try purchasing again.'
            : 'This usually takes just a moment. Please refresh the page in a few seconds.'}
        </p>
        <p className="text-xs text-[#a07060]/60 mt-4 font-mono">
          Status: {order.status} · ID: {order.id.slice(0, 8)}
        </p>
      </div>
    )
  }

  const customizationData = Array.isArray(order.customization) ? order.customization[0] : order.customization
  const extraFields = (customizationData?.extra_fields || {}) as Record<string, string>

  // Resolve names: standard fields first, then fall back to template-specific extra_fields
  // This mirrors the exact logic in api/cards/generate/route.ts lines 80-81
  const resolvedPerson1 = customizationData?.person1_name || extraFields.groom_name || ''
  const resolvedPerson2 = customizationData?.person2_name || extraFields.bride_name || ''
  const resolvedDate = customizationData?.event_date || extraFields.wedding_date || extraFields.scratch_date || ''
  const resolvedTime = customizationData?.event_time || extraFields.wedding_time || ''
  const resolvedVenue = customizationData?.venue_name || extraFields.wedding_venue_name || ''
  const resolvedAddress = customizationData?.venue_address || extraFields.wedding_venue_address || ''

  // Sanitize — guard against literal string "null"
  const clean = (v: string) => (v && v !== 'null' && v !== 'undefined') ? v : ''

  return (
    <div className="relative min-h-screen bg-black">
      <CardViewer order={order} />
      <ShareBar
        cardUrl={order.card_url}
        person1Name={clean(resolvedPerson1)}
        person2Name={clean(resolvedPerson2)}
        eventDate={resolvedDate ? format(new Date(resolvedDate), 'dd MMMM yyyy') : ''}
        eventTime={clean(resolvedTime)}
        venueName={clean(resolvedVenue)}
        venueAddress={clean(resolvedAddress)}
        category={order.template?.category || 'wedding'}
        tier={order.template?.tier || 'Premium'}
        autoOpen={share === 'true'}
      />
    </div>
  )
}
