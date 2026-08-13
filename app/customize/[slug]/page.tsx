import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { CustomizeClient } from '@/components/customize/CustomizeClient'

interface CustomizePageProps {
  params: Promise<{ slug: string }>
}

export default async function CustomizePage({ params }: CustomizePageProps) {
  const { slug } = await params

  // ── Fetch template on the SERVER — zero client-side loading delay ──
  const supabase = createAdminClient()
  const { data: template, error } = await supabase
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !template) {
    notFound()
  }

  return <CustomizeClient template={template} />
}
