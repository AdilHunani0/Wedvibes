import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase/server'
import { sendOrderConfirmationEmail } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json()

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`)
    const generatedSignature = hmac.digest('hex')

    const isSignatureValid = generatedSignature === razorpaySignature

    if (!isSignatureValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    const supabaseAdmin = createAdminClient()

    // Get order info
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, template:templates(*), profile:profiles(*)')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error(orderError?.message || 'Order not found')
    }

    // Update order status to paid
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        payment_method: 'razorpay',
        amount_paid: order.template?.price || 0,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
      })
      .eq('id', order.id)

    if (updateError) {
      throw updateError
    }

    // Send confirmation email
    const recipientEmail = order.guest_email || order.profile?.email || ''
    const recipientName = order.profile?.full_name || 'Valued Customer'
    if (recipientEmail) {
      try {
        await sendOrderConfirmationEmail(
          recipientEmail,
          recipientName,
          order.template?.name || 'Wedding Card',
          order.template?.tier || 'Basic'
        )
      } catch (emailErr) {
        console.error('Failed to send order confirmation email:', emailErr)
      }
    }

    // Trigger card generation in the background (asynchronous fetch)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    fetch(`${appUrl}/api/cards/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: order.id }),
    }).catch((err) => console.error('Background card generation start failed:', err))

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Payment verification error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
