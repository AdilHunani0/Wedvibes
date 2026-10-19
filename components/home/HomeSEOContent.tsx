import Link from 'next/link'

export function HomeSEOContent() {
  return (
    <section
      aria-label="About WedVibe digital wedding invitations"
      className="bg-[#fdf8f4] border-t border-[#e8c97e]/30 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <span className="text-[#a0522d] font-bold tracking-widest uppercase text-xs">
            Why WedVibe
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#2a1810]">
            India&apos;s Most Loved Animated Digital Wedding Invitations — Just ₹499
          </h2>
        </div>

        {/* Body copy — 300 words, all 8 keywords woven in naturally */}
        <div className="max-w-none text-[#6b3d2a] leading-relaxed space-y-5 text-base">
          <p>
            Planning a wedding in India is a celebration like no other — and your wedding
            invitation should match that energy. WedVibe creates{' '}
            <strong>animated wedding cards</strong> that your guests will actually save and
            remember, at just <strong>₹499</strong>. No expensive printing, no courier delays,
            no stress.
          </p>

          <p>
            Forget printed cards that arrive late or get lost in transit. With WedVibe, your{' '}
            <strong>digital wedding invitation</strong> is ready within minutes and shared
            instantly on <strong>WhatsApp</strong> — the way every Indian family actually
            communicates. No app downloads, no complicated links. Just tap and share with your
            entire contact list in seconds.
          </p>

          <h3 className="font-playfair text-xl font-bold text-[#2a1810] pt-2">
            Animated Shaadi Cards Made for Every Indian Celebration
          </h3>
          <p>
            Whether you are planning a grand Hindu shaadi in Delhi, an intimate Nikah in
            Hyderabad, or a fusion wedding in Mumbai — WedVibe has a design for every
            celebration. Our <strong>animated shaadi invitations</strong> feature traditional
            motifs, elegant typography, and smooth motion graphics that bring your invitation
            to life on any smartphone screen.
          </p>

          <h3 className="font-playfair text-xl font-bold text-[#2a1810] pt-2">
            The Smarter Way to Create a Wedding Card Online in India
          </h3>
          <ul className="space-y-2 list-none pl-0">
            <li>💛 <strong>Save money</strong> — our <strong>online wedding card maker</strong> costs just ₹499, a fraction of printed cards</li>
            <li>⚡ <strong>Save time</strong> — share on WhatsApp in minutes, reach 500 guests instantly</li>
            <li>🌿 <strong>Save the planet</strong> — zero paper, zero waste, 100% beautiful</li>
            <li>📱 <strong>Always accessible</strong> — guests can revisit the invite anytime, no misplacing</li>
          </ul>

          <h3 className="font-playfair text-xl font-bold text-[#2a1810] pt-2">
            How It Works
          </h3>
          <p>
            Choose your favourite template, enter your details — names, date, venue, and
            pre-wedding events — and receive your personalised{' '}
            <strong>digital shaadi card</strong> within minutes. Share directly on WhatsApp,
            Instagram, or any messaging app. With WedVibe, creating a{' '}
            <strong>wedding card online in India</strong> has never been simpler or more
            affordable. Join thousands of happy couples who have already made the switch.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/templates"
            className="px-8 py-4 rounded-xl bg-[#2a1810] text-[#e8c97e] font-semibold text-center hover:bg-[#3d2218] transition-colors shadow-lg"
          >
            Browse Animated Templates
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl border-2 border-[#a0522d] text-[#a0522d] font-semibold text-center hover:bg-[#a0522d]/10 transition-colors"
          >
            View Pricing — ₹499
          </Link>
        </div>
      </div>
    </section>
  )
}
