import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/api', '/auth', '/checkout', '/cdn-cgi'],
    },
    sitemap: 'https://wedvibe.in/sitemap.xml',
  }
}
