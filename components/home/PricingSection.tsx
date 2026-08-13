import Link from 'next/link'

const TIERS = [
  { 
    id: 'free', 
    name: 'Free Trial', 
    price: '₹0', 
    desc: 'Perfect to test the waters', 
    highlight: false,
    features: [
      'Access to "Rose Bloom" template',
      '2 photo slots',
      'Shareable link',
      'Mobile optimised',
      'Valid 7 days',
    ]
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: '₹499', 
    desc: 'Full luxury experience', 
    highlight: true,
    features: [
      'Access to ALL Premium templates',
      'Up to 4 photo slots',
      'Full animation suite & 3D effects',
      'Floating elements & interactive walls',
      'RSVP button included',
      'Shareable link valid 365 days',
      'No WedVibe watermark (Coming Soon)',
    ]
  },
]

export function PricingSection() {
  return (
    <section className="py-20 md:py-32 bg-paper relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Transparent pricing</p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-foreground tracking-wide mb-4">Simple, honest pricing</h2>
          <p className="text-sm sm:text-base text-brown-muted">One-time payment. No subscriptions. Share forever.</p>
        </div>

        {/* 2-col layout on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-[2rem] p-8 sm:p-12 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                tier.highlight
                  ? 'bg-gradient-to-b from-maroon to-[#4a101f] text-white shadow-luxury scale-100 md:scale-105 z-10 border border-gold/40'
                  : 'bg-white/60 backdrop-blur-md border border-gold/20 hover:border-gold/40 shadow-sm hover:shadow-luxury'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-maroon text-xs font-bold px-6 py-2 rounded-full tracking-widest uppercase shadow-md border border-white/20">
                    ✦ Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8 sm:mb-10 text-center relative">
                {/* Subtle decorative line */}
                {tier.highlight && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-px bg-gold/50"></div>}
                {!tier.highlight && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-px bg-gold/30"></div>}
                
                <h3 className={`font-playfair text-3xl mb-2 ${tier.highlight ? 'text-gold-light' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-gold/80' : 'text-brown-muted'}`}>{tier.desc}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className={`text-5xl sm:text-6xl font-playfair font-semibold tracking-tight ${tier.highlight ? 'text-white' : 'text-foreground'}`}>
                    {tier.price}
                  </span>
                  {tier.id === 'premium' && (
                    <span className={`text-sm font-medium mb-2 ${tier.highlight ? 'text-white/60' : 'text-brown-muted'}`}>/card</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-10 sm:mb-12 flex-1 mt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm sm:text-base">
                    <span className={`flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-gold' : 'text-gold'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className={`font-medium ${tier.highlight ? 'text-white/90' : 'text-foreground/80'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.id === 'free' ? '/templates' : '/templates?category=wedding'}
                className={`block text-center py-4.5 rounded-full font-semibold text-sm sm:text-base tracking-wide transition-all active:scale-95 ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-gold to-[#b8944e] text-maroon hover:shadow-lg hover:shadow-gold/20 border border-gold/50 hover:brightness-110'
                    : 'bg-transparent text-maroon hover:bg-gold/10 border border-gold/40'
                }`}
              >
                {tier.id === 'free' ? 'Browse Templates' : 'Start Creating ✦'}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-5 rounded-2xl border border-gold/20 shadow-sm hover:shadow-md transition-shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <div className="text-sm">
              <span className="text-brown-muted">Are you an Event or Wedding Planner?</span>
              <Link href="/planners" className="ml-2 text-maroon hover:text-gold font-semibold underline decoration-gold/50 underline-offset-4 transition-colors">
                View Bulk Credit Packages →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
