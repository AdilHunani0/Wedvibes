import { NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { createServerClient } from '@/lib/supabase/server'

const CREDIT_PLANS = {
  starter: { price: 299900, credits: 24 },
  growth: { price: 499900, credits: 42 },
  agency: { price: 699900, credits: 60 },
}

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { planId } = await req.json()
    const plan = CREDIT_PLANS[planId as keyof typeof CREDIT_PLANS]

    if (!plan) {
      return NextResponse.json({ error: 'Invalid credit plan selection' }, { status: 400 })
    }

    // Create Razorpay Order for Credits
    const rzpOrder = await razorpay.orders.create({
      amount: plan.price,
      currency: 'INR',
      notes: {
        userId: user.id,
        planId,
        creditsGranted: plan.credits.toString(),
      },
    })

    return NextResponse.json({
      id: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
    })
  } catch (err: unknown) {
    console.error('Credit purchase initialization error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
