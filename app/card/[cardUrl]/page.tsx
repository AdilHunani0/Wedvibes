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

  // Sanitize names — guard against null/undefined coming through as the string "null"
  const p1 = customization?.person1_name && customization.person1_name !== 'null' ? customization.person1_name : ''
  const p2 = customization?.person2_name && customization.person2_name !== 'null' ? customization.person2_name : ''
  const names = p1 && p2 ? `${p1} & ${p2}` : (p1 || p2 || null)

  const displayDate = customization?.event_date
    ? new Date(customization.event_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  const venue = customization?.venue_name || ''

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

  return (
    <div className="relative min-h-screen bg-black">
      <CardViewer order={order} />
      <ShareBar
        cardUrl={order.card_url}
        person1Name={customizationData?.person1_name && customizationData.person1_name !== 'null' ? customizationData.person1_name : ''}
        person2Name={customizationData?.person2_name && customizationData.person2_name !== 'null' ? customizationData.person2_name : ''}
        eventDate={customizationData?.event_date ? format(new Date(customizationData.event_date), 'dd MMMM yyyy') : ''}
        eventTime={customizationData?.event_time && customizationData.event_time !== 'null' ? customizationData.event_time : ''}
        venueName={customizationData?.venue_name && customizationData.venue_name !== 'null' ? customizationData.venue_name : ''}
        venueAddress={customizationData?.venue_address && customizationData.venue_address !== 'null' ? customizationData.venue_address : ''}
        category={order.template?.category || 'wedding'}
        tier={order.template?.tier || 'Premium'}
        autoOpen={share === 'true'}
      />
    </div>
  )
}
