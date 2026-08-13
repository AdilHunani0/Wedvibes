'use client'

import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatDateShort } from '@/lib/utils'
import type { Profile } from '@/lib/types'
import toast from 'react-hot-toast'

interface ExtendedProfile extends Profile {
  email: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<ExtendedProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [grantingId, setGrantingId] = useState<string | null>(null)
  const [bonusAmount, setBonusAmount] = useState('5')
  const [bonusReason, setBonusReason] = useState('Bonus credits')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users')
        if (!res.ok) throw new Error('Failed to fetch admin users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load registered accounts')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const reloadUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (res.ok) setUsers(await res.json())
    } catch (e) {
      console.error(e)
    }
  }

  const handleGrantCredits = async (userId: string) => {
    if (!bonusAmount || isNaN(parseInt(bonusAmount))) {
      toast.error('Please enter a valid credit amount')
      return
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          creditsDelta: parseInt(bonusAmount),
          reason: bonusReason,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to grant credits')
      }

      toast.success('Bonus credits granted successfully!')
      setGrantingId(null)
      reloadUsers()
    } catch (err) {
      console.error(err)
      toast.error('Failed to grant credits.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="text-[#a0522d]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
          Manage System Accounts
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Monitor planner and customer credit balances, roles, and grant goodwill credits.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e8c97e]/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#fdf8f4] border-b border-[#e8c97e]/20 text-xs font-bold text-[#6b3d2a] uppercase tracking-wider">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Registered On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8c97e]/10 text-[#2a1810]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#fdf8f4]/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{u.full_name || 'Anonymous User'}</div>
                    <div className="text-xs text-[#a07060]">{u.email}</div>
                    {u.phone && <div className="text-[10px] text-[#a07060]">{u.phone}</div>}
                  </td>
                  <td className="px-6 py-4 capitalize text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                      u.role === 'planner'
                        ? 'bg-amber-50 text-amber-700 border border-amber-100'
                        : u.role === 'admin'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : 'bg-neutral-50 text-neutral-600 border border-neutral-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#a0522d]">
                    {u.credits} credit{u.credits !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {formatDateShort(u.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {grantingId === u.id ? (
                      <div className="flex items-center justify-end gap-2 bg-[#fdf8f4] p-3 rounded-xl border border-[#e8c97e]/40">
                        <div className="w-16">
                          <Input
                            type="number"
                            value={bonusAmount}
                            onChange={(e) => setBonusAmount(e.target.value)}
                            placeholder="Delta"
                            required
                          />
                        </div>
                        <div className="w-24">
                          <Input
                            type="text"
                            value={bonusReason}
                            onChange={(e) => setBonusReason(e.target.value)}
                            placeholder="Reason"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => handleGrantCredits(u.id)}
                          className="py-2 text-[10px]"
                        >
                          Grant
                        </Button>
                        <button
                          type="button"
                          onClick={() => setGrantingId(null)}
                          className="text-xs font-bold text-neutral-500 hover:text-neutral-700 ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setGrantingId(u.id)
                          setBonusAmount('5')
                          setBonusReason('Admin goodwill grant')
                        }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e8c97e]/60 text-[#a0522d] hover:bg-[#fdf8f4]/50 cursor-pointer"
                      >
                        Adjust Credits
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
