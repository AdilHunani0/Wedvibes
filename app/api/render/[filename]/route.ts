import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params

  if (!filename) {
    return new NextResponse('File name is required', { status: 400 })
  }

  try {
    const supabaseAdmin = createAdminClient()

    // Download the file from the generated-cards bucket
    const { data, error } = await supabaseAdmin.storage
      .from('generated-cards')
      .download(filename)

    if (error || !data) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Set proper Content-Type for HTML rendering
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('Error rendering card:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
