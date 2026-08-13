const TESTIMONIALS = [
  {
    quote: "Our guests kept asking where we got this card from — 3 of them ordered their own for upcoming events. Worth every rupee!",
    name: "Priya & Rahul",
    city: "Mumbai",
    event: "Wedding · November 2024",
    stars: 5,
    initial: "P",
  },
  {
    quote: "Shared with 200 guests on WhatsApp. Got compliments for weeks. The door-opening animation absolutely blew everyone away.",
    name: "Ayesha & Imran",
    city: "Bangalore",
    event: "Nikah · October 2024",
    stars: 5,
    initial: "A",
  },
  {
    quote: "As a wedding planner I've ordered 47 cards so far. The credit system saves me lakhs compared to buying individually.",
    name: "Meera Kapoor",
    city: "Delhi",
    event: "Wedding Planner",
    stars: 5,
    initial: "M",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-paper relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Real couples, real results</p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-foreground tracking-wide">What our customers say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 border border-gold/20 hover:border-gold/40 shadow-sm hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 relative">
              {/* Elegant quote mark */}
              <div className="absolute top-8 right-8 text-gold/20 font-playfair text-7xl leading-none italic pointer-events-none select-none">
                &rdquo;
              </div>
              
              <div className="flex mb-6 relative z-10">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>
              
              <p className="text-foreground/80 text-base leading-relaxed mb-8 italic font-playfair relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-4 border-t border-gold/10 pt-6 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon to-[#4a101f] flex items-center justify-center text-gold-light font-playfair font-semibold text-lg shadow-inner">
                  {t.initial}
                </div>
                <div>
                  <p className="font-playfair font-semibold text-foreground text-lg tracking-wide">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-brown-muted mt-0.5">{t.city} · {t.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
