import { z } from 'zod'

/**
 * Regex patterns that indicate malicious injection payloads.
 * Defense-in-depth: Reject these at the API boundary before saving to DB.
 */
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

export function containsMaliciousPayload(str: string): boolean {
  if (!str || typeof str !== 'string') return false
  return DANGEROUS_PATTERNS.some((pattern) => pattern.test(str))
}

const safeText = (maxLen = 300) =>
  z
    .string()
    .max(maxLen, { message: `Text cannot exceed ${maxLen} characters` })
    .refine((val) => !containsMaliciousPayload(val), {
      message: 'Suspicious script or HTML tags detected in input',
    })
    .optional()
    .nullable()

const safeUrlString = () =>
  z
    .string()
    .max(2000)
    .refine((val) => {
      if (!val) return true
      const trimmed = val.trim()
      if (trimmed.startsWith('/')) return true
      try {
        const u = new URL(trimmed)
        return ['http:', 'https:'].includes(u.protocol)
      } catch {
        return false
      }
    }, { message: 'Only valid http/https or relative URLs are allowed' })
    .refine((val) => !containsMaliciousPayload(val), {
      message: 'Suspicious script or protocol detected in URL',
    })

export const CustomizationSchema = z.object({
  person1_name: safeText(100),
  person2_name: safeText(100),
  event_date: safeText(100),
  event_time: safeText(100),
  venue_name: safeText(300),
  venue_address: safeText(500),
  family_bride_father: safeText(150),
  family_bride_mother: safeText(150),
  family_groom_father: safeText(150),
  family_groom_mother: safeText(150),
  extra_message: safeText(2000),
  photo_urls: z.array(safeUrlString()).max(20).optional().nullable(),
}).passthrough()

/**
 * Validates an entire customization object recursively, checking all known
 * and extra_fields string values against malicious payloads and length constraints.
 */
export function validateAndSanitizeCustomization(raw: unknown): {
  success: boolean
  data?: Record<string, any>
  error?: string
} {
  if (!raw || typeof raw !== 'object') {
    return { success: false, error: 'Customization must be an object' }
  }

  const parseResult = CustomizationSchema.safeParse(raw)
  if (!parseResult.success) {
    const issue = parseResult.error.issues[0]
    return {
      success: false,
      error: issue ? `${issue.path.join('.')}: ${issue.message}` : 'Invalid customization input',
    }
  }

  // Deep check any extra fields
  const obj = parseResult.data as Record<string, any>
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (value.length > 5000) {
        return { success: false, error: `Field "${key}" exceeds max length (5000 chars)` }
      }
      if (containsMaliciousPayload(value)) {
        return { success: false, error: `Field "${key}" contains invalid or prohibited script tags` }
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (typeof item === 'string') {
          if (item.length > 2000) {
            return { success: false, error: `Array item in "${key}" exceeds max length` }
          }
          if (containsMaliciousPayload(item)) {
            return { success: false, error: `Array item in "${key}" contains prohibited script tags` }
          }
        }
      }
    }
  }

  return { success: true, data: obj }
}
