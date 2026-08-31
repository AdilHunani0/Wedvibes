export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-paper relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Launch Edition</p>
        <h2 className="font-playfair text-4xl sm:text-5xl text-foreground tracking-wide mb-8">Be Our First Featured Couple</h2>
        <p className="text-foreground/80 text-lg leading-relaxed italic font-playfair mb-8">
          &ldquo;We are now taking our very first orders. Create a beautiful digital invitation today and let your wedding story be the first we share with the world.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-4 border-t border-gold/10 pt-8 mt-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon to-[#4a101f] flex items-center justify-center text-gold-light font-playfair font-semibold text-lg shadow-inner">
            W
          </div>
          <div className="text-left">
            <p className="font-playfair font-semibold text-foreground text-lg tracking-wide">The WedVibe Team</p>
            <p className="text-[10px] uppercase tracking-widest text-brown-muted mt-0.5">Founders</p>
          </div>
        </div>
      </div>
    </section>
  )
}
