'use client'

import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper min-h-[90vh] flex items-center pt-24 pb-20">
      {/* Background soft glows */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />
      </div>
      <div className="absolute left-0 bottom-0 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-maroon/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 shadow-sm border border-gold/40 mb-6 sm:mb-8 backdrop-blur-sm">
              <span className="text-gold text-xs">✦</span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-maroon">
                India&apos;s finest animated invites
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-playfair text-4xl sm:text-6xl lg:text-[5.5rem] text-foreground leading-[1.1] mb-6 tracking-wide">
              Your love story,<br />
              <span className="text-gold-gradient italic pr-2">beautifully told</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg lg:text-xl text-brown-muted leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Stunning animated digital wedding invitations your guests will treasure. Share instantly on WhatsApp. No app required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
              <Link
                href="/templates"
                id="hero-explore-btn"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-[#6b1d2f] to-[#4a101f] text-gold-light px-9 py-4 rounded-full font-medium hover:shadow-luxury-hover transition-all duration-300 hover:-translate-y-1 shadow-luxury text-sm sm:text-base border border-maroon/50"
              >
                Explore Templates
              </Link>
              <Link
                href="#how-it-works"
                id="hero-how-btn"
                className="w-full sm:w-auto text-center bg-white/50 backdrop-blur-sm border border-gold/40 text-foreground px-9 py-4 rounded-full font-medium hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base shadow-sm hover:shadow-md"
              >
                See how it works
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center md:justify-start gap-8 sm:gap-12 w-full md:w-auto border-t border-gold/20 pt-8">
              {[
                { value: '2,400+', label: 'Cards sent' },
                { value: '6+', label: 'Templates' },
                { value: '98%', label: 'Happy couples' },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-xl sm:text-3xl font-playfair text-maroon font-semibold mb-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brown-muted font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="flex justify-center md:justify-end relative perspective-1000 order-2 mt-8 md:mt-0 w-full">
            <div className="relative w-[260px] sm:w-[300px] lg:w-[340px] aspect-[9/19.5] bg-[#1a0e08] rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border-4 border-[#2c1a14] overflow-hidden transform md:rotate-y-[-5deg] md:rotate-x-[2deg] md:hover:rotate-y-0 transition-transform duration-700 ease-out mx-auto md:mx-0">
              
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[20px] sm:h-[24px] bg-[#2c1a14] rounded-b-xl sm:rounded-b-2xl z-50"></div>
              
              {/* Simulated Card Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1b1110] to-[#2c161a] overflow-hidden">
                {/* Gold Frame */}
                <div className="absolute inset-3 border border-gold/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  
                  {/* Subtle pulsing glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-gold/5 to-transparent animate-pulse-slow"></div>
                  
                  {/* Card specific elements */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-gold/40 p-1 mb-4 sm:mb-6 animate-float relative z-10">
                    <div className="w-full h-full rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <span className="font-playfair text-lg sm:text-xl italic">R&S</span>
                    </div>
                  </div>
                  
                  <p className="text-gold/80 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium relative z-10">Together With Our Families</p>
                  <h3 className="font-playfair text-3xl sm:text-4xl text-white mb-2 leading-none relative z-10 shadow-black drop-shadow-md">Rahul<br/><span className="text-gold text-xl sm:text-2xl">&amp;</span><br/>Simran</h3>
                  
                  {/* Shimmer line */}
                  <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4 sm:my-6 relative overflow-hidden z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/40 animate-shimmer"></div>
                  </div>
                  
                  <p className="text-gold/80 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium relative z-10">Save The Date</p>
                  <p className="font-playfair text-lg sm:text-xl text-white mt-2 relative z-10">24th Nov 2026</p>
                </div>

                {/* Animated Petals (CSS) */}
                <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-rose-500/30 blur-[1px] animate-petal-1"></div>
                <div className="absolute top-1/3 right-8 w-3 h-3 rounded-full bg-gold/30 blur-[1px] animate-petal-2"></div>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-maroon/40 blur-[1px] animate-petal-3"></div>
              </div>
            </div>
            
            {/* Decorative elements behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 rounded-full blur-3xl -z-10"></div>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial { background: radial-gradient(ellipse at center, var(--tw-gradient-stops)); }
        .perspective-1000 { perspective: 1000px; }
        
        @media (min-width: 768px) {
          .md\\:rotate-y-\\[-5deg\\] { transform: rotateY(-5deg); }
          .md\\:rotate-x-\\[2deg\\] { transform: rotateX(2deg); }
          .md\\:hover\\:rotate-y-0:hover { transform: rotateY(0deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        
        @keyframes fall1 {
          0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(20px, 150px) rotate(45deg); opacity: 0; }
        }
        @keyframes fall2 {
          0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-30px, 200px) rotate(-60deg); opacity: 0; }
        }
        @keyframes fall3 {
          0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(15px, 120px) rotate(90deg); opacity: 0; }
        }
        .animate-petal-1 { animation: fall1 8s linear infinite; }
        .animate-petal-2 { animation: fall2 11s linear infinite 2s; }
        .animate-petal-3 { animation: fall3 9s linear infinite 4s; }
      `}</style>
    </section>
  )
}
