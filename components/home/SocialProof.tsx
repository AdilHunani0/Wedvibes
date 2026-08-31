'use client'

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Pune', 'Jaipur', 'Kolkata', 'Surat']

export function SocialProof() {
  return (
    <div className="bg-maroon overflow-hidden border-y border-gold/20 shadow-inner">
      {/* Marquee cities bar */}
      <div className="py-3 overflow-hidden bg-black/20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs tracking-widest uppercase text-gold/70 font-medium">
              <span>Serving Couples in {city}</span>
              <span className="text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </div>
  )
}
