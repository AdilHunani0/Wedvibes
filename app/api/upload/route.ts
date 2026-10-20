import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { apiError } from '@/lib/api-error'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // @ts-ignore
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`

    const supabaseAdmin = createAdminClient()

    const { error } = await supabaseAdmin.storage
      .from('card-photos')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('card-photos')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: publicUrl })
  } catch (err: unknown) {
    return apiError('File upload', err, 500, 'Upload failed. Please try again.')
  }
}
