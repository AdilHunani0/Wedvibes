'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import type { Order } from '@/lib/types'

interface CreditsPaymentProps {
  order: Order
  onSuccess: () => void
  onFailure: (error: string) => void
}

export function CreditsPayment({ order, onSuccess, onFailure }: CreditsPaymentProps) {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(false)

  const creditCost = order.template?.credit_cost || 1
  const availableCredits = profile?.credits || 0
  const hasEnoughCredits = availableCredits >= creditCost

  const handlePayWithCredits = async () => {
    if (!user) return
    setLoading(true)
    try {
      const res = await fetch('/api/orders/pay-with-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to complete credit payment')
      }

      onSuccess()
    } catch (err: unknown) {
      console.error('Credit payment error:', err)
      onFailure(err instanceof Error ? err.message : 'Credit transaction failed.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-[#fdf8f4] border border-[#e8c97e]/20 rounded-xl p-4 text-center text-xs text-[#a07060]">
        Please <Link href="/auth/login" className="text-[#a0522d] font-semibold underline">log in</Link> to pay with planner credits.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e8c97e]/20 p-6 shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-sm text-[#2a1810]">Pay with Planner Credits</h4>
          <p className="text-xs text-[#a07060] mt-0.5">
            Your Balance: <span className="font-bold text-[#a0522d]">{availableCredits}</span> credit{availableCredits !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#6b3d2a] block">Cost</span>
          <span className="text-[#a0522d] font-extrabold text-lg">
            {creditCost} Credit{creditCost > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {hasEnoughCredits ? (
        <Button
          type="button"
          variant="secondary"
          onClick={handlePayWithCredits}
          loading={loading}
          disabled={loading}
          className="w-full justify-center py-3 border-[#a0522d]/40 text-[#a0522d] hover:bg-[#a0522d]/5 font-semibold text-sm"
        >
          Confirm Payment ({creditCost} Credit{creditCost > 1 ? 's' : ''})
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-lg">
            <strong>Insufficient credits!</strong> You need {creditCost - availableCredits} more credit{creditCost - availableCredits > 1 ? 's' : ''} to purchase this card.
          </div>
          <Link
            href="/dashboard/credits"
            className="block text-center text-xs font-semibold text-[#a0522d] hover:text-[#2a1810] underline"
          >
            Buy Credit Packages →
          </Link>
        </div>
      )}
    </div>
  )
}
