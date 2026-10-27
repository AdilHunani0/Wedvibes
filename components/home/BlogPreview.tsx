import Link from 'next/link'
import { BLOG_POSTS } from '@/app/blog/content'

export function BlogPreview() {
  const latestPosts = BLOG_POSTS.slice(0, 3)

  return (
    <section className="py-20 bg-[#fffaf5] border-t border-[#e8c97e]/25 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-[#a0522d] font-bold tracking-widest uppercase text-xs">
            From The WedVibe Journal
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2a1810]">
            Wedding Tips &amp; Ideas
          </h2>
          <p className="text-[#6b3d2a] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Helpful guides, etiquette tips, and smart advice for modern Indian couples planning their dream shaadi invitations.
          </p>
        </div>

        {/* 3 Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl border border-[#e8c97e]/35 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
            >
              <div className="h-2 w-full bg-gradient-to-r from-[#6b1d2f] via-[#c9a96e] to-[#6b1d2f]" />

              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-[#a0522d] uppercase tracking-wider block">
                    {post.date}
                  </span>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#2a1810] leading-snug group-hover:text-[#6b1d2f] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6b3d2a] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e8c97e]/20 flex items-center justify-between text-sm font-semibold text-[#6b1d2f] group-hover:text-[#a0522d] transition-colors">
                  <span>Read article</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Link to Blog */}
        <div className="text-center pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#a0522d]/40 text-[#a0522d] font-semibold text-sm hover:bg-[#a0522d] hover:text-white transition-all duration-200 shadow-sm"
          >
            Explore all wedding guides &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
