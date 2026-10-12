'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    // Safety fallback: never allow auth loading to hang indefinitely
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setLoading(false)
    }, 2500)

    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!isMounted) return
        setUser(user)

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          if (!isMounted) return
          setProfile(profile)
        }
      } catch (err) {
        console.error('Failed to fetch auth user:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return
        setUser(session?.user ?? null)
        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
            if (isMounted) setProfile(profile)
          } catch (err) {
            console.error('Failed to update profile on auth change:', err)
          }
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      isMounted = false
      clearTimeout(fallbackTimer)
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return { user, profile, loading, signOut }
}
