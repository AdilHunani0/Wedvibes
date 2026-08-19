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

  const names = order?.customization
    ? `${order.customization.person1_name} & ${order.customization.person2_name}`
    : 'Wedding Invitation'

  const displayDate = order?.customization?.event_date 
    ? new Date(order.customization.event_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
    : ''
  
  const venue = order?.customization?.venue_name || 'our wedding venue'
  const description = `Join us on ${displayDate} at ${venue}. Click to open our interactive invitation.`
  
  // Use first photo uploaded, or default
  let ogImage = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600'
  if (order?.customization?.photo_urls && order.customization.photo_urls.length > 0) {
    ogImage = order.customization.photo_urls[0]
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

  if (!order || order.status !== 'delivered') {
    notFound()
  }

  return <CardViewer order={order} />
}
