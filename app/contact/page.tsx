export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8b2635]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#a0522d] tracking-[0.2em] text-xs font-semibold uppercase">Get in Touch</span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#2a1810] font-extrabold tracking-tight">
            Contact Us
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mt-6" />
          <p className="text-[#6b3d2a] text-lg max-w-2xl mx-auto pt-4">
            Have a question about our templates or need help with a custom design? We're here to help make your digital wedding invitation perfect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-[#e8c97e]/30 text-center flex flex-col items-center space-y-4 hover:shadow-xl hover:border-[#c9a96e] transition-all duration-300">
            <div className="w-12 h-12 bg-[#fdf8f4] rounded-full flex items-center justify-center text-[#a0522d] border border-[#e8c97e]/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3 className="font-playfair text-xl font-bold text-[#2a1810]">Email Us</h3>
            <p className="text-[#6b3d2a] text-sm">Our friendly team is here to help.</p>
            <a href="mailto:hello@wedvibe.com" className="text-[#a0522d] font-semibold hover:text-[#8b2635] transition-colors">
              hello@wedvibe.com
            </a>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-[#e8c97e]/30 text-center flex flex-col items-center space-y-4 hover:shadow-xl hover:border-[#c9a96e] transition-all duration-300">
            <div className="w-12 h-12 bg-[#fdf8f4] rounded-full flex items-center justify-center text-[#a0522d] border border-[#e8c97e]/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </div>
            <h3 className="font-playfair text-xl font-bold text-[#2a1810]">WhatsApp</h3>
            <p className="text-[#6b3d2a] text-sm">Available Mon-Fri, 9am - 6pm IST.</p>
            <a 
              href="https://wa.me/yourwhatsappnumber" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0522d] font-semibold hover:text-[#8b2635] transition-colors"
            >
              Message Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
