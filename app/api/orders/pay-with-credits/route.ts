import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendOrderConfirmationEmail } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Missing order details' }, { status: 400 })
    }

    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabaseAdmin = createAdminClient()

    // 1. Get User Profile and verify role is planner
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      throw new Error(profileError?.message || 'Profile not found')
    }

    if (profile.role !== 'planner' && profile.role !== 'admin') {
      return NextResponse.json({ error: 'Only planners and admins can pay with credits' }, { status: 403 })
    }

    // 2. Get order info and template
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, template:templates(*)')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error(orderError?.message || 'Order not found')
    }

    // Prevent duplicate payment
    if (order.status === 'paid') {
      return NextResponse.json({ error: 'Order is already paid' }, { status: 400 })
    }

    const creditCost = order.template?.credit_cost || 0

    // 3. Verify enough credits
    if (profile.credits < creditCost) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 })
    }

    // 4. Deduct credits and log transaction
    const newCredits = profile.credits - creditCost

    const { error: profileUpdateError } = await supabaseAdmin
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', profile.id)

    if (profileUpdateError) throw profileUpdateError

    if (creditCost > 0) {
      const { error: txError } = await supabaseAdmin
        .from('credit_transactions')
        .insert({
          user_id: profile.id,
          type: 'use',
          credits_delta: -creditCost,
          order_id: orderId,
          description: `Card Generation (${order.template?.name})`
        })
      if (txError) throw txError
    }

    // 5. Update order status to paid
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        payment_method: 'credits',
        amount_paid: 0,
      })
      .eq('id', order.id)

    if (updateError) {
      throw updateError
    }

    // 6. Send confirmation email
    const recipientEmail = order.guest_email || profile.email || user.email || ''
    const recipientName = profile.full_name || 'Valued Planner'
    if (recipientEmail) {
      try {
        await sendOrderConfirmationEmail(
          recipientEmail,
          recipientName,
          order.template?.name || 'Wedding Card',
          order.template?.tier || 'Premium'
        )
      } catch (emailErr) {
        console.error('Failed to send order confirmation email:', emailErr)
      }
    }

    // 7. Trigger card generation in the background
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    fetch(`${appUrl}/api/cards/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: order.id }),
    }).catch((err) => console.error('Background card generation start failed:', err))

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Pay with credits error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
