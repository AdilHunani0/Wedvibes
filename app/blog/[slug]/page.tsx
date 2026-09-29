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
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#fcf9f5] py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b2635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#a0522d] font-medium mb-10 hover:text-[#8b2635] transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-12 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl" role="img" aria-label="Post icon">
              {post.heroEmoji}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a0522d] bg-[#f9f0e3] px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-[#a0522d]/60">{post.publishedDate}</span>
            <span className="text-xs text-[#a0522d]/60 flex items-center gap-1">
              <svg
                width="11"
                height="11"
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

          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2a1810] font-extrabold leading-tight">
            {post.title}
          </h1>

          <p className="text-[#6b3d2a] text-lg leading-relaxed">
            {post.description}
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
        </header>

        {/* Article body */}
        <article className="space-y-10">
          {post.sections.map((section, i) => (
            <section
              key={i}
              className={
                section.highlight
                  ? 'bg-gradient-to-br from-[#8b2635]/5 to-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-2xl p-6 md:p-8'
                  : 'space-y-4'
              }
            >
              {section.highlight ? (
                <div className="flex gap-4 items-start">
                  <span className="text-[#c9a96e] text-2xl mt-0.5">✦</span>
                  <p className="text-[#2a1810] font-semibold text-lg leading-relaxed italic">
                    {section.highlight}
                  </p>
                </div>
              ) : (
                <>
                  {section.heading && (
                    <h2 className="font-playfair text-2xl font-bold text-[#2a1810]">
                      {section.heading}
                    </h2>
                  )}
                  {section.body ? (
                    <p className="text-[#6b3d2a] leading-relaxed text-base">
                      {section.body}
                    </p>
                  ) : null}
                  {section.list && section.list.length > 0 && (
                    <ul className="space-y-3 mt-2">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-[#c9a96e] mt-1 flex-shrink-0">✦</span>
                          <span className="text-[#6b3d2a] leading-relaxed text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </section>
          ))}
        </article>

        {/* CTA card */}
        <div className="mt-16 bg-gradient-to-br from-[#8b2635] to-[#c0392b] rounded-3xl p-8 md:p-10 text-center shadow-xl">
          <p className="text-white/80 text-sm uppercase tracking-widest font-semibold mb-3">
            Ready to get started?
          </p>
          <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold mb-4">
            {post.cta.text}
          </h3>
          <Link
            href={post.cta.href}
            className="inline-flex items-center gap-2 bg-white text-[#8b2635] font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            {post.cta.label}
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

        {/* Related posts */}
        <div className="mt-16">
          <h2 className="font-playfair text-2xl font-bold text-[#2a1810] mb-8">
            More from the Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8c97e]/30 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-2xl mb-3 block">{related.heroEmoji}</span>
                  <h3 className="font-playfair font-bold text-[#2a1810] group-hover:text-[#8b2635] transition-colors duration-200 text-sm leading-snug mb-2">
                    {related.title}
                  </h3>
                  <span className="text-xs text-[#a0522d] font-medium">
                    {related.readTime} →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
