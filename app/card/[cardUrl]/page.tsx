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

  return {
    title: `${names} — Wedding Invitation | WedVibe`,
    description: `You are cordially invited to celebrate the wedding of ${names}. View invitation card.`,
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
