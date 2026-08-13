import { NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const supabaseAdmin = createAdminClient()

    // Get order details with template
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, template:templates(*)')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error(orderError?.message || 'Order not found')
    }

    const price = order.template?.price || 0

    // Create Razorpay Order
    const rzpOrder = await razorpay.orders.create({
      amount: price,
      currency: 'INR',
      receipt: order.id,
      notes: {
        orderId: order.id,
      },
    })

    // Update order with razorpay_order_id
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        razorpay_order_id: rzpOrder.id,
      })
      .eq('id', order.id)

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      id: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
    })
  } catch (err: unknown) {
    console.error('Razorpay order creation api error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
