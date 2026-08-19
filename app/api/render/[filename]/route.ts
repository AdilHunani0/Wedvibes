import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Use Node.js runtime for Supabase admin client compatibility
export const runtime = 'nodejs'

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
      console.error('[render] File not found:', filename, error?.message)
      return new NextResponse('File not found', { status: 404 })
    }

    // Read the blob as text and return with explicit HTML content type
    // This MUST be text/html — Supabase CDN redirect does NOT work in iframes
    const html = await data.text()

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Cache aggressively — generated cards never change (new file per generation)
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('[render] Error rendering card:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
