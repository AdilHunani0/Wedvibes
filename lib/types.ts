export type UserRole = 'customer' | 'planner' | 'admin'
export type TemplateCategory = 'wedding' | 'birthday' | 'engagement' | 'opening' | 'anniversary'
export type TemplateTier = 'basic' | 'standard' | 'premium'
export type OrderStatus = 'pending' | 'paid' | 'generating' | 'delivered' | 'failed'
export type PaymentMethod = 'razorpay' | 'credits'
export type CreditTransactionType = 'purchase' | 'use' | 'refund' | 'bonus'

export interface Profile {
  id: string
  full_name: string
  phone?: string
  role: UserRole
  credits: number
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  slug: string
  category: TemplateCategory
  tier: TemplateTier
  price: number // in paise
  credit_cost: number
  preview_image_url?: string
  html_file_path: string
  thumbnail_video_url?: string
  features: string[]
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Order {
  id: string
  user_id?: string
  guest_email?: string
  template_id: string
  status: OrderStatus
  payment_method?: PaymentMethod
  amount_paid?: number // in paise
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  card_url?: string
  generated_card_path?: string
  created_at: string
  updated_at: string
  template?: Template
  customization?: Customization
  profile?: Profile
}

export interface Customization {
  id: string
  order_id: string
  person1_name?: string
  person2_name?: string
  event_date?: string
  event_time?: string
  venue_name?: string
  venue_address?: string
  family_bride_father?: string
  family_bride_mother?: string
  family_groom_father?: string
  family_groom_mother?: string
  photo_urls: string[]
  extra_message?: string
  extra_fields: Record<string, string>
  created_at: string
}

export interface CreditPlan {
  id: string
  name: string
  description?: string
  basic_credits: number
  standard_credits: number
  premium_credits: number
  total_credits: number
  price: number // in paise
  discount_percent: number
  is_active: boolean
  sort_order: number
}

export interface CreditTransaction {
  id: string
  user_id: string
  type: CreditTransactionType
  credits_delta: number
  order_id?: string
  plan_id?: string
  description?: string
  created_at: string
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  image?: string
  prefill: {
    name?: string
    email?: string
    contact?: string
  }
  notes?: Record<string, string>
  theme: { color: string }
  handler: (response: RazorpayResponse) => void
  modal?: {
    ondismiss?: () => void
    confirm_close?: boolean
    escape?: boolean
    animation?: boolean
  }
  config?: {
    display?: {
      blocks?: Record<string, {
        name: string
        instruments: Array<{
          method: string
          flows?: string[]
        }>
      }>
      sequence?: string[]
      preferences?: {
        show_default_blocks?: boolean
      }
    }
  }
  method?: {
    upi?: boolean
    card?: boolean
    netbanking?: boolean
    wallet?: boolean
    emi?: boolean
    paylater?: boolean
  }
}

export interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export interface AdminStats {
  totalRevenue: number
  ordersToday: number
  activeUsers: number
  creditsSold: number
  recentOrders: Order[]
  revenueByDay: { date: string; revenue: number }[]
  ordersByCategory: { category: string; count: number }[]
  tierBreakdown: { tier: string; count: number }[]
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'date' | 'time' | 'textarea' | 'photo' | 'checkbox'
  placeholder?: string
  required?: boolean
  rows?: number
  maxPhotos?: number // for photo fields
}

export interface FormStep {
  title: string
  description?: string
  fields: FormField[]
}

export interface TemplateFormConfig {
  slug: string
  steps: FormStep[]
}

export interface CustomizationFormData {
  person1_name: string
  person2_name: string
  event_date: string
  event_time: string
  venue_name: string
  venue_address: string
  family_bride_father: string
  family_bride_mother: string
  family_groom_father: string
  family_groom_mother: string
  extra_message: string
  photo_urls: string[]
  // Allow dynamic extra fields
  [key: string]: any
}
