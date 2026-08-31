import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/server'

const CITIES = [
  'mumbai', 'delhi', 'bangalore', 'ahmedabad', 'chennai', 
  'hyderabad', 'pune', 'jaipur', 'kolkata', 'surat'
]

const BLOGS = [
  'whatsapp-wedding-invitation-guide',
  'digital-vs-printed-wedding-invitations-2026',
  'bulk-digital-invitations-wedding-planners',
  'nikah-digital-invitation-ideas'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient()
  
  // Fetch active templates
  const { data: templates } = await supabase
    .from('templates')
    .select('slug, updated_at')
    .eq('is_active', true)

  const templateUrls = (templates || []).map((template) => ({
    url: `https://wedvibe.in/templates/${template.slug}`,
    lastModified: template.updated_at ? new Date(template.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const cityUrls = CITIES.map((city) => ({
    url: `https://wedvibe.in/digital-wedding-invitation-${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogUrls = BLOGS.map((slug) => ({
    url: `https://wedvibe.in/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticUrls = [
    {
      url: 'https://wedvibe.in',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://wedvibe.in/templates',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://wedvibe.in/planners',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://wedvibe.in/pricing',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://wedvibe.in/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://wedvibe.in/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return [...staticUrls, ...cityUrls, ...templateUrls, ...blogUrls]
}
