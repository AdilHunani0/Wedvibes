import { notFound } from 'next/navigation'
import { createAdminClient, createServerClient } from '@/lib/supabase/server'
import { CustomizeClient } from '@/components/customize/CustomizeClient'

interface CustomizePageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CustomizePage({ params, searchParams }: CustomizePageProps) {
  const { slug } = await params
  const { editOrderId } = await searchParams

  // ── Fetch template on the SERVER — zero client-side loading delay ──
  const supabaseAdmin = createAdminClient()
  const { data: template, error } = await supabaseAdmin
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !template) {
    notFound()
  }

  let editOrderData = null
  let isEditValid = false

  if (editOrderId && typeof editOrderId === 'string') {
    const supabaseServer = await createServerClient()
    const { data: { user } } = await supabaseServer.auth.getUser()

    if (user) {
      const { data: order } = await supabaseServer
        .from('orders')
        .select('*, customization:customizations(*)')
        .eq('id', editOrderId)
        .eq('user_id', user.id)
        .single()
      
      if (order) {
        // Check 5-day window
        const createdDate = new Date(order.created_at)
        const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        
        if (createdDate > fiveDaysAgo) {
          // Supabase returns an array for one-to-many joins without .single() on the join
          editOrderData = Array.isArray(order.customization) ? order.customization[0] : order.customization
          
          // Re-flatten the extra_fields back into the main object for the form
          if (editOrderData && editOrderData.extra_fields) {
             editOrderData = { ...editOrderData, ...editOrderData.extra_fields }
          }
          isEditValid = true
        }
      }
    }
  }

  return (
    <CustomizeClient 
      template={template} 
      initialData={editOrderData} 
      editOrderId={isEditValid ? (editOrderId as string) : undefined} 
    />
  )
}
