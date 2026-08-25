import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#2a1810] text-[#a07060]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Grid: 2-col on mobile, 4-col on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3 sm:mb-4 h-16 w-40 md:w-48 relative overflow-hidden">
              <img 
                src="/logo.png" 
                alt="WedVibe" 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-32 md:h-40 w-auto max-w-none object-contain invert mix-blend-screen origin-left scale-110 md:scale-125" 
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#a07060] mb-4 sm:mb-6">
              India&apos;s finest animated digital wedding invitations. Share your love story with the world.
            </p>
            <p className="text-xs tracking-widest uppercase text-[#c9a96e]/60">Your love story, beautifully told</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#e8c97e] tracking-widest uppercase mb-4 sm:mb-5">Product</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm">
              <li><Link href="/templates" className="hover:text-[#e8c97e] transition-colors">All Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-[#e8c97e] transition-colors">Pricing</Link></li>
              <li><Link href="/planners" className="hover:text-[#e8c97e] transition-colors">For Planners</Link></li>
              <li><Link href="/templates?category=wedding" className="hover:text-[#e8c97e] transition-colors">Wedding Cards</Link></li>
              <li><Link href="/templates?category=engagement" className="hover:text-[#e8c97e] transition-colors">Engagement</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#e8c97e] tracking-widest uppercase mb-4 sm:mb-5">Company</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-[#e8c97e] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#e8c97e] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#e8c97e] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Support — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold text-[#e8c97e] tracking-widest uppercase mb-4 sm:mb-5">Support</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm mb-5">
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#e8c97e] transition-colors"
                >
                  <span>💬</span> WhatsApp Support
                </a>
              </li>
              <li><Link href="/how-it-works" className="hover:text-[#e8c97e] transition-colors">How It Works</Link></li>
            </ul>
            <div className="p-3 rounded-xl bg-[#1a0e08] border border-[#c9a96e]/20">
              <p className="text-xs text-[#c9a96e] mb-1 font-medium">🛡️ Secure Payments</p>
              <p className="text-xs text-[#a07060]">UPI · Cards · Net Banking via Razorpay</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#3d2218] flex flex-col sm:flex-row justify-center items-center text-center">
          <p className="text-xs text-[#6b3d2a]">
            © {new Date().getFullYear()} WedVibe. Founded by Adil Hunani. Made with ♥ in India.
          </p>
        </div>
      </div>
    </footer>
  )
}
