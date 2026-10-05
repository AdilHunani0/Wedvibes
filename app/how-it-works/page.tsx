import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works — Create Your Wedding Card in 3 Easy Steps',
  description:
    'Learn how to create a stunning digital wedding invitation on WedVibe in just 3 simple steps. Choose a template, personalise it with your details, and share instantly via WhatsApp.',
}

const steps = [
  {
    number: '01',
    badge: 'Browse & Pick',
    title: 'Choose Your Perfect Template',
    description:
      "Explore our collection of premium animated wedding invitation templates — from classic floral to modern geometric. Each template is crafted by professional designers and fully animated. Filter by style, colour palette, or occasion (wedding, engagement, reception) to find your perfect match.",
    highlights: ['6+ premium animated templates', 'Filter by style & occasion', 'Free preview before you buy'],
    image: '/hiw-step1.jpg',
    imageAlt: 'WedVibe template gallery showing animated wedding card options',
    accent: 'from-gold/10 to-gold/5',
    badgeColor: 'bg-gold/10 text-[#8b6914] border-gold/30',
    flip: false,
  },
  {
    number: '02',
    badge: 'Personalise',
    title: 'Add Your Details & Photos',
    description:
      'Our live editor lets you customise every detail in real-time — see changes instantly on the preview. Add bride & groom names, wedding date, venue, a personal message, and even your couple photo. The card updates live as you type, making it feel truly yours.',
    highlights: ['Live real-time preview', 'Add couple photo & names', 'Custom message & venue details'],
    image: '/hiw-step2.jpg',
    imageAlt: 'WedVibe customization editor with live preview of wedding card',
    accent: 'from-maroon/5 to-maroon/10',
    badgeColor: 'bg-maroon/10 text-maroon border-maroon/20',
    flip: true,
  },
  {
    number: '03',
    badge: 'Share & Celebrate',
    title: 'Pay, Share & Wow Your Guests',
    description:
      "Once your card is perfect, pay securely via UPI, credit/debit card or net banking. You'll instantly get a shareable link to your animated wedding card. Share directly on WhatsApp, copy the link, or even embed it. Your guests will be amazed when they open it!",
    highlights: ['Instant shareable link', 'WhatsApp & social sharing', 'Secure UPI & card payment'],
    image: '/hiw-step3.jpg',
    imageAlt: 'WedVibe sharing page with WhatsApp share button and card preview',
    accent: 'from-gold/10 to-gold/5',
    badgeColor: 'bg-gold/10 text-[#8b6914] border-gold/30',
    flip: false,
  },
]

const faqs = [
  {
    q: 'How long does it take to create my wedding card?',
    a: "Most couples complete their card in under 10 minutes! Simply choose a template, fill in your details, and you're ready to share.",
  },
  {
    q: 'Can I preview the card before paying?',
    a: "Yes! You can fully customise your card and see the live animated preview completely free. You only pay when you're ready to unlock the shareable link.",
  },
  {
    q: 'How do I share the card with my guests?',
    a: 'You get a unique shareable link that works on any device. You can share it directly on WhatsApp, send via SMS, email, or post on social media.',
  },
  {
    q: 'Can I edit the card after purchasing?',
    a: 'Yes, you can make edits to your card even after purchase. Any changes are reflected immediately on the shareable link.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking — all secured by Razorpay.',
  },
]

const features = [
  { icon: '⚡', label: 'Ready in Minutes', sub: 'No design skills needed' },
  { icon: '🎨', label: 'Fully Animated', sub: 'Stunning motion effects' },
  { icon: '📱', label: 'WhatsApp Ready', sub: 'One-tap sharing' },
  { icon: '🔒', label: 'Secure Payments', sub: 'UPI, Cards & more' },
]

export default function HowItWorksPage() {
  return (
    <main className="bg-[#fffaf5] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28 text-center px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-maroon/5 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium mb-4">Simple · Beautiful · Fast</p>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 leading-tight">
            How to Create Your{' '}
            <span className="text-gold-gradient">Wedding Card</span>
          </h1>
          <p className="text-brown-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            From choosing a stunning template to sharing with your guests — WedVibe makes the entire process effortless, beautiful, and done in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-maroon text-white font-medium text-sm shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              Browse Templates
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gold/40 text-foreground font-medium text-sm hover:bg-gold/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Step progress bar ── */}
      <div className="max-w-lg mx-auto px-4 mb-4">
        <div className="flex items-center gap-0">
          {steps.map((s, i) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-maroon text-white flex items-center justify-center text-xs font-semibold shadow-md">
                {s.number}
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-gradient-to-r from-maroon/60 to-gold/40" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-brown-muted tracking-wide">
          <span>Choose</span>
          <span>Personalise</span>
          <span>Share</span>
        </div>
      </div>

      {/* ── Steps ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-24 md:space-y-32">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            id={`step-${step.number}`}
            className={`flex flex-col ${step.flip ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 relative group">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.accent} blur-2xl scale-95 group-hover:scale-100 transition-transform duration-500`} />
              <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-luxury group-hover:shadow-luxury-hover transition-all duration-500 group-hover:-translate-y-1">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={720}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority={idx === 0}
                />
              </div>
              <span className="absolute -top-5 -left-4 font-playfair text-8xl font-bold text-foreground/[0.04] select-none pointer-events-none leading-none">
                {step.number}
              </span>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-5">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border ${step.badgeColor}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                Step {step.number} · {step.badge}
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl text-foreground leading-snug">
                {step.title}
              </h2>
              <p className="text-brown-muted text-base leading-relaxed">
                {step.description}
              </p>
              <ul className="space-y-2.5 pt-1">
                {step.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* ── Why WedVibe ── */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-[#fffaf5] to-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Why couples love us</p>
            <h2 className="font-playfair text-3xl sm:text-4xl text-foreground">Built for Indian weddings</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-gold/15 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                <p className="font-playfair text-base text-foreground font-semibold mb-1">{f.label}</p>
                <p className="text-xs text-brown-muted">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Got questions?</p>
            <h2 className="font-playfair text-3xl sm:text-4xl text-foreground">Frequently Asked</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gold/20 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-gold/5 transition-colors">
                  <span className="font-medium text-foreground text-sm sm:text-base">{faq.q}</span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center group-open:rotate-45 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-brown-muted leading-relaxed border-t border-gold/10 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden border border-gold/20 bg-gradient-to-br from-maroon/90 to-[#3d0d1a] p-12 md:p-16 shadow-luxury">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-gold/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full border border-gold/5" />
            </div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">Ready to begin?</p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-snug">
              Create Your Wedding Card<br />
              <span className="text-gold-gradient">in Minutes</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-10 max-w-md mx-auto">
              Join thousands of couples who shared their special day beautifully with WedVibe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-[#2a1810] font-semibold text-sm hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
              >
                Get Started — It&apos;s Free
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

