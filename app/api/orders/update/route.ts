import { NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { orderId, customization } = await req.json()

    if (!orderId || !customization) {
      return NextResponse.json(
        { error: 'Missing order ID or customization details' },
        { status: 400 }
      )
    }

    // 1. Verify user owns the order and it is within the 5-day window
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, created_at, user_id')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found or access denied' },
        { status: 404 }
      )
    }

    const createdDate = new Date(order.created_at)
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)

    if (createdDate < fiveDaysAgo) {
      return NextResponse.json(
        { error: 'Edit window (5 days) has expired for this card.' },
        { status: 403 }
      )
    }

    const adminSupabase = createAdminClient()

    // 2. Extract fields
    const {
      person1_name,
      person2_name,
      event_date,
      event_time,
      venue_name,
      venue_address,
      family_bride_father,
      family_bride_mother,
      family_groom_father,
      family_groom_mother,
      photo_urls,
      extra_message,
      ...restOfCustomization
    } = customization || {}

    // 3. Update customizations table
    const { error: customError } = await adminSupabase
      .from('customizations')
      .update({
        person1_name: person1_name || null,
        person2_name: person2_name || null,
        event_date: event_date || null,
        event_time: event_time || null,
        venue_name: venue_name || null,
        venue_address: venue_address || null,
        family_bride_father: family_bride_father || null,
        family_bride_mother: family_bride_mother || null,
        family_groom_father: family_groom_father || null,
        family_groom_mother: family_groom_mother || null,
        photo_urls: photo_urls || [],
        extra_message: extra_message || null,
        extra_fields: restOfCustomization || {},
      })
      .eq('order_id', orderId)

    if (customError) {
      throw new Error(customError.message || 'Failed to update customization')
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Order update api error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
