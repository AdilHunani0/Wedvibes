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

  // Allow 'generating' status — card may still be processing
  if (order.status !== 'delivered' && order.status !== 'generating') {
    console.error(`[card] Order ${order.id} has unexpected status: ${order.status}`)
    notFound()
  }

  // If still generating, show a friendly waiting page
  if (order.status === 'generating') {
    return (
      <div className="min-h-screen bg-[#2a1810] flex flex-col items-center justify-center text-[#e8c97e]">
        <p className="text-5xl animate-bounce mb-4">🌸</p>
        <h1 className="font-playfair text-2xl font-bold mb-2">Your Invitation is Being Created</h1>
        <p className="text-sm text-[#a07060] text-center max-w-xs">
          This usually takes just a moment. Please refresh the page shortly.
        </p>
      </div>
    )
  }

  return <CardViewer order={order} />
}
