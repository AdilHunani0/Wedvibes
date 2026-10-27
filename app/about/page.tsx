import Link from 'next/link'

export const metadata = {
  title: "About WedVibe — India's Digital Shaadi Card Brand | WedVibe",
  description:
    "WedVibe is India's leading digital shaadi card platform. Animated wedding invitations at \u20b9499, shared on WhatsApp. Made with love for Indian couples.",
  alternates: { canonical: 'https://wedvibe.in/about' },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b2635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#a0522d] tracking-[0.2em] text-xs font-semibold uppercase">Our Story</span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#2a1810] font-extrabold tracking-tight">
            About WedVibe — India&apos;s Animated Digital Shaadi Card Platform
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mt-6" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-[#e8c97e]/30 space-y-8">
          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">Crafting Digital Elegance</h2>
            <p className="text-[#6b3d2a] leading-relaxed text-lg">
              At WedVibe, we believe that your wedding invitation is the prologue to your beautiful story. It sets the tone, builds the anticipation, and carries the warmth of your upcoming celebration. We set out to bridge the gap between traditional Indian luxury invitations and modern digital convenience.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">Our Mission</h2>
            <p className="text-[#6b3d2a] leading-relaxed text-lg">
              Our mission is to provide couples with breathtakingly beautiful, animated, and fully customizable digital wedding cards. We pour our hearts into designing templates that feel organic, luxurious, and deeply personal—ensuring that every digital card sent feels just as special as a physical, gold-foiled invite.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">The WedVibe Promise</h2>
            <ul className="list-none space-y-3 text-[#6b3d2a] leading-relaxed text-lg">
              <li className="flex items-start">
                <span className="text-[#c9a96e] mr-3">✦</span>
                <span><strong>Uncompromising Quality:</strong> Premium typography, rich color palettes, and fluid animations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a96e] mr-3">✦</span>
                <span><strong>Effortless Creation:</strong> A seamless customization experience that takes minutes, not weeks.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a96e] mr-3">✦</span>
                <span><strong>Eco-Friendly Elegance:</strong> Luxurious invitations without the environmental footprint of traditional printing.</span>
              </li>
            </ul>
          </section>

          <div className="pt-6 border-t border-[#e8c97e]/30 mt-8">
            <section className="space-y-4 text-center">
              <h2 className="font-playfair text-xl text-[#2a1810] font-bold italic">"Your love story, beautifully told."</h2>
              <p className="text-[#6b3d2a] leading-relaxed text-md max-w-2xl mx-auto">
                Founded by <strong>Adil Hunani</strong>, WedVibe was created to give couples a modern, elegant, and effortless way to share the joy of their special day with the people they love the most.
              </p>
            </section>
          </div>

          {/* Explore More Internal Links */}
          <div className="pt-6 border-t border-[#e8c97e]/30 text-center">
            <p className="text-xs uppercase tracking-widest font-bold text-[#a0522d] mb-4">
              Explore More
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/templates"
                className="text-[#a0522d] font-semibold underline underline-offset-4 hover:text-[#7a3a20] transition-colors"
              >
                See our designs
              </Link>
              <Link
                href="/how-it-works"
                className="text-[#a0522d] font-semibold underline underline-offset-4 hover:text-[#7a3a20] transition-colors"
              >
                Learn how we work
              </Link>
              <Link
                href="/contact"
                className="text-[#a0522d] font-semibold underline underline-offset-4 hover:text-[#7a3a20] transition-colors"
              >
                Get in touch with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
