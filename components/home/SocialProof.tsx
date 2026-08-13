'use client'

import { useEffect, useState } from 'react'

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Pune', 'Jaipur', 'Kolkata', 'Surat']

const RECENT_ACTIVITY = [
  'Priya from Mumbai just ordered Rose Bloom',
  'Ananya from Delhi customised Royal Dark',
  'Meera from Bangalore ordered Blush Minimal',
  'Shreya from Hyderabad just ordered Rose Bloom',
  'Kavya from Pune customised Royal Dark',
]

export function SocialProof() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % RECENT_ACTIVITY.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-maroon overflow-hidden border-y border-gold/20 shadow-inner">
      {/* Marquee cities bar */}
      <div className="py-3 border-b border-gold/10 overflow-hidden bg-black/20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs tracking-widest uppercase text-gold/70 font-medium">
              <span>Trusted in {city}</span>
              <span className="text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Live activity */}
      <div className="py-3.5 flex items-center justify-center gap-3 bg-gradient-to-r from-transparent via-gold/5 to-transparent">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/80 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <p
          className={`text-xs sm:text-sm text-gold/80 transition-opacity duration-400 font-medium ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {RECENT_ACTIVITY[idx]} — <span className="text-white/60">2 mins ago</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </div>
  )
}
