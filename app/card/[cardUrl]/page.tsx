import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { CardViewer } from '@/components/card/CardViewer'

interface PageProps {
  params: Promise<{ cardUrl: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { cardUrl } = await params
  const supabase = createAdminClient()

  // Try fetching by card_url first, fallback to id
  let { data: order } = await supabase
    .from('orders')
    .select('*, customization:customizations(*)')
    .eq('card_url', cardUrl)
    .single()

  if (!order) {
    const { data: fallbackOrder } = await supabase
      .from('orders')
      .select('*, customization:customizations(*)')
      .eq('id', cardUrl)
      .single()
    order = fallbackOrder
  }

  // Supabase one-to-many join returns an array — pick first element
  const customization = Array.isArray(order?.customization)
    ? order.customization[0]
    : order?.customization

  const names = customization
    ? `${customization.person1_name} & ${customization.person2_name}`
    : 'Wedding Invitation'

  const displayDate = customization?.event_date
    ? new Date(customization.event_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  const venue = customization?.venue_name || 'our wedding venue'
  const description = displayDate
    ? `Join us on ${displayDate} at ${venue}. Click to open our interactive invitation.`
    : `${names} joyfully invite you to celebrate their special day at ${venue}.`

  // Use first photo uploaded, or default
  let ogImage = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600'
  if (customization?.photo_urls && customization.photo_urls.length > 0) {
    ogImage = customization.photo_urls[0]
  }

  return {
    title: `You're invited to the wedding of ${names}!`,
    description,
    openGraph: {
      title: `You're invited to the wedding of ${names}!`,
      description,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `You're invited to the wedding of ${names}!`,
      description,
      images: [ogImage],
    }
  }
}

export default async function CardViewerPage({ params }: PageProps) {
  const { cardUrl } = await params
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

  return <CardViewer order={order} />
}
