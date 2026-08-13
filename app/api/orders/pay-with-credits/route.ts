import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { sendOrderConfirmationEmail } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { orderId } = await req.json()
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    // Get order and profile
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, template:templates(*)')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      throw new Error(orderError?.message || 'Order not found')
    }

    if (order.status !== 'pending') {
      return NextResponse.json({ error: 'Order is already processed' }, { status: 400 })
    }

    const creditCost = order.template?.credit_cost || 1

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      throw new Error('Profile not found')
    }

    if (profile.credits < creditCost) {
      return NextResponse.json({ error: 'Insufficient credits balance' }, { status: 400 })
    }

    // Perform credit updates
    const newCredits = profile.credits - creditCost

    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', user.id)

    if (profileUpdateError) throw profileUpdateError

    // Record credit transaction
    await supabase.from('credit_transactions').insert({
      user_id: user.id,
      type: 'use',
      credits_delta: -creditCost,
      order_id: order.id,
      description: `Used credits for template: ${order.template?.name || ''}`,
    })

    // Update order status to paid
    const { error: orderUpdateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_method: 'credits',
        amount_paid: 0,
      })
      .eq('id', order.id)

    if (orderUpdateError) throw orderUpdateError

    // Send confirmation email
    if (user.email) {
      try {
        await sendOrderConfirmationEmail(
          user.email,
          profile.full_name || 'Valued Partner',
          order.template?.name || 'Wedding Card',
          order.template?.tier || 'Basic'
        )
      } catch (emailErr) {
        console.error('Failed to send credit order confirmation email:', emailErr)
      }
    }

    // Trigger card generation in the background
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
