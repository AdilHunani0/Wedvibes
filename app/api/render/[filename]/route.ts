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

    // Replace empty floating photo placeholders (e.g. <div class="fp-ph">Family</div>) with actual image tags
    if (html.includes('class="fp-ph"') || html.includes('{{FLOAT_PHOTOS_')) {
      const extractedImages: string[] = []
      const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)
      for (const m of imgMatches) {
        if (m[1] && !m[1].includes('{{') && !m[1].includes('data:image')) {
          extractedImages.push(m[1])
        }
      }

      const photoPool = extractedImages.length > 0 ? extractedImages : [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
      ]

      let fIdx = 0
      html = html.replace(/<div class="fp-inner">\s*(<div class="fp-ph">.*?<\/div>|<img[^>]*src=["']\{\{FLOAT_PHOTOS_\d+\}\}["'][^>]*>)\s*<\/div>/gi, () => {
        const src = photoPool[fIdx % photoPool.length]
        fIdx++
        return `<div class="fp-inner"><img src="${src}" alt="Photo" style="width:100%;height:100%;object-fit:cover;"></div>`
      })

      // Also replace any leftover standalone {{FLOAT_PHOTOS_1..6}} tags in <img> elements
      for (let i = 1; i <= 6; i++) {
        const src = photoPool[(i - 1) % photoPool.length]
        html = html.replace(new RegExp(`\\{\\{FLOAT_PHOTOS_${i}\\}\\}`, 'g'), src)
      }
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
