/**
 * tests/xss-protection.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Automated tests verifying that stored and reflected XSS vectors are neutralized.
 * 
 * Usage:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' tests/xss-protection.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { escapeHtml, escapeForAttr, safeUrl, safeJsonLd } from '../lib/xss'
import { validateAndSanitizeCustomization, containsMaliciousPayload } from '../lib/validations/customization'

function assert(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${testName}`)
    process.exitCode = 1
  } else {
    console.log(`✅ PASS: ${testName}`)
  }
}

console.log('--- RUNNING XSS DEFENSE TESTS ---\n')

// 1. Output Escaping: escapeHtml
{
  const scriptPayload = '<script>alert("xss")</script>'
  const escaped = escapeHtml(scriptPayload)
  assert(!escaped.includes('<script>'), 'escapeHtml neutralizes <script>')
  assert(escaped === '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', 'escapeHtml encodes <, >, and "')

  const imgPayload = '<img src=x onerror=alert(1)>'
  const escapedImg = escapeHtml(imgPayload)
  assert(!escapedImg.includes('<img'), 'escapeHtml neutralizes <img')
  assert(escapedImg.includes('&lt;img'), 'escapeHtml replaces < with &lt;')

  const quoteBreakout = '"><script>alert(document.cookie)</script>'
  const escapedBreakout = escapeHtml(quoteBreakout)
  assert(!escapedBreakout.includes('">'), 'escapeHtml neutralizes quote-bracket breakout')
  assert(escapedBreakout.startsWith('&quot;&gt;'), 'escapeHtml encodes quote breakout')
}

// 2. URL Protocol Validation: safeUrl
{
  assert(safeUrl('javascript:alert(1)') === '', 'safeUrl blocks javascript: URLs')
  assert(safeUrl('JAVASCRIPT:alert(1)') === '', 'safeUrl blocks case-variant JAVASCRIPT: URLs')
  assert(safeUrl('  javascript:void(0) ') === '', 'safeUrl blocks whitespace-padded javascript: URLs')
  assert(safeUrl('data:text/html,<script>alert(1)</script>') === '', 'safeUrl blocks data: URLs')
  assert(safeUrl('vbscript:msgbox(1)') === '', 'safeUrl blocks vbscript: URLs')
  assert(safeUrl('https://images.unsplash.com/photo-123') === 'https://images.unsplash.com/photo-123', 'safeUrl allows valid https URL')
  assert(safeUrl('http://example.com/pic.jpg') === 'http://example.com/pic.jpg', 'safeUrl allows valid http URL')
  assert(safeUrl('/uploads/photo.jpg') === '/uploads/photo.jpg', 'safeUrl allows relative paths')
}

// 3. JSON-LD Escaping: safeJsonLd
{
  const dangerousJson = { title: '</script><script>alert(1)</script>' }
  const serialized = safeJsonLd(dangerousJson)
  assert(!serialized.includes('</script>'), 'safeJsonLd prevents script tag breakout')
  assert(serialized.includes('\\u003c/script\\u003e'), 'safeJsonLd converts < to unicode \\u003c')
}

// 4. Input Validation: containsMaliciousPayload & validateAndSanitizeCustomization
{
  assert(containsMaliciousPayload('<script>alert(1)</script>'), 'containsMaliciousPayload detects <script>')
  assert(containsMaliciousPayload('Hello <img src=x onerror=alert(1)>'), 'containsMaliciousPayload detects onerror= handler')
  assert(containsMaliciousPayload('javascript:void(0)'), 'containsMaliciousPayload detects javascript: protocol')
  assert(!containsMaliciousPayload('Rohan & Priya Wedding Celebration'), 'containsMaliciousPayload allows normal wedding text with &')
  assert(!containsMaliciousPayload('Taj Hotel, Mumbai, India'), 'containsMaliciousPayload allows normal venue address')

  // Zod Customization validation rejects malicious input
  const maliciousCustomization = {
    person1_name: '<script>alert("groom")</script>',
    person2_name: 'Priya',
    venue_name: 'Palace',
  }
  const result = validateAndSanitizeCustomization(maliciousCustomization)
  assert(!result.success, 'validateAndSanitizeCustomization rejects malicious person1_name')

  // Clean payload passes
  const cleanCustomization = {
    person1_name: 'Rohan Sharma',
    person2_name: 'Priya Patel',
    venue_name: 'The Grand Palace',
    venue_address: '123 MG Road, Bengaluru',
    extra_message: 'We request the honour of your presence.',
    photo_urls: ['https://images.unsplash.com/photo-1'],
  }
  const cleanResult = validateAndSanitizeCustomization(cleanCustomization)
  assert(cleanResult.success, 'validateAndSanitizeCustomization accepts valid inputs')
}

console.log('\n--- ALL XSS DEFENSE TESTS COMPLETED ---')
