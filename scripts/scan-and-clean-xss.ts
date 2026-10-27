/**
 * scripts/scan-and-clean-xss.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Scans the `customizations` table in Supabase for previously stored XSS payloads.
 * Detects <script>, event handlers (onerror=, onload=), javascript: URIs, etc.
 * 
 * Usage:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/scan-and-clean-xss.ts [--dry-run]
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<\/script>/gi,
  /<script/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /<svg\b[^>]*\bon\w+\s*=/gi,
  /\bon(?:error|load|click|mouseover|focus|blur|mouseenter|pointerover)\s*=/gi,
  /javascript\s*:/gi,
  /vbscript\s*:/gi,
  /data\s*:\s*text\/html/gi,
]

function containsMaliciousPayload(str: string): boolean {
  if (!str || typeof str !== 'string') return false
  return DANGEROUS_PATTERNS.some((p) => p.test(str))
}

function cleanString(str: string): string {
  if (!str || typeof str !== 'string') return str
  let cleaned = str
  for (const p of DANGEROUS_PATTERNS) {
    cleaned = cleaned.replace(p, '')
  }
  return cleaned.trim()
}

async function runScan() {
  const isDryRun = process.argv.includes('--dry-run')
  console.log(`Starting XSS scan across customizations (Mode: ${isDryRun ? 'DRY-RUN' : 'LIVE FIX'})...\n`)

  const { data: rows, error } = await supabase
    .from('customizations')
    .select('id, order_id, person1_name, person2_name, venue_name, venue_address, extra_message, extra_fields')

  if (error) {
    console.error('Failed to query customizations:', error)
    process.exit(1)
  }

  if (!rows || rows.length === 0) {
    console.log('No customization records found in database.')
    return
  }

  console.log(`Inspecting ${rows.length} customization records...`)
  let flaggedCount = 0

  for (const row of rows) {
    let rowFlagged = false
    const updates: Record<string, any> = {}

    const textColumns = ['person1_name', 'person2_name', 'venue_name', 'venue_address', 'extra_message']
    for (const col of textColumns) {
      const val = (row as Record<string, any>)[col]
      if (typeof val === 'string' && containsMaliciousPayload(val)) {
        console.warn(`[!] Flagged record ${row.id} (Order ${row.order_id}) in column "${col}": ${val}`)
        rowFlagged = true
        updates[col] = cleanString(val)
      }
    }

    if (row.extra_fields && typeof row.extra_fields === 'object') {
      const cleanedExtra = { ...row.extra_fields }
      let extraModified = false
      for (const [k, v] of Object.entries(row.extra_fields)) {
        if (typeof v === 'string' && containsMaliciousPayload(v)) {
          console.warn(`[!] Flagged record ${row.id} (Order ${row.order_id}) in extra_fields["${k}"]: ${v}`)
          rowFlagged = true
          extraModified = true
          cleanedExtra[k] = cleanString(v)
        }
      }
      if (extraModified) {
        updates.extra_fields = cleanedExtra
      }
    }

    if (rowFlagged) {
      flaggedCount++
      if (!isDryRun) {
        const { error: updateErr } = await supabase
          .from('customizations')
          .update(updates)
          .eq('id', row.id)

        if (updateErr) {
          console.error(`Failed to sanitize record ${row.id}:`, updateErr)
        } else {
          console.log(`[✓] Sanitized record ${row.id}`)
        }
      }
    }
  }

  console.log(`\nScan complete. Flagged records: ${flaggedCount} / ${rows.length}.`)
}

runScan().catch((err) => {
  console.error('Scan error:', err)
  process.exit(1)
})
