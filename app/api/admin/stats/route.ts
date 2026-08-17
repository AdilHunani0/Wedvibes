import { NextResponse } from 'next/server'
import { createAdminClient, createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabaseAdmin = createAdminClient()

    // 1. Fetch total revenue (sum of amount_paid from all orders)
    const { data: revData } = await supabaseAdmin
      .from('orders')
      .select('amount_paid')
      .in('status', ['paid', 'generating', 'delivered'])

    const ordersRevenue = revData?.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0) || 0

    const { data: creditRevData } = await supabaseAdmin
      .from('credit_transactions')
      .select('amount_paid')
      .eq('type', 'purchase')

    const creditsRevenue = creditRevData?.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0) || 0
    const totalRevenue = ordersRevenue + creditsRevenue

    // 2. Fetch orders today
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    
    const { count: ordersToday } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfToday.toISOString())

    // 3. Fetch active users (total registered profiles)
    const { count: activeUsers } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // 4. Fetch credits sold
    const { data: txData } = await supabaseAdmin
      .from('credit_transactions')
      .select('credits_delta')
      .eq('type', 'purchase')

    const creditsSold = txData?.reduce((acc, curr) => acc + (curr.credits_delta || 0), 0) || 0

    // 5. Recent orders
    const { data: recentOrders } = await supabaseAdmin
      .from('orders')
      .select('*, template:templates(*), profile:profiles(*), customization:customizations(*)')
      .order('created_at', { ascending: false })
      .limit(10)

    // 6. Revenue by Day (last 7 days)
    const revenueByDay: { date: string; revenue: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
      
      const startOfDay = new Date(d)
      startOfDay.setHours(0,0,0,0)
      const endOfDay = new Date(d)
      endOfDay.setHours(23,59,59,999)

      const { data: dailyOrders } = await supabaseAdmin
        .from('orders')
        .select('amount_paid')
        .in('status', ['paid', 'generating', 'delivered'])
        .gte('created_at', startOfDay.toISOString())
        .lte('created_at', endOfDay.toISOString())

      const { data: dailyCredits } = await supabaseAdmin
        .from('credit_transactions')
        .select('amount_paid')
        .eq('type', 'purchase')
        .gte('created_at', startOfDay.toISOString())
        .lte('created_at', endOfDay.toISOString())

      const ordersDayRevenue = dailyOrders?.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0) || 0
      const creditsDayRevenue = dailyCredits?.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0) || 0
      const dayRevenue = ordersDayRevenue + creditsDayRevenue
      revenueByDay.push({ date: dateStr, revenue: dayRevenue })
    }

    // 7. Orders By Category
    const categories = ['wedding', 'engagement', 'anniversary']
    const ordersByCategory: { category: string; count: number }[] = []
    
    for (const cat of categories) {
      const { count } = await supabaseAdmin
        .from('orders')
        .select('*, templates!inner(*)', { count: 'exact', head: true })
        .eq('templates.category', cat)

      ordersByCategory.push({ category: cat, count: count || 0 })
    }

    // 8. Tier breakdown
    const tiers = ['basic', 'standard', 'premium']
    const tierBreakdown: { tier: string; count: number }[] = []
    
    for (const tier of tiers) {
      const { count } = await supabaseAdmin
        .from('orders')
        .select('*, templates!inner(*)', { count: 'exact', head: true })
        .eq('templates.tier', tier)

      tierBreakdown.push({ tier, count: count || 0 })
    }

    return NextResponse.json({
      totalRevenue,
      ordersToday: ordersToday || 0,
      activeUsers: activeUsers || 0,
      creditsSold,
      recentOrders: recentOrders || [],
      revenueByDay,
      ordersByCategory,
      tierBreakdown,
    })
  } catch (err: unknown) {
    console.error('Admin stats error:', err)
    return NextResponse.json({ error: 'Failed to compute admin stats' }, { status: 500 })
  }
}
