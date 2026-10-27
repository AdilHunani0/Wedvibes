/**
 * lib/xss.ts
 * ──────────────────────────────────────────────────────────────────────────
 * Shared XSS-prevention helpers. Import from here — never roll your own.
 *
 * IMPORTANT: These functions are for *output* escaping only.
 * Do NOT call them before saving to the database; call them at render time.
 * Saving pre-escaped data causes double-escaping and display corruption.
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * Escape a string for safe insertion as HTML text content or inside a
 * quoted HTML attribute value. Covers the OWASP minimum: &, <, >, ", '.
 */
export function escapeHtml(str: string | null | undefined): string {
  if (str == null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Like escapeHtml, but adds extra escaping for attribute values that would be
 * inserted without surrounding quotes (defensive-only; always prefer quoted attrs).
 */
export function escapeForAttr(str: string | null | undefined): string {
  return escapeHtml(str)
    .replace(/\//g, '&#47;')
    .replace(/`/g, '&#96;')
}

/**
 * Allowlist-based URL sanitiser.
 * Accepts: http:, https:, mailto:, tel:  — returns '' for everything else.
 * Blocks javascript:, data:, vbscript:, etc.
 */
export function safeUrl(url: string | null | undefined): string {
  if (url == null || url.trim() === '') return ''
  const trimmed = String(url).trim()
  try {
    const u = new URL(trimmed)
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(u.protocol)) {
      return trimmed
    }
    return ''
  } catch {
    // Relative URLs — allow only if they start with /
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return trimmed
    }
    return ''
  }
}

/**
 * Serialise a value as JSON for use inside a <script type="application/ld+json">
 * block. Escapes "<" as \u003c to prevent </script> breakout attacks.
 *
 * Usage:
 *   dangerouslySetInnerHTML={{ __html: safeJsonLd(mySchema) }}
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
