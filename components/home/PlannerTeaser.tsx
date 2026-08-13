import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const PLANS = [
  { name: 'Starter', price: 299900, cards: 8, credits: 24, save: 1000 },
  { name: 'Growth', price: 499900, cards: 14, credits: 42, save: 2000 },
  { name: 'Agency', price: 699900, cards: 20, credits: 60, save: 3000 },
]

const PERKS = [
  'Credits never expire',
  'Mix card types: basic, standard & premium',
  'Priority WhatsApp support',
  'Custom branded links (coming soon)',
]

export function PlannerTeaser() {
  return (
    <section className="py-24 md:py-32 bg-[#1a0d0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23c9a96e\\' fill-opacity=\\'0.03\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold/80 font-medium mb-4">For wedding planners</p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-wide">
              Scale your business<br />
              <span className="text-gold italic">with WedVibe</span>
            </h2>
            <p className="text-white/70 mb-10 leading-relaxed text-lg max-w-md">
              Buy credit packs and create beautiful animated cards for all your clients. One platform. Zero hassle.
            </p>
            <ul className="space-y-4 mb-12">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-4">
                  <span className="text-gold mt-0.5">✓</span>
                  <span className="text-white/80">{perk}</span>
                </li>
              ))}
            </ul>
            <Link href="/planners" id="planner-teaser-cta" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-[#b8944e] text-maroon px-9 py-4.5 rounded-full font-semibold hover:brightness-110 transition-all hover:-translate-y-1 shadow-luxury">
              See all planner plans →
            </Link>
          </div>
          
          <div className="grid gap-5">
            {PLANS.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-[#251511] border border-gold/10 hover:border-gold/40 transition-all duration-300 group shadow-lg">
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-white group-hover:text-gold-light transition-colors">{plan.name} Pack</h3>
                  <p className="text-xs text-white/50 mt-2 uppercase tracking-widest">{plan.cards} premium cards · {plan.credits} credits</p>
                </div>
                <div className="text-right">
                  <p className="font-playfair font-semibold text-gold text-2xl sm:text-3xl tracking-tight">{formatPrice(plan.price)}</p>
                  <p className="text-xs text-gold/80 font-medium mt-1">Save ₹{plan.save.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
