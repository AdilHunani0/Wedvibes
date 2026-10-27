import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, BLOG_POSTS } from '../content'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} | WedVibe`,
    description: post.metaDescription,
    alternates: {
      canonical: `https://wedvibe.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      url: `https://wedvibe.in/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)

  return (
    <article className="min-h-screen bg-[#fcf9f5] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative luxury glows */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b2635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        {/* Navigation Breadcrumb / Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#a0522d] font-semibold hover:text-[#6b1d2f] transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>

        {/* Post Header */}
        <header className="space-y-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#a0522d]">
            Published on {post.date}
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2a1810] leading-tight tracking-tight">
            {post.h1}
          </h1>
          <p className="text-[#6b3d2a] text-lg sm:text-xl leading-relaxed">
            {post.intro}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
        </header>

        {/* Post Sections Content */}
        <div className="space-y-10 text-[#6b3d2a] leading-relaxed text-base sm:text-lg">
          {post.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810] pt-4">
                  {section.heading}
                </h2>
              )}

              {/* Text content if string */}
              {typeof section.content === 'string' && (
                <p>{section.content}</p>
              )}

              {/* Text content if array */}
              {Array.isArray(section.content) &&
                section.content.map((p, pIdx) => <p key={pIdx}>{p}</p>)}

              {/* Bullet list */}
              {section.list && section.list.length > 0 && (
                <ul className="space-y-3 pl-0 list-none my-4">
                  {section.list.map((item, lIdx) => (
                    <li
                      key={lIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-[#e8c97e]/30 shadow-xs"
                    >
                      <span className="text-[#a0522d] font-bold text-base leading-none mt-1">
                        ✦
                      </span>
                      <span className="text-sm sm:text-base text-[#6b3d2a] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Numbered list */}
              {section.numberedList && section.numberedList.length > 0 && (
                <ol className="space-y-3 pl-0 list-none my-4">
                  {section.numberedList.map((step, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-[#e8c97e]/35 shadow-xs"
                    >
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6b1d2f] to-[#4a101f] text-gold-light font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="text-sm sm:text-base text-[#6b3d2a] leading-relaxed pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              {/* Comparison table / cards */}
              {section.comparison && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                  {/* Card A */}
                  <div className="p-6 rounded-2xl bg-white/70 border border-gray-200 shadow-sm space-y-4">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 border-b pb-2">
                      {section.comparison.itemA.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {section.comparison.itemA.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card B */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fdf8f4] to-white border-2 border-[#c9a96e] shadow-md space-y-4 relative">
                    <span className="absolute -top-3 right-4 px-3 py-0.5 bg-[#6b1d2f] text-gold-light text-xs font-semibold rounded-full uppercase tracking-wider">
                      Recommended
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-[#2a1810] border-b border-[#e8c97e]/30 pb-2">
                      {section.comparison.itemB.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-[#6b3d2a]">
                      {section.comparison.itemB.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#a0522d] font-bold">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Note / Callout */}
              {section.note && (
                <p className="text-[#a0522d] font-medium italic text-sm sm:text-base bg-[#fdf8f4] p-4 rounded-xl border border-[#e8c97e]/40">
                  {section.note}
                </p>
              )}
            </section>
          ))}

          {/* Closing Paragraph */}
          {post.closing && (
            <div className="p-6 rounded-2xl bg-white/80 border border-[#e8c97e]/40 shadow-sm">
              <p className="text-base sm:text-lg leading-relaxed text-[#2a1810] font-medium">
                {post.closing}
              </p>
            </div>
          )}
        </div>

        {/* CTA Card at End of Every Post */}
        <div className="bg-gradient-to-br from-[#6b1d2f] to-[#4a101f] rounded-3xl p-8 sm:p-12 text-center text-white shadow-luxury border border-[#c9a96e]/40 space-y-6">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gold-light">
            Ready to create your animated wedding card?
          </h3>
          <p className="text-white/80 text-base max-w-lg mx-auto leading-relaxed">
            Choose from dozens of elegant, WhatsApp-ready wedding invitation templates starting at just ₹499.
          </p>
          <div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-[#2a1810] font-bold text-base hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            >
              Browse Templates →
            </Link>
          </div>
        </div>

        {/* More from the Blog */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-[#e8c97e]/30 space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-[#2a1810]">
              More Wedding Guides &amp; Tips
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-6 rounded-2xl bg-white/80 border border-[#e8c97e]/30 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-xs font-semibold text-[#a0522d] uppercase tracking-wider mb-2">
                    {related.date}
                  </div>
                  <h3 className="font-playfair font-bold text-[#2a1810] group-hover:text-[#6b1d2f] transition-colors leading-snug text-base">
                    {related.title}
                  </h3>
                  <p className="text-xs text-[#6b3d2a] line-clamp-2 mt-2">
                    {related.excerpt}
                  </p>
                  <span className="inline-block mt-3 text-xs font-semibold text-[#a0522d]">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
