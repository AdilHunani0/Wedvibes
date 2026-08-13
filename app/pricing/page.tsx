import { PricingSection } from '@/components/home/PricingSection'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing Plans | WedVibe',
  description: 'Simple and transparent pricing for individuals and wedding planners.',
}

export default function PricingPage() {
  const faqs = [
    { q: 'How long does card generation take?', a: 'Your invitation is built instantly! Usually, within 10-30 seconds after completing the checkout payment.' },
    { q: 'Can I change details after payment?', a: 'Yes! You can update text, dates, photos, and venues at any time from your client dashboard without paying extra.' },
    { q: 'Can I add custom music tracks?', a: 'Standard and Premium cards allow adding YouTube link audios or uploading MP3 files. Basic cards support generic instrumental themes.' },
    { q: 'What is the planner program?', a: 'It allows planners to purchase bulk credits at up to 45% discount. Credits never expire and can be used on all template designs.' },
  ]

  return (
    <div className="space-y-12">
      <PricingSection />

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#e8c97e]/20 space-y-10">
        <div className="text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#a07060] mt-1">Got questions? We have answers. If not, chat with us on WhatsApp.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-bold text-sm text-[#2a1810]">🌸 {faq.q}</h4>
              <p className="text-xs text-[#6b3d2a] leading-relaxed pl-5">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="bg-[#2a1810] text-center py-16 px-4">
        <h3 className="font-playfair text-xl sm:text-2xl text-white mb-3">Are you a professional wedding planner?</h3>
        <p className="text-[#a07060] text-xs max-w-md mx-auto mb-6">Explore bulk packages and custom white-label portals designed specifically for agencies.</p>
        <Link
          href="/planners"
          className="inline-block text-xs font-semibold px-6 py-3 bg-[#c9a96e] text-[#2a1810] rounded-xl hover:bg-[#b8944e] transition-colors"
        >
          View Planner Packages →
        </Link>
      </section>
    </div>
  )
}
