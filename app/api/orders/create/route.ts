import { NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { templateId, guestEmail, customization } = await req.json()

    if (!user && !guestEmail) {
      return NextResponse.json(
        { error: 'Authentication required or guest email must be provided' },
        { status: 400 }
      )
    }

    if (!templateId || !customization) {
      return NextResponse.json(
        { error: 'Missing template ID or customization details' },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()

    // Insert order (bypass RLS)
    const { data: order, error: orderError } = await adminSupabase
      .from('orders')
      .insert({
        user_id: user?.id || null,
        guest_email: guestEmail || null,
        template_id: templateId,
        status: 'pending', 
      })
      .select()
      .single()

    if (orderError || !order) {
      throw new Error(orderError?.message || 'Failed to create order record')
    }

    // Extract known fields to avoid polluting extra_fields with them
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

    // Insert customization (bypass RLS)
    const { error: customError } = await adminSupabase
      .from('customizations')
      .insert({
        order_id: order.id,
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

    if (customError) {
      // Rollback order creation
      await adminSupabase.from('orders').delete().eq('id', order.id)
      throw new Error(customError.message)
    }

    return NextResponse.json({ orderId: order.id })
  } catch (err: unknown) {
    console.error('Order creation api error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
