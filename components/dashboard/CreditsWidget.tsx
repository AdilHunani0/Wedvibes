'use client'

import { useState } from 'react'
import { formatPrice, formatDateShort } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useCredits } from '@/hooks/useCredits'
import type { RazorpayOptions, RazorpayResponse } from '@/lib/types'

const PLANS = [
  { id: 'starter', name: 'Starter', price: 299900, cards: 8, credits: 24, save: 1000, desc: 'Ideal for independent planners starting with digital invites.' },
  { id: 'growth', name: 'Growth', price: 499900, cards: 14, credits: 42, save: 2000, desc: 'Perfect for growing agencies with active monthly clients.' },
  { id: 'agency', name: 'Agency', price: 699900, cards: 20, credits: 60, save: 3000, desc: 'Best value for high-volume boutique event design firms.' },
]

export function CreditsWidget() {
  const { user, profile } = useAuth()
  const { credits, transactions, refetch } = useCredits(user?.id)
  const [buyingId, setBuyingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePurchase = async (planId: string) => {
    if (!user) return
    setBuyingId(planId)
    setError(null)

    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load.')
      }

      const res = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to initiate purchase')
      }

      const data = await res.json()

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: data.amount,
        currency: data.currency,
        name: 'WedVibe Credits',
        description: `Credits Pack purchase`,
        order_id: data.id,
        prefill: {
          email: user.email || '',
          contact: profile?.phone || '',
        },
        theme: {
          color: '#2a1810',
        },
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
        handler: async (paymentRes: RazorpayResponse) => {
          try {
            const verifyRes = await fetch('/api/credits/verify-purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                planId,
                razorpayOrderId: paymentRes.razorpay_order_id,
                razorpayPaymentId: paymentRes.razorpay_payment_id,
                razorpaySignature: paymentRes.razorpay_signature,
              }),
            })

            if (!verifyRes.ok) {
              throw new Error('Verification failed')
            }

            refetch()
          } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to verify transaction.')
          } finally {
            setBuyingId(null)
          }
        },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', (res: { error: { description: string } }) => {
        setBuyingId(null)
        setError(res.error.description || 'Payment failed. Please try again.')
      })
      rzp.open()
      // Note: do NOT setBuyingId(null) here — the modal is non-blocking.
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setBuyingId(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#2a1810] to-[#45271b] border border-[#e8c97e]/30 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#c9a96e] font-bold">Credits Balance</span>
          <h2 className="text-4xl font-extrabold text-[#e8c97e] mt-1 font-playfair">{credits} Credit{credits !== 1 ? 's' : ''}</h2>
          <p className="text-xs text-[#a07060] mt-1.5">Used to generate premium invitations instantly. Each premium card costs 3 credits.</p>
        </div>
        <div className="text-xs border border-[#e8c97e]/20 rounded-xl px-4 py-3 bg-white/5 backdrop-blur-md">
          <span className="font-bold text-[#c9a96e] block uppercase mb-1">Planner Perks</span>
          <span className="text-[#a07060]">✓ Mix and match categories</span>
          <span className="text-[#a07060] block mt-1">✓ Credits never expire</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Credit Plans */}
      <div>
        <h3 className="font-playfair text-xl font-bold text-[#2a1810] mb-4">Purchase Credits Packs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-[#e8c97e]/20 hover:border-[#c9a96e] rounded-2xl p-5 shadow-md flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base text-[#2a1810]">{plan.name} Pack</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ₹{plan.save.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-[#a07060] mb-4">{plan.desc}</p>
                <div className="text-2xl font-black text-[#a0522d] mb-4">
                  {formatPrice(plan.price)}
                </div>
                <ul className="space-y-1.5 text-xs text-[#6b3d2a] mb-6">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#c9a96e]">✓</span> <strong>{plan.cards} Premium Cards</strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#c9a96e]">✓</span> {plan.credits} Credits included
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#c9a96e]">✓</span> Save ₹{plan.save.toLocaleString('en-IN')} vs retail
                  </li>
                </ul>
              </div>
              <Button
                type="button"
                variant="primary"
                onClick={() => handlePurchase(plan.id)}
                loading={buyingId === plan.id}
                disabled={buyingId !== null}
                className="w-full justify-center text-xs font-semibold py-2.5 bg-[#2a1810] text-[#e8c97e]"
              >
                Purchase Pack
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="font-playfair text-xl font-bold text-[#2a1810] mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="bg-white border border-[#e8c97e]/20 rounded-xl p-8 text-center text-xs text-[#a07060]">
            No credit transaction history available.
          </div>
        ) : (
          <div className="bg-white border border-[#e8c97e]/20 rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#2a1810]">
                <thead>
                  <tr className="bg-[#fdf8f4] border-b border-[#e8c97e]/20 text-[#6b3d2a] font-bold uppercase tracking-wider">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3 text-right">Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8c97e]/10">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#fdf8f4]/20 transition-colors">
                      <td className="px-6 py-3.5 text-[#a07060]">{formatDateShort(tx.created_at)}</td>
                      <td className="px-6 py-3.5 font-medium">{tx.description || 'Credits Adjustment'}</td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          tx.type === 'purchase' || tx.type === 'bonus'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`px-6 py-3.5 text-right font-bold ${
                        tx.credits_delta > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {tx.credits_delta > 0 ? `+${tx.credits_delta}` : tx.credits_delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
