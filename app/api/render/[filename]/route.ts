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
    let html = await data.text()

    // Clean up any legacy malformed Handlebars countdown string in generated card files
    if (html.includes('{{#if countdown_target}}') || html.includes('{{COUNTDOWN_TARGET}}')) {
      html = html
        .replace(/\{\{#if countdown_target\}\}(.*?)\{\{else\}\}(.*?)\{\{\/if\}\}/g, '$1')
        .replace(/\{\{COUNTDOWN_TARGET\}\}/g, '2026-11-21T17:30:00+05:30')
    }

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('[render] Error rendering card:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
