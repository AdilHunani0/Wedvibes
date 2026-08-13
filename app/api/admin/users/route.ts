import { NextResponse } from 'next/server'
import { createAdminClient, createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabaseAdmin = createAdminClient()

    // Fetch user profiles along with email from auth metadata
    // In Supabase, standard client cannot read auth.users table, so we use admin client to read profiles.
    // To get emails, we can fetch all auth users and merge, or just read standard profiles
    // and rely on profile name/details. To keep it simple, we query profiles.
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Fetch emails from auth.users using admin client helper
    const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    if (authError) throw authError

    const emailMap = new Map(users.map(u => [u.id, u.email]))

    const profilesWithEmail = data.map(p => ({
      ...p,
      email: emailMap.get(p.id) || 'Unknown Email',
    }))

    return NextResponse.json(profilesWithEmail)
  } catch (err: unknown) {
    console.error('Fetch admin users error:', err)
    return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 })
  }
}

// POST: Add bonus credits to a user
export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userId, creditsDelta, reason } = await req.json()

    if (!userId || !creditsDelta) {
      return NextResponse.json({ error: 'User ID and credit delta required' }, { status: 400 })
    }

    const supabaseAdmin = createAdminClient()

    // Get current balance
    const { data: targetProfile, error: getErr } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single()

    if (getErr || !targetProfile) throw new Error('Target profile not found')

    const newCredits = targetProfile.credits + parseInt(creditsDelta)

    // Update profiles
    const { error: updateErr } = await supabaseAdmin
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', userId)

    if (updateErr) throw updateErr

    // Log transaction
    await supabaseAdmin.from('credit_transactions').insert({
      user_id: userId,
      type: 'bonus',
      credits_delta: parseInt(creditsDelta),
      description: reason || `Granted ${creditsDelta} bonus credits by Admin`,
    })

    return NextResponse.json({ success: true, newCredits })
  } catch (err: unknown) {
    console.error('Grant bonus credits API error:', err)
    return NextResponse.json({ error: 'Failed to grant bonus credits' }, { status: 500 })
  }
}
