'use client'

import { useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Show error toast if redirected back from callback with an error
  useEffect(() => {
    if (errorParam === 'verification_failed') {
      toast.error('Email verification link has expired. Please log in and request a new one.')
    } else if (errorParam === 'auth_failed') {
      toast.error('Authentication failed. Please try again.')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) throw error

      toast.success('Logged in successfully! 🌸')
      router.push(redirect)
      router.refresh()
    } catch (err: unknown) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-[#e8c97e]/30 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="font-playfair text-2xl font-extrabold text-[#2a1810]">Welcome Back</h2>
        <p className="text-xs text-[#a07060]">Access your invitations and planner dashboards.</p>
      </div>

      <GoogleButton />

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#e8c97e]/40"></div>
        <span className="text-[10px] text-[#a07060] font-bold uppercase tracking-widest">or continue with email</span>
        <div className="flex-1 h-px bg-[#e8c97e]/40"></div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full justify-center py-3 bg-[#2a1810] text-[#e8c97e] font-semibold text-sm"
        >
          Sign In
        </Button>
      </form>

      <div className="text-center text-xs text-[#a07060]">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-[#a0522d] font-semibold hover:underline">
          Sign up now
        </Link>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-xs text-[#a07060]">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  )
}
