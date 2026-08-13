'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { RazorpayButton } from '@/components/checkout/RazorpayButton'
import { CreditsPayment } from '@/components/checkout/CreditsPayment'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { supabase } from '@/lib/supabase/client'
import type { Order } from '@/lib/types'
import toast from 'react-hot-toast'

interface CheckoutPageProps {
  params: Promise<{ orderId: string }>
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { orderId } = use(params)
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('orders')
          .select('*, template:templates(*), customization:customizations(*)')
          .eq('id', orderId)
          .single()

        if (error || !data) {
          toast.error('Order details not found')
          router.push('/templates')
          return
        }

        setOrder(data)
        if (data.status === 'delivered' && data.card_url) {
          router.push(`/card/${data.card_url}`)
        }
      } catch (err) {
        console.error(err)
        toast.error('Failed to load order information')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  const handlePaymentSuccess = () => {
    setPaymentStatus('success')
    toast.success('Payment completed successfully! 🎉')
    
    // Redirect user to dashboard or check status loop
    let checks = 0
    const interval = setInterval(async () => {
      checks++
      const { data } = await supabase
        .from('orders')
        .select('status, card_url')
        .eq('id', orderId)
        .single()

      if (data?.status === 'delivered' && data.card_url) {
        clearInterval(interval)
        router.push(`/card/${data.card_url}`)
      }

      if (checks >= 10) {
        clearInterval(interval)
        toast.success('Your invitation is generating. Check My Cards dashboard!')
        router.push('/dashboard/cards')
      }
    }, 2000)
  }

  const handlePaymentFailure = (error: string) => {
    setPaymentStatus('failed')
    setErrorMessage(error)
    toast.error(`Payment failed: ${error}`)
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" className="text-[#a0522d]" />
        <p className="text-sm font-semibold text-[#6b3d2a]">Loading checkout session...</p>
      </div>
    )
  }

  if (!order) return null

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-[#e8c97e]/30 rounded-3xl shadow-xl text-center space-y-6">
        <span className="text-5xl animate-bounce inline-block">🌸</span>
        <h2 className="font-playfair text-2xl font-extrabold text-[#2a1810]">Payment Successful!</h2>
        <p className="text-sm text-[#6b3d2a] leading-relaxed">
          Your payment has been verified. We are generating your beautiful animated card and rendering it into our system. You will be redirected in moments.
        </p>
        <LoadingSpinner className="mx-auto text-[#a0522d]" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810] mb-2">Complete Your Purchase</h1>
        <p className="text-xs text-[#a07060]">Choose your preferred payment method below to complete the invitation card setup.</p>
      </div>

      {paymentStatus === 'failed' && errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl font-medium">
          Payment failed: {errorMessage}. Please try again or contact support.
        </div>
      )}

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary */}
        <div className="md:col-span-7">
          <OrderSummary order={order} />
        </div>

        {/* Right Column: Checkout triggers */}
        <div className="md:col-span-5 space-y-6">
          {/* Card/UPI Payment */}
          <div className="bg-white rounded-2xl border border-[#e8c97e]/20 p-6 shadow-xl space-y-4">
            <h4 className="font-semibold text-sm text-[#2a1810]">UPI / Card Payment</h4>
            <p className="text-xs text-[#a07060]">
              Pay securely via Razorpay using your Credit/Debit Card, UPI (Google Pay, PhonePe, Paytm), or NetBanking.
            </p>
            <RazorpayButton
              order={order}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          </div>

          {/* Planner Credits Option */}
          <CreditsPayment
            order={order}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
          />
        </div>
      </div>
    </div>
  )
}
