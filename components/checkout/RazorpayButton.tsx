'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { Order, RazorpayOptions, RazorpayResponse } from '@/lib/types'

interface RazorpayButtonProps {
  order: Order
  onSuccess: (paymentId: string) => void
  onFailure: (error: string) => void
}

export function RazorpayButton({ order, onSuccess, onFailure }: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you offline?')
      }

      // 1. Initialize Razorpay Order via API
      const response = await fetch('/api/orders/create-razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create payment order')
      }

      const data = await response.json()

      // 2. Open Razorpay Checkout Modal
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: data.amount,
        currency: data.currency,
        name: 'WedVibe',
        description: `Premium Wedding Card: ${order.template?.name || ''}`,
        order_id: data.id,
        prefill: {
          email: order.guest_email || order.profile?.full_name || '',
          contact: order.profile?.phone || '',
        },
        theme: {
          color: '#2a1810',
        },
        handler: async (res: RazorpayResponse) => {
          setLoading(true)
          try {
            // Verify signature
            const verifyRes = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: order.id,
                razorpayOrderId: res.razorpay_order_id,
                razorpayPaymentId: res.razorpay_payment_id,
                razorpaySignature: res.razorpay_signature,
              }),
            })

            if (!verifyRes.ok) {
              const verifyErr = await verifyRes.json().catch(() => ({}))
              throw new Error(verifyErr.error || 'Signature verification failed')
            }

            onSuccess(res.razorpay_payment_id)
          } catch (err: unknown) {
            console.error('Verification failed:', err)
            onFailure(err instanceof Error ? err.message : 'Payment verification failed.')
          } finally {
            setLoading(false)
          }
        },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', function (res: { error: { description: string } }) {
        setLoading(false)
        onFailure(res.error.description || 'Payment failed')
      })
      rzp.open()
      // Note: do NOT setLoading(false) here — the modal is non-blocking.
      // Loading clears inside handler/failure callbacks above.
    } catch (err: unknown) {
      console.error('Payment initialization error:', err)
      setLoading(false)
      onFailure(err instanceof Error ? err.message : 'Failed to launch checkout.')
    }
  }

  return (
    <Button
      type="button"
      variant="primary"
      onClick={handlePayment}
      loading={loading}
      disabled={loading}
      className="w-full justify-center text-sm font-semibold tracking-wider uppercase py-3.5 bg-gradient-to-r from-[#2a1810] to-[#45271b] hover:from-[#45271b] hover:to-[#2a1810]"
    >
      Pay via UPI / Card 💳
    </Button>
  )
}
