import Link from 'next/link'

export function CTABanner() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-[#4a101f] via-maroon to-[#4a101f] relative overflow-hidden">
      {/* Subtle luxury glow overlays */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23c9a96e\\' fill-opacity=\\'0.05\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-6 sm:left-16 text-5xl sm:text-7xl animate-pulse">🌹</div>
        <div className="absolute bottom-8 right-6 sm:right-16 text-4xl sm:text-6xl">✦</div>
        <div className="absolute top-1/2 left-1/4 text-3xl sm:text-5xl -rotate-12">💍</div>
      </div>
      
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <p className="text-gold/80 text-xs tracking-[0.3em] uppercase font-medium mb-4 sm:mb-6">Start today</p>
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-wide leading-tight">
          Your perfect invite awaits
        </h2>
        <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-sm sm:max-w-xl mx-auto font-light leading-relaxed">
          Join 2,400+ Indian families who shared their love stories with WedVibe
        </p>
        <Link
          href="/templates"
          id="cta-banner-btn"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-gradient-to-r from-gold to-[#b8944e] text-maroon px-10 sm:px-12 py-4.5 rounded-full font-semibold text-lg sm:text-xl hover:brightness-110 transition-all hover:-translate-y-1 shadow-luxury active:scale-95"
        >
          Start creating now ✦
        </Link>
        <p className="text-white/60 text-xs sm:text-sm mt-6 sm:mt-8 tracking-widest uppercase">No signup required to browse · Starts at ₹99</p>
      </div>
    </section>
  )
}
