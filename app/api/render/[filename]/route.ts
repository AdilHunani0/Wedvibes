import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params

  if (!filename) {
    return new NextResponse('File name is required', { status: 400 })
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) throw new Error('Missing SUPABASE_URL')

    // Redirect to the public Supabase storage URL.
    // This is fast (no server download) AND the browser renders it correctly
    // because Supabase serves uploaded HTML files with Content-Type: text/html.
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/generated-cards/${filename}`

    return NextResponse.redirect(publicUrl, {
      status: 302,
      headers: {
        // Tell CDN/browser to cache this redirect for 1 year since the file never changes
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('Error rendering card:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
