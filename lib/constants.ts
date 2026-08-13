import type { TemplateTier } from './types'

export const TIER_PRICES: Record<TemplateTier, number> = {
  basic: 9900,    // ₹99 in paise
  standard: 24900, // ₹249 in paise
  premium: 49900,  // ₹499 in paise
}

export const TIER_CREDIT_COST: Record<TemplateTier, number> = {
  basic: 1,
  standard: 2,
  premium: 3,
}

export const TIER_MAX_PHOTOS: Record<TemplateTier, number> = {
  basic: 1,
  standard: 2,
  premium: 4,
}

export const TIER_LABELS: Record<TemplateTier, string> = {
  basic: 'Basic',
  standard: 'Standard',
  premium: 'Premium',
}

export const TIER_COLORS: Record<TemplateTier, string> = {
  basic: '#6b7280',
  standard: '#c9a96e',
  premium: '#a0522d',
}

export const CATEGORY_LABELS: Record<string, string> = {
  wedding: 'Wedding',
  birthday: 'Birthday',
  engagement: 'Engagement',
  opening: 'Grand Opening',
  anniversary: 'Anniversary',
}

export const CREDIT_PLAN_PRICES = {
  starter: 299900,  // ₹2,999 in paise
  growth: 499900,   // ₹4,999 in paise
  agency: 699900,   // ₹6,999 in paise
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  paid: 'Paid',
  generating: 'Generating',
  delivered: 'Delivered',
  failed: 'Failed',
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  paid: '#10b981',
  generating: '#3b82f6',
  delivered: '#14b8a6',
  failed: '#ef4444',
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const CARD_TOKENS = [
  '{{PERSON1_NAME}}',
  '{{PERSON2_NAME}}',
  '{{EVENT_DATE}}',
  '{{EVENT_TIME}}',
  '{{VENUE_NAME}}',
  '{{VENUE_ADDRESS}}',
  '{{FAMILY_BRIDE_FATHER}}',
  '{{FAMILY_BRIDE_MOTHER}}',
  '{{FAMILY_GROOM_FATHER}}',
  '{{FAMILY_GROOM_MOTHER}}',
  '{{PHOTO_1}}',
  '{{PHOTO_2}}',
  '{{PHOTO_3}}',
  '{{PHOTO_4}}',
  '{{EXTRA_MESSAGE}}',
]

export const PRICING_FEATURES: Record<TemplateTier, string[]> = {
  basic: [
    '1 photo slot',
    'Shareable link',
    'Mobile optimised',
    'WhatsApp share',
    'Valid 30 days',
  ],
  standard: [
    '2 photo slots',
    'Scroll animations',
    'Shareable link',
    'Mobile optimised',
    'WhatsApp share',
    'Valid 60 days',
  ],
  premium: [
    '4 photo slots',
    'Full animation suite',
    'Door opening effect',
    'Floating petals',
    'Custom music (add-on)',
    'RSVP button',
    'Shareable link',
    'Valid 365 days',
  ],
}
