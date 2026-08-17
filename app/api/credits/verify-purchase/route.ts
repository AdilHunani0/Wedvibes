import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient, createServerClient } from '@/lib/supabase/server'

const CREDIT_PLANS = {
  starter: { name: 'Starter', price: 299900, credits: 24 },
  growth: { name: 'Growth', price: 499900, credits: 42 },
  agency: { name: 'Agency', price: 699900, credits: 60 },
}

export async function POST(req: Request) {
  try {
    const { planId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json()

    if (!planId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment signature verification details' }, { status: 400 })
    }

    const plan = CREDIT_PLANS[planId as keyof typeof CREDIT_PLANS]
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 })
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`)
    const generatedSignature = hmac.digest('hex')

    const isSignatureValid = generatedSignature === razorpaySignature

    if (!isSignatureValid) {
      return NextResponse.json({ error: 'Invalid verification signature' }, { status: 400 })
    }

    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Auth session expired' }, { status: 401 })
    }

    const supabaseAdmin = createAdminClient()

    // 2. Fetch current profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('credits, full_name')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      throw new Error('User profile not found')
    }

    // 3. Add credits
    const finalCredits = profile.credits + plan.credits

    const { error: profileUpdateError } = await supabaseAdmin
      .from('profiles')
      .update({ credits: finalCredits })
      .eq('id', user.id)

    if (profileUpdateError) throw profileUpdateError

    // 4. Record credit transaction
    const { error: txError } = await supabaseAdmin.from('credit_transactions').insert({
      user_id: user.id,
      type: 'purchase',
      credits_delta: plan.credits,
      amount_paid: plan.price,
      description: `Purchased ${plan.name} Credits Pack via Razorpay`,
    })

    if (txError) throw txError

    // 5. Send receipt email
    if (user.email) {
      import('@/lib/resend').then(({ sendCreditPurchaseEmail }) => {
        sendCreditPurchaseEmail(
          user.email as string,
          profile.full_name || 'Planner',
          plan.name,
          plan.credits,
          plan.price
        ).catch(console.error)
      }).catch(console.error)
    }

    return NextResponse.json({ success: true, credits: finalCredits })
  } catch (err: unknown) {
    console.error('Credits verification error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
