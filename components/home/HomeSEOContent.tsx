import Link from 'next/link'

export function HomeSEOContent() {
  const bulletPoints = [
    {
      title: 'Save money',
      desc: 'Our online wedding card costs just ₹499 — a fraction of printed cards',
    },
    {
      title: 'Save time',
      desc: 'Share on WhatsApp in minutes, reach 500 guests instantly',
    },
    {
      title: 'Save the planet',
      desc: 'Zero paper, zero waste, 100% beautiful',
    },
    {
      title: 'Always accessible',
      desc: 'Your guests can revisit the invite anytime, no misplacing',
    },
  ]

  const steps = [
    'Choose your favourite animated template from our growing collection',
    'Enter your wedding details — names, date, venue, and mehendi/haldi timings',
    'Receive your personalised digital shaadi card within minutes',
    'Share directly on WhatsApp, Instagram, or any messaging app',
  ]

  return (
    <section
      aria-labelledby="seo-heading"
      className="bg-[#fdf8f4] border-t border-[#e8c97e]/30 py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Heading (H2) */}
        <div className="text-center space-y-3">
          <span className="text-[#a0522d] font-bold tracking-widest uppercase text-xs">
            Why WedVibe
          </span>
          <h2
            id="seo-heading"
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2a1810] leading-tight max-w-3xl mx-auto"
          >
            Why Thousands of Indian Couples Choose WedVibe for Their Digital Wedding Invitations
          </h2>
        </div>

        {/* Introductory Body Content */}
        <div className="text-[#6b3d2a] leading-relaxed space-y-4 text-base sm:text-lg">
          <p>
            Planning a wedding in India is a celebration like no other — and your wedding
            invitation should match that energy. WedVibe creates animated digital wedding
            cards that your guests will actually save and remember, at just ₹499.
          </p>
          <p>
            Forget expensive printed cards that arrive late and get lost. With WedVibe, your
            digital wedding invitation is ready within minutes and shared instantly on
            WhatsApp — the way every Indian family actually communicates. No app downloads, no
            complicated links. Just tap and share with your entire contact list.
          </p>
        </div>

        {/* Sub Heading 1: Animated Wedding Cards */}
        <div className="space-y-4">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
            Animated Wedding Cards Made for Indian Couples
          </h3>
          <p className="text-[#6b3d2a] leading-relaxed text-base sm:text-lg">
            Whether you are planning a grand Hindu shaadi in Delhi, an intimate nikah in
            Hyderabad, or a fusion wedding in Mumbai — WedVibe has a design for every
            celebration. Our animated shaadi cards feature traditional motifs, elegant
            typography, and smooth motion graphics that bring your invitation to life on any
            smartphone screen.
          </p>
        </div>

        {/* Sub Heading 2: Smart Choice Bullet List */}
        <div className="space-y-5">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
            Why Digital Wedding Invitations Are the Smart Choice
          </h3>
          <ul className="space-y-3 pl-0 list-none">
            {bulletPoints.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#e8c97e]/35 shadow-sm"
              >
                <span className="text-[#a0522d] font-bold text-lg leading-none mt-1">✦</span>
                <span className="text-sm sm:text-base text-[#6b3d2a] leading-relaxed">
                  <strong className="text-[#2a1810] font-bold">{item.title}:</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sub Heading 3: How WedVibe Works Step List */}
        <div className="space-y-5">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
            How WedVibe Works
          </h3>
          <ol className="space-y-3.5 pl-0 list-none">
            {steps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-[#e8c97e]/35 shadow-sm"
              >
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6b1d2f] to-[#4a101f] text-gold-light font-bold text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm sm:text-base text-[#6b3d2a] leading-relaxed pt-1">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing Paragraph */}
        <div className="p-6 rounded-2xl bg-white/60 border border-[#e8c97e]/40 shadow-sm">
          <p className="text-[#6b3d2a] text-base sm:text-lg leading-relaxed">
            With WedVibe, creating a wedding card online in India has never been simpler or
            more affordable. Join thousands of happy couples who&apos;ve already made the
            switch to digital. Your love story deserves a stunning entrance — order your
            animated wedding invitation today.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-2">
          <Link
            href="/templates"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-[#6b1d2f] to-[#4a101f] text-gold-light font-semibold text-base sm:text-lg hover:shadow-luxury-hover transition-all duration-300 hover:-translate-y-0.5 shadow-luxury border border-maroon/50"
          >
            Browse Templates
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
