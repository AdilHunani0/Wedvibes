export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
          <path d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C14.7733 2.5 17.269 3.68411 19.0347 5.56708" />
          <path d="M21.5 2.5L21.5 6.5L17.5 6.5" />
          <rect x="10" y="8" width="4" height="8" rx="2" />
        </svg>
      ),
      title: 'Choose a template',
      desc: 'Browse 6+ stunning animated templates across wedding, engagement and more categories.',
    },
    {
      number: '02',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      title: 'Personalise it',
      desc: 'Add names, dates, venue, photos and a message. Watch your card come to life in real-time.',
    },
    {
      number: '03',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      ),
      title: 'Pay & Share',
      desc: 'Pay securely via UPI or card. Get your shareable link instantly. Send to 100+ guests via WhatsApp.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-paper relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Simple process</p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-foreground tracking-wide">How WedVibe works</h2>
        </div>

        {/* Vertical list on mobile, horizontal grid on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-8 md:p-10 rounded-2xl border border-gold/20 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-luxury transition-all duration-500 group flex md:flex-col items-start gap-6 md:gap-8 hover:-translate-y-2"
            >
              {/* Connector for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[4.5rem] -right-5 w-10 h-[1px] bg-gold/40 z-10" />
              )}
              {/* Step number */}
              <p className="text-6xl md:text-7xl font-playfair text-foreground/5 group-hover:text-gold/10 transition-colors absolute top-6 right-6 select-none">
                {step.number}
              </p>
              {/* Icon */}
              <div className="flex-shrink-0 p-4 rounded-full bg-gold/5 border border-gold/20 group-hover:bg-gold/10 transition-colors z-10 relative">
                {step.icon}
              </div>
              {/* Text */}
              <div className="relative z-10 pt-2 md:pt-0">
                <h3 className="font-playfair text-xl md:text-2xl text-foreground mb-3 font-semibold">{step.title}</h3>
                <p className="text-sm md:text-base text-brown-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
