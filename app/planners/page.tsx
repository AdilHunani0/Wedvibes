import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { createServerClient } from '@/lib/supabase/server'

const PLANS = [
  { name: 'Starter Pack', price: 299900, cards: 8,  credits: 24, save: 1000, desc: 'Ideal for independent planners starting with digital invites.' },
  { name: 'Growth Pack',  price: 499900, cards: 14, credits: 42, save: 2000, desc: 'Perfect for growing agencies with active monthly clients.' },
  { name: 'Agency Pack',  price: 699900, cards: 20, credits: 60, save: 3000, desc: 'Best value for high-volume boutique event design firms.' },
]

const PERKS = [
  { title: 'No Expiration', desc: 'Your credits remain valid indefinitely. Use them whenever you have events.', icon: '⌛' },
  { title: 'High Profit Margins', desc: 'Get premium cards at a fraction of retail (₹499). Resell or pass savings to your clients.', icon: '📈' },
  { title: 'Co-Branded Invites', desc: 'Remove our badge and showcase your agency branding on the footer (coming soon).', icon: '🏷️' },
  { title: 'Dedicated Support', desc: 'Direct WhatsApp hotline for fast assistance on customizing and custom music requests.', icon: '☎️' },
]

export const metadata = {
  title: 'Wedding Planner Digital Invitation Credits India | Bulk Wedding Invites',
  description: 'Bulk digital wedding invitations for event planners in India. Get high-margin animated cards, manage client invites effortlessly, and scale your agency.',
  alternates: {
    canonical: '/planners',
  }
}

export default async function PlannersPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const actionHref = user ? '/dashboard/credits' : '/auth/signup?role=planner'
  const actionText = user ? 'Go to Planner Wallet ✦' : 'Register as a Planner ✦'
  const planActionText = user ? 'Buy Now' : 'Get Started'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do wedding planner digital invitation credits work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You purchase credits in bulk at a discounted rate. Each time you customize and activate a premium digital wedding invitation for a client, one credit is deducted from your wallet.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do WedVibe credits expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, our bulk digital wedding invitations credits never expire. You can use them across multiple wedding seasons.'
        }
      }
    ]
  }

  return (
    <div className="space-y-20 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest font-bold text-[#a0522d] bg-[#fdf8f4] border border-[#e8c97e]/40 px-3.5 py-1 rounded-full">
          Planner Solutions
        </span>
        <h1 className="font-playfair text-4xl sm:text-5xl font-extrabold text-[#2a1810] leading-tight max-w-2xl mx-auto">
          Scale Your Event Business With <span className="text-[#a0522d] italic">WedVibe Credits</span>
        </h1>
        <p className="text-sm text-[#6b3d2a] max-w-xl mx-auto leading-relaxed">
          Unlock high-margin animated invitations for all your wedding, engagement, and anniversary clients. Buy credit packs and customize on-demand.
        </p>
        <Link
          href={actionHref}
          className="inline-block px-8 py-4 rounded-xl bg-[#2a1810] text-[#e8c97e] font-semibold hover:bg-[#3d2218] transition-all hover:-translate-y-0.5 shadow-lg"
        >
          {actionText}
        </Link>
      </section>

      {/* Perks Grid */}
      <section className="bg-white py-16 border-y border-[#e8c97e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
              Why Event Planners Partner With Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PERKS.map((perk) => (
              <div key={perk.title} className="p-5 rounded-2xl bg-[#fdf8f4]/40 border border-[#e8c97e]/10 space-y-3">
                <span className="text-3xl block">{perk.icon}</span>
                <h4 className="font-bold text-sm text-[#2a1810]">{perk.title}</h4>
                <p className="text-xs text-[#a07060] leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
            Credit Packs Pricing
          </h2>
          <p className="text-xs text-[#a07060] mt-1">Get significant bulk savings. Login to purchase directly from your dashboard.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div key={plan.name} className="bg-white border border-[#e8c97e]/20 p-6 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-[#2a1810]">{plan.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ₹{plan.save.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-[#a07060] leading-relaxed">{plan.desc}</p>
                <div className="text-3xl font-black text-[#a0522d]">
                  {formatPrice(plan.price)}
                </div>
                <div className="bg-[#fdf8f4]/60 border border-[#e8c97e]/10 p-3.5 rounded-xl space-y-1.5 text-xs text-[#6b3d2a]">
                  <div className="flex justify-between">
                    <span>Premium Cards</span>
                    <span className="font-bold">{plan.cards} cards</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credits included</span>
                    <span className="font-bold">{plan.credits}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>You save vs retail</span>
                    <span>₹{plan.save.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              <Link
                href={actionHref}
                className="block text-center mt-8 py-3 rounded-xl bg-[#2a1810] text-[#e8c97e] text-xs font-bold hover:bg-[#3d2218] transition-colors"
              >
                {planActionText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6 text-[#6b3d2a] leading-relaxed">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
            The Best Bulk Digital Wedding Invitations for Event Planners in India
          </h2>
          <p>
            As a wedding planner or event agency in India, offering <strong>digital wedding invitations</strong> is no longer just a trend—it's an expectation. Couples want high-quality, animated digital cards that they can instantly share via WhatsApp. However, buying individual premium cards for every client cuts into your margins and slows down your workflow.
          </p>
          <p>
            With WedVibe's <strong>wedding planner digital invitation credits</strong>, you can unlock agency-level pricing on India's most stunning animated wedding cards. Purchase in bulk, customize on-demand, and manage all your clients' invitations from a single, centralized dashboard.
          </p>

          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#2a1810] mt-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-[#2a1810]">How do wedding planner digital invitation credits work?</h4>
              <p className="mt-2">You purchase credits in bulk at a discounted rate. Each time you customize and activate a premium digital wedding invitation for a client, one credit is deducted from your wallet.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#2a1810]">Do WedVibe credits expire?</h4>
              <p className="mt-2">No, our bulk digital wedding invitations credits never expire. You can use them across multiple wedding seasons without worrying about losing your investment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
