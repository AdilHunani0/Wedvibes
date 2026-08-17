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
  title: 'Planner Program | WedVibe',
  description: 'Scale your event planning business by offering stunning animated invitations to your clients.',
}

export default async function PlannersPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const actionHref = user ? '/dashboard/credits' : '/auth/signup?role=planner'
  const actionText = user ? 'Go to Planner Wallet ✦' : 'Register as a Planner ✦'
  const planActionText = user ? 'Buy Now' : 'Get Started'

  return (
    <div className="space-y-20 py-12">
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
    </div>
  )
}
