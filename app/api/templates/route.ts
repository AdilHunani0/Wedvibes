import { NextResponse } from 'next/server'
import { createAdminClient, createServerClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: unknown) {
    console.error('Fetch templates API error:', err)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabaseAdmin = createAdminClient()
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const action = formData.get('action')

      if (action === 'create') {
        const name = formData.get('name') as string
        const slug = formData.get('slug') as string
        const category = formData.get('category') as string
        const tier = formData.get('tier') as string
        const price = formData.get('price') as string
        const credit_cost = formData.get('credit_cost') as string
        const featuresStr = formData.get('features') as string
        const htmlFile = formData.get('html_file') as File | null

        if (!name || !slug || !category || !tier || !price || !credit_cost || !htmlFile) {
          return NextResponse.json({ error: 'Missing required fields or HTML file' }, { status: 400 })
        }

        // Save file to public/templates/
        const bytes = await htmlFile.arrayBuffer()
        // @ts-ignore
        const buffer = Buffer.from(bytes)
        
        // Always save as the slug for consistency
        const fileName = `${slug}.html`
        const uploadDir = path.join(process.cwd(), 'public', 'templates')
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }
        
        const filePath = path.join(uploadDir, fileName)
        await fs.promises.writeFile(filePath, buffer)
        
        const html_file_path = `/templates/${fileName}`
        const features = featuresStr ? featuresStr.split(',').map(f => f.trim()).filter(f => f.length > 0) : []

        const { data, error } = await supabaseAdmin
          .from('templates')
          .insert([{
            name, slug, category, tier,
            price: Number(price),
            credit_cost: Number(credit_cost),
            html_file_path,
            features,
            is_active: true
          }])
          .select()
          .single()

        if (error) throw error
        return NextResponse.json(data)
      }
    } else {
      // JSON body (e.g. for toggle active)
      const body = await req.json()
      const { templateId, isActive } = body

      if (!templateId) {
        return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
      }

      const { data, error } = await supabaseAdmin
        .from('templates')
        .update({ is_active: isActive })
        .eq('id', templateId)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  } catch (err: unknown) {
    console.error('Update template API error:', err)
    return NextResponse.json({ error: 'Failed to process template request' }, { status: 500 })
  }
}
