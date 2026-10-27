import Link from 'next/link'

const CITIES = [
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Surat', slug: 'surat' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Hyderabad', slug: 'hyderabad' },
]

export function CityLinks() {
  return (
    <section className="py-20 bg-[#fdf8f4] border-t border-[#e8c97e]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="space-y-3">
          <span className="text-[#a0522d] font-bold tracking-widest uppercase text-xs">
            Nationwide Delivery
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#2a1810]">
            We Serve Couples Across India
          </h2>
          <p className="text-[#6b3d2a] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover how WedVibe helps couples create stunning animated digital wedding invitations in major cities.
          </p>
        </div>

        {/* City Grid: 3 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/digital-wedding-invitation-${c.slug}`}
              className="py-3 px-4 rounded-xl bg-white border border-[#e8c97e]/50 text-[#a0522d] font-medium text-sm sm:text-base hover:bg-[#a0522d] hover:text-white hover:border-[#a0522d] transition-all duration-200 shadow-sm text-center flex items-center justify-center"
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Internal links */}
        <div className="pt-8 border-t border-[#e8c97e]/20">
          <p className="text-xs uppercase tracking-widest font-bold text-[#a0522d] mb-4">
            Explore More
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/templates"
              className="text-[#a0522d] font-semibold underline underline-offset-4 hover:text-[#7a3a20] transition-colors"
            >
              Browse all animated templates
            </Link>
            <Link
              href="/pricing"
              className="text-[#a0522d] font-semibold underline underline-offset-4 hover:text-[#7a3a20] transition-colors"
            >
              View pricing — starts at ₹499
            </Link>
            <Link
              href="/how-it-works"
              className="text-[#a0522d] font-semibold underline underline-offset-4 hover:text-[#7a3a20] transition-colors"
            >
              See how it works in 3 steps
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
