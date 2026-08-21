import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendCardDeliveredEmail } from '@/lib/resend'
import { generateSlug } from '@/lib/utils'
import { resolveConditionals } from '@/lib/template-utils'
import { nanoid } from 'nanoid'
import fs from 'fs'
import path from 'path'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  let orderId: string | null = null
  try {
    const body = await req.json()
    orderId = body.orderId
    const forceRegenerate = body.forceRegenerate === true

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const supabaseAdmin = createAdminClient()

    // 1. Fetch Order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, template:templates(*), customization:customizations(*), profile:profiles(*)')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error('Order not found')
    }

    if (order.status === 'delivered' && !forceRegenerate) {
      return NextResponse.json({ success: true, message: 'Card already generated', cardUrl: order.card_url })
    }

    if (order.status === 'generating') {
      // Another process is already generating — return the existing card_url so client can redirect
      return NextResponse.json({ success: true, message: 'Generation already in progress', cardUrl: order.card_url })
    }

    if (order.status !== 'paid' && !forceRegenerate) {
      return NextResponse.json({ error: `Cannot generate card with status: ${order.status}` }, { status: 400 })
    }

    // 2. Generate card_url FIRST and save immediately so it's always recoverable
    // even if the rest of the generation times out
    const template = Array.isArray(order.template) ? order.template[0] : order.template
    const customization = Array.isArray(order.customization) ? order.customization[0] : order.customization
    const p1Slug = generateSlug(customization?.person1_name || 'groom')
    const p2Slug = generateSlug(customization?.person2_name || 'bride')
    const cardUrl = order.card_url || `${p1Slug}-and-${p2Slug}-${nanoid(6)}`

    // Save card_url and set status to 'generating' atomically
    await supabaseAdmin.from('orders').update({
      status: 'generating',
      card_url: cardUrl,   // Save URL immediately — even if rest fails, URL is registered
    }).eq('id', order.id)

    if (!template || !customization) {
      throw new Error('Template or customization details are missing')
    }

    // 3. Load template HTML file
    // Templates are stored in public/templates/[slug].html
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const templateResponse = await fetch(`${appUrl}/templates/${template.slug}.html`)
    
    if (!templateResponse.ok) {
      throw new Error(`Template HTML file not found for ${template.slug}`)
    }

    let html = await templateResponse.text()

    // 4. Substitution logic
    const extraFields = customization.extra_fields || {}

    // Resolve names: standard fields first, then fall back to template-specific extra_fields
    const groomName = customization.person1_name || (extraFields as Record<string, string>).groom_name || 'Groom'
    const brideName = customization.person2_name || (extraFields as Record<string, string>).bride_name || 'Bride'

    html = html.replace(/\{\{PERSON1_NAME\}\}/g, groomName)
    html = html.replace(/\{\{PERSON2_NAME\}\}/g, brideName)
    html = html.replace(/\{\{GROOM_NAME\}\}/g, groomName)
    html = html.replace(/\{\{BRIDE_NAME\}\}/g, brideName)
    html = html.replace(/\{\{EVENT_DATE\}\}/g, customization.event_date ? new Date(customization.event_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '')
    html = html.replace(/\{\{EVENT_TIME\}\}/g, customization.event_time || '')
    html = html.replace(/\{\{VENUE_NAME\}\}/g, customization.venue_name || '')
    html = html.replace(/\{\{VENUE_ADDRESS\}\}/g, customization.venue_address || '')
    html = html.replace(/\{\{FAMILY_BRIDE_FATHER\}\}/g, customization.family_bride_father || '')
    html = html.replace(/\{\{FAMILY_BRIDE_MOTHER\}\}/g, customization.family_bride_mother || '')
    html = html.replace(/\{\{FAMILY_GROOM_FATHER\}\}/g, customization.family_groom_father || '')
    html = html.replace(/\{\{FAMILY_GROOM_MOTHER\}\}/g, customization.family_groom_mother || '')
    html = html.replace(/\{\{EXTRA_MESSAGE\}\}/g, customization.extra_message || '')

    const fallbackPhotos = (template.slug === 'our-wedding-story' || template.slug === 'royal-dark-wedding')
      ? [
        '/our-wedding-story-1.jpg',
        '/our-wedding-story-2.jpg',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
      ]
      : template.slug === 'engagement-navy-story'
        ? [
          '/eng-cartoon.jpg',        // PHOTO_1 — unused (envelope hardcoded), kept as slot
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600', // PHOTO_2
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600', // PHOTO_3
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600', // PHOTO_4
        ]
        : [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
        ]

    const photo_urls = customization.photo_urls || []
    for (let i = 1; i <= 4; i++) {
      const photoUrl = photo_urls[i - 1] || fallbackPhotos[(i - 1) % fallbackPhotos.length]
      html = html.replace(new RegExp(`\\{\\{PHOTO_${i}\\}\\}`, 'g'), photoUrl)
    }

    // Dynamic field replacement from extra_fields
    // Skip groom_name/bride_name — already handled above as PERSON1/PERSON2/GROOM/BRIDE_NAME
    const nameAliases = new Set(['groom_name', 'bride_name'])
    Object.keys(extraFields).forEach((key) => {
      const value = (extraFields as Record<string, unknown>)[key]
      if (Array.isArray(value)) {
        for (let i = 1; i <= 10; i++) {
          const photoUrl = (value[i - 1] as string) || fallbackPhotos[(i - 1) % fallbackPhotos.length]
          html = html.replace(new RegExp(`\\{\\{${key.toUpperCase()}_${i}\\}\\}`, 'g'), photoUrl)
        }
      } else if (typeof value === 'string') {
        let displayValue = value || ''
        if (key.includes('date') && value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          displayValue = new Date(value).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }
        if (!nameAliases.has(key)) {
          html = html.replace(new RegExp(`\\{\\{${key.toUpperCase()}\\}\\}`, 'g'), displayValue)
        }
      }
    })

    // 5. Resolve conditional blocks — strip sections whose key fields are empty
    const conditionalData: Record<string, string | string[] | undefined | null> = {}
    // Add standard fields
    conditionalData['person1_name'] = customization.person1_name || ''
    conditionalData['person2_name'] = customization.person2_name || ''
    conditionalData['event_date'] = customization.event_date || ''
    conditionalData['event_time'] = customization.event_time || ''
    conditionalData['venue_name'] = customization.venue_name || ''
    conditionalData['venue_address'] = customization.venue_address || ''
    conditionalData['family_bride_father'] = customization.family_bride_father || ''
    conditionalData['family_bride_mother'] = customization.family_bride_mother || ''
    conditionalData['family_groom_father'] = customization.family_groom_father || ''
    conditionalData['family_groom_mother'] = customization.family_groom_mother || ''
    conditionalData['extra_message'] = customization.extra_message || ''
    // Add extra_fields
    Object.keys(extraFields).forEach((key) => {
      const v = (extraFields as Record<string, unknown>)[key]
      const resolved = Array.isArray(v)
        ? (v as string[])
        : typeof v === 'string'
          ? v
          : typeof v === 'boolean'
            ? v ? 'true' : ''
            : ''

      conditionalData[key] = resolved

      if (Array.isArray(resolved)) {
        resolved.forEach((item, index) => {
          if (item) {
            conditionalData[`${key}_${index}`] = item
          }
        })
      }
    })
    html = resolveConditionals(html, conditionalData)

    // 6. Build OG tags (card_url already determined above)
    // Inject Open Graph tags for previews (WhatsApp, iMessage, etc.)
    const fullCardUrl = `${appUrl}/card/${cardUrl}`
    const ogTitle = `You're invited to the wedding of ${groomName} & ${brideName}!`
    const displayDate = customization.event_date ? new Date(customization.event_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''
    const ogDescription = `Join us on ${displayDate} at ${customization.venue_name || 'our wedding venue'}. Click to open our interactive invitation.`
    // Find the first available uploaded photo across all photo fields
    let firstUploadedPhoto = null
    if (photo_urls && photo_urls.length > 0) {
      firstUploadedPhoto = photo_urls[0]
    } else {
      for (const key of Object.keys(extraFields)) {
        const val = (extraFields as Record<string, unknown>)[key]
        if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'string' && val[0].startsWith('http')) {
          firstUploadedPhoto = val[0]
          break
        }
      }
    }

    const ogImage = firstUploadedPhoto || fallbackPhotos[0]

    const safeOgTitle = escapeHtml(ogTitle)
    const safeOgDescription = escapeHtml(ogDescription)
    const safeOgImage = escapeHtml(ogImage)
    const safeFullCardUrl = escapeHtml(fullCardUrl)

    const ogTags = `
    <!-- Open Graph / Social Media Preview Tags -->
    <meta property="og:title" content="${safeOgTitle}" />
    <meta property="og:description" content="${safeOgDescription}" />
    <meta property="og:image" content="${safeOgImage}" />
    <meta property="og:url" content="${safeFullCardUrl}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeOgTitle}" />
    <meta name="twitter:description" content="${safeOgDescription}" />
    <meta name="twitter:image" content="${safeOgImage}" />`

    html = html.replace('</head>', `${ogTags}\n</head>`)

    // 7. Save generated HTML to Supabase generated-cards bucket
    const fileName = `${order.id}-${nanoid(8)}.html`
    // @ts-ignore
    const fileBuffer = Buffer.from(html, 'utf8')

    const { error: uploadError } = await supabaseAdmin.storage
      .from('generated-cards')
      .upload(fileName, fileBuffer, {
        contentType: 'text/html',
        cacheControl: '31536000',
        upsert: true,
      })

    if (uploadError) {
      throw uploadError
    }

    // 8. Update order in Supabase
    const { error: finalUpdateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'delivered',
        card_url: cardUrl,
        generated_card_path: fileName,
      })
      .eq('id', order.id)

    if (finalUpdateError) {
      throw finalUpdateError
    }

    // 8. Send delivered email
    const recipientEmail = order.guest_email || order.profile?.email || ''
    const recipientName = order.profile?.full_name || 'Valued Customer'
    if (recipientEmail) {
      try {
        await sendCardDeliveredEmail(recipientEmail, recipientName, cardUrl)
      } catch (emailErr) {
        console.error('Failed to send card delivered email:', emailErr)
      }
    }

    return NextResponse.json({ success: true, cardUrl })
  } catch (err: unknown) {
    console.error('Card generation error:', err)
    // Mark order as failed — orderId is captured in closure above, NOT from req.json() again
    if (orderId) {
      try {
        const supabaseAdmin = createAdminClient()
        await supabaseAdmin.from('orders').update({ status: 'failed' }).eq('id', orderId)
      } catch (markErr) {
        console.error('Failed to mark order as failed:', markErr)
      }
    }

    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
