import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, role, phone, full_name } = body

    if (!id || !role || !full_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (role !== 'customer' && role !== 'planner') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const supabase = await createServerClient()
    
    // Use service role to bypass RLS since the user might not have an active session yet
    // (e.g. if email confirmation is required, they can't update their own profile)
    
    // We import createClient directly to use the service role key
    const { createClient } = await import('@supabase/supabase-js')
    const serviceRoleClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await serviceRoleClient
      .from('profiles')
      .update({
        role,
        phone: phone || null,
        full_name
      })
      .eq('id', id)

    if (error) {
      console.error('Failed to sync profile via service role:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Profile sync error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
