import { notFound } from 'next/navigation'

const BLOGS = [
  'whatsapp-wedding-invitation-guide',
  'digital-vs-printed-wedding-invitations-2026',
  'bulk-digital-invitations-wedding-planners',
  'nikah-digital-invitation-ideas'
]

export async function generateStaticParams() {
  return BLOGS.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!BLOGS.includes(slug)) return {}
  
  return {
    title: `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | WedVibe`,
    description: `Read our comprehensive guide on ${slug.split('-').join(' ')}`,
    alternates: {
      canonical: `/blog/${slug}`,
    }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!BLOGS.includes(slug)) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 space-y-6 text-center">
      <h1 className="font-playfair text-4xl font-bold text-[#2a1810] capitalize">
        {slug.split('-').join(' ')}
      </h1>
      <p className="text-[#6b3d2a]">This article is currently being written. Please check back later.</p>
    </div>
  )
}
