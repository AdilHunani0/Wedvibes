'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role')
  const initialRole = roleParam === 'planner' ? 'planner' : 'customer'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState(initialRole)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        try {
          await fetch('/api/auth/sync-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.user.id,
              role: role,
              phone: phone || null,
              full_name: fullName,
            }),
          })
        } catch (syncError) {
          console.warn('Profile sync warning:', syncError)
        }

        if (data.session) {
          toast.success('Account created successfully! Welcome 🌸')
          router.push('/dashboard')
          router.refresh()
        } else {
          toast.success('Registration successful. Please check your email to verify your account!')
          setEmail('')
          setPassword('')
          setFullName('')
          setPhone('')
        }
      } else {
        toast.error('Registration failed. Please try again.')
      }
    } catch (err: unknown) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : 'Failed to register.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-[#e8c97e]/30 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="font-playfair text-2xl font-extrabold text-[#2a1810]">Create Account</h2>
        <p className="text-xs text-[#a07060]">Get started with India&apos;s best dynamic digital invitations.</p>
      </div>

      <GoogleButton />

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#e8c97e]/40"></div>
        <span className="text-[10px] text-[#a07060] font-bold uppercase tracking-widest">or sign up with email</span>
        <div className="flex-1 h-px bg-[#e8c97e]/40"></div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit number"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#2a1810]">Account Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${role === 'customer'
                  ? 'bg-[#2a1810] text-[#e8c97e] border-[#2a1810]'
                  : 'bg-white text-[#6b3d2a] border-[#e8c97e]/60 hover:border-[#c9a96e]'
                }`}
            >
              🙋 Customer
            </button>
            <button
              type="button"
              onClick={() => setRole('planner')}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${role === 'planner'
                  ? 'bg-[#2a1810] text-[#e8c97e] border-[#2a1810]'
                  : 'bg-white text-[#6b3d2a] border-[#e8c97e]/60 hover:border-[#c9a96e]'
                }`}
            >
              💼 Wedding Planner
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full justify-center py-3 bg-[#2a1810] text-[#e8c97e] font-semibold text-sm"
        >
          Sign Up
        </Button>
      </form>

      <div className="text-center text-xs text-[#a07060]">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[#a0522d] font-semibold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-xs text-[#a07060]">Loading signup...</div>}>
      <SignupForm />
    </Suspense>
  )
}
