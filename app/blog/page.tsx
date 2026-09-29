import Link from 'next/link'
import { BLOG_POSTS } from './content'

export const metadata = {
  title: 'Wedding Invitation Ideas & Guides | WedVibe Blog',
  description:
    'Read the latest trends, guides, and ideas for digital wedding invitations in India. Expert tips on WhatsApp invitations, Nikah e-cards, and more.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#fcf9f5] py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b2635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#a0522d] tracking-[0.2em] text-xs font-semibold uppercase">
            Guides &amp; Inspiration
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#2a1810] font-extrabold tracking-tight">
            The WedVibe Blog
          </h1>
          <p className="text-[#6b3d2a] text-lg max-w-xl mx-auto leading-relaxed">
            Expert guides, design inspiration, and practical tips for your
            digital wedding invitation journey.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mt-6" />
        </div>

        {/* Blog card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-[#e8c97e]/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              {/* Card top colour band */}
              <div className="h-2 w-full bg-gradient-to-r from-[#c9a96e] via-[#e8c97e] to-[#c9a96e]" />

              <div className="p-8 flex flex-col flex-1">
                {/* Emoji + category */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl" role="img" aria-label="Post icon">
                    {post.heroEmoji}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#a0522d] bg-[#f9f0e3] px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <h2 className="font-playfair text-xl font-bold text-[#2a1810] leading-snug mb-3 group-hover:text-[#8b2635] transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="text-[#6b3d2a] text-sm leading-relaxed flex-1 mb-6">
                  {post.description}
                </p>

                {/* Footer meta */}
                <div className="flex items-center justify-between text-xs text-[#a0522d]/70">
                  <span>{post.publishedDate}</span>
                  <span className="flex items-center gap-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                {/* Read more arrow */}
                <div className="mt-4 pt-4 border-t border-[#e8c97e]/30 flex items-center gap-2 text-sm font-semibold text-[#8b2635] group-hover:gap-3 transition-all duration-200">
                  Read article
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-[#6b3d2a] mb-6">
            Ready to create your own stunning digital invitation?
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b2635] to-[#c0392b] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Templates
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
