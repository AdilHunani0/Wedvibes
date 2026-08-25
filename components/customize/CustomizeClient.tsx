'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StepIndicator } from '@/components/customize/StepIndicator'
import { CustomizeForm } from '@/components/customize/CustomizeForm'
import { LivePreview } from '@/components/customize/LivePreview'
import { supabase } from '@/lib/supabase/client'
import type { Template, CustomizationFormData, RazorpayOptions, RazorpayResponse } from '@/lib/types'
import toast from 'react-hot-toast'
import { getSchemaForTemplate, generateInitialData } from '@/lib/template-schemas'
import { useAuth } from '@/hooks/useAuth'
import { useCredits } from '@/hooks/useCredits'

// ─── Razorpay script loader (idempotent) ──────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Razorpay) return resolve(true)

    const existing = document.querySelector('script[src*="checkout.razorpay"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function CustomizeClient({ 
  template, 
  initialData, 
  editOrderId 
}: { 
  template: Template
  initialData?: any
  editOrderId?: string
}) {
  const router = useRouter()

  const schema = getSchemaForTemplate(template.slug)
  const STEPS = schema.steps.map((s) => s.title)

  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { user, profile, loading: authLoading } = useAuth()
  const { credits, loading: creditsLoading, refetch: refetchCredits } = useCredits(user?.id)

  const storageKey = `wedvibe-draft-${template.slug}`
  const [formData, setFormData] = useState<CustomizationFormData>(() => {
    if (typeof window !== 'undefined' && !initialData) {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try { return { ...generateInitialData(schema), ...JSON.parse(saved) } as CustomizationFormData }
        catch { /* ignore */ }
      }
    }
    return { ...generateInitialData(schema), ...(initialData || {}) } as CustomizationFormData
  })

  // Save to localStorage when form changes
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialData) {
      localStorage.setItem(storageKey, JSON.stringify(formData))
    }
  }, [formData, storageKey, initialData])

  // ─── Generate card and redirect ───────────────────────────────────────────────
  const generateAndRedirect = useCallback(
    async (orderId: string, forceRegenerate = false) => {
      toast.loading('Generating your invitation card…', { id: 'generating' })
      try {
        const genResponse = await fetch('/api/cards/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, forceRegenerate }),
        })

        if (!genResponse.ok) {
          const genError = await genResponse.json().catch(() => ({}))
          throw new Error(genError.error || 'Failed to generate card')
        }

        const genData = await genResponse.json()
        toast.success('Your card is ready! 🎉', { id: 'generating' })
        window.location.href = `/card/${genData.cardUrl || orderId}?share=true`
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : 'Failed to generate card.', { id: 'generating' })
      }
    },
    [router]
  )

  // ─── Open Razorpay modal ───────────────────────────────────────────────────────
  const openRazorpayModal = useCallback(
    (orderId: string, rzpOrder: { id: string; amount: number; currency: string }, userEmail: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const options: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          name: 'WedVibe',
          description: `Premium Wedding Invite: ${template.name}`,
          order_id: rzpOrder.id,
          prefill: { email: userEmail, contact: '' },
          theme: { color: '#a0522d' },
          // Explicitly enable all payment methods so UPI & wallets appear
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },
          modal: {
            confirm_close: true,
            escape: false,
          },
          handler: async (res: RazorpayResponse) => {
            try {
              const verifyRes = await fetch('/api/orders/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId,
                  razorpayOrderId: res.razorpay_order_id,
                  razorpayPaymentId: res.razorpay_payment_id,
                  razorpaySignature: res.razorpay_signature,
                }),
              })

              if (!verifyRes.ok) {
                const verifyErr = await verifyRes.json().catch(() => ({}))
                throw new Error(verifyErr.error || 'Payment signature verification failed.')
              }

              resolve(res.razorpay_payment_id)
            } catch (err: unknown) {
              reject(err instanceof Error ? err : new Error('Payment verification failed.'))
            }
          },
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rzp = new (window as any).Razorpay(options)
        rzp.on('payment.failed', (res: { error: { description: string } }) => {
          reject(new Error(res.error?.description || 'Payment was unsuccessful. Please retry.'))
        })
        rzp.open()
      })
    },
    [template]
  )

  // ─── Pay with Credits handler ──────────────────────────────────────────────────
  const handlePayWithCredits = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      // Step A: Create order record + save customization
      toast.loading('Saving details & processing payment...', { id: 'credit-pay' })

      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          customization: formData,
        }),
      })

      const orderBody = await orderRes.json().catch(() => ({}))
      if (!orderRes.ok) {
        throw new Error(orderBody.error || 'Failed to create order')
      }

      const { orderId } = orderBody

      // Step B: Deduct credits and mark order as paid
      const payRes = await fetch('/api/orders/pay-with-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })

      const payBody = await payRes.json().catch(() => ({}))
      if (!payRes.ok) {
        throw new Error(payBody.error || 'Failed to process credit payment')
      }

      toast.success('Payment successful! 🪙', { id: 'credit-pay' })
      refetchCredits()

      // Step C: Generate card & redirect
      await generateAndRedirect(orderId)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      toast.dismiss('credit-pay')
      toast.error(msg, { duration: 6000 })
      setErrorMessage(msg)
    } finally {
      setSubmitting(false)
    }
  }

  // ─── Update existing card (Edit mode) ─────────────────────────────────────────
  const handleUpdate = async () => {
    if (!editOrderId) return
    setSubmitting(true)
    setErrorMessage(null)

    try {
      toast.loading('Saving changes...', { id: 'order-update' })

      const updateRes = await fetch('/api/orders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: editOrderId,
          customization: formData,
        }),
      })

      const updateBody = await updateRes.json().catch(() => ({}))

      if (!updateRes.ok) {
        throw new Error(updateBody.error || `Update failed (${updateRes.status})`)
      }

      toast.success('Changes saved successfully!', { id: 'order-update' })
      
      // Regenerate the card HTML
      await generateAndRedirect(editOrderId, true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong while updating.'
      console.error('[Update] handleUpdate error:', err)
      toast.dismiss('order-update')
      toast.error(msg, { duration: 6000 })
      setErrorMessage(msg)
    } finally {
      setSubmitting(false)
    }
  }

  // ─── Main submit handler (Razorpay) ───────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      // Step A: Collect guest email if not logged in
      console.log('[Pay] Step A: checking session')
      const { data: { user } } = await supabase.auth.getUser()
      let guestEmail = ''

      if (!user) {
        const emailInput = window.prompt('Please enter your email address to receive your invitation card:')
        if (!emailInput) {
          toast.error('Email is required to continue.')
          setSubmitting(false)
          return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
          toast.error('Please enter a valid email address.')
          setSubmitting(false)
          return
        }
        guestEmail = emailInput
      }

      // Step B: Create order record + save customization
      console.log('[Pay] Step B: creating order, templateId=', template.id)
      toast.loading('Saving your details…', { id: 'order-save' })

      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          guestEmail: guestEmail || undefined,
          customization: formData,
        }),
      })

      const orderBody = await orderRes.json().catch(() => ({}))
      console.log('[Pay] Step B result:', orderRes.status, orderBody)

      if (!orderRes.ok) {
        throw new Error(orderBody.error || `Order creation failed (${orderRes.status})`)
      }

      const { orderId } = orderBody
      toast.success('Details saved!', { id: 'order-save' })

      // Step C: Load Razorpay SDK
      console.log('[Pay] Step C: loading Razorpay script')
      const scriptLoaded = await loadRazorpayScript()
      console.log('[Pay] Step C: script loaded=', scriptLoaded)
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.')
      }

      // Step D: Create Razorpay order
      console.log('[Pay] Step D: creating Razorpay order for orderId=', orderId)
      toast.loading('Opening payment gateway…', { id: 'payment' })

      const rzpOrderRes = await fetch('/api/orders/create-razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })

      const rzpOrderBody = await rzpOrderRes.json().catch(() => ({}))
      console.log('[Pay] Step D result:', rzpOrderRes.status, rzpOrderBody)

      if (!rzpOrderRes.ok) {
        throw new Error(rzpOrderBody.error || `Payment init failed (${rzpOrderRes.status})`)
      }

      toast.dismiss('payment')
      const userEmail = user?.email || guestEmail || ''

      // Step E: Open Razorpay modal
      console.log('[Pay] Step E: opening Razorpay modal, amount=', rzpOrderBody.amount)
      await openRazorpayModal(orderId, rzpOrderBody, userEmail)
      toast.success('Payment successful! 💳')

      // Step F: Generate card & redirect
      console.log('[Pay] Step F: generating card')
      await generateAndRedirect(orderId)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      console.error('[Pay] handleSubmit error:', err)
      toast.dismiss()
      toast.error(msg, { duration: 6000 })
      setErrorMessage(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf5]">
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      {/* Persistent error banner */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
          <div className="bg-red-50 border border-red-300 text-red-800 text-sm px-4 py-3 rounded-xl flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div>
              <p className="font-semibold">Payment Error</p>
              <p className="text-xs mt-0.5">{errorMessage}</p>
              <p className="text-xs mt-1 text-red-600">Open browser DevTools (F12) → Console tab for more details.</p>
            </div>
            <button onClick={() => setErrorMessage(null)} className="ml-auto text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 h-full">
          <CustomizeForm
            template={template}
            formData={formData}
            setFormData={setFormData}
            schema={schema}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onSubmit={handleSubmit}
            onPayWithCredits={handlePayWithCredits}
            userRole={profile?.role}
            userCredits={credits}
            authLoading={authLoading || creditsLoading}
            submitting={submitting}
            isEditing={!!editOrderId}
            onUpdate={handleUpdate}
          />
        </div>

        {/* Right Column: Live Preview — loads lazily, doesn't block form */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <LivePreview templateSlug={template.slug} formData={formData} />
        </div>
      </div>
    </div>
  )
}
