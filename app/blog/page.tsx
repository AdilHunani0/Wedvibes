import Link from 'next/link'
import { BLOG_POSTS } from './content'

export const metadata = {
  title: 'Wedding Invitation Tips & Ideas — WedVibe Blog',
  description:
    'Expert tips on digital wedding invitations, WhatsApp wedding cards, and shaadi planning ideas for Indian couples. Read the WedVibe blog.',
  alternates: {
    canonical: 'https://wedvibe.in/blog',
  },
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#fcf9f5] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative luxury glows */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b2635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[#a0522d] tracking-[0.2em] text-xs font-semibold uppercase">
            WedVibe Blog
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2a1810] font-extrabold tracking-tight leading-tight">
            Wedding Tips &amp; Digital Invitation Ideas
          </h1>
          <p className="text-[#6b3d2a] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert tips on digital wedding invitations, WhatsApp wedding cards, and shaadi planning ideas for Indian couples.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mt-4" />
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-[#e8c97e]/35 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col"
            >
              {/* Card top decorative accent */}
              <div className="h-2 w-full bg-gradient-to-r from-[#6b1d2f] via-[#c9a96e] to-[#6b1d2f]" />

              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#a0522d]">
                    {post.date}
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-[#2a1810] leading-snug group-hover:text-[#6b1d2f] transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-[#6b3d2a] text-sm leading-relaxed line-clamp-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e8c97e]/20 flex items-center justify-between text-sm font-semibold text-[#6b1d2f] group-hover:text-[#a0522d] transition-colors">
                  <span>Read full guide</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
