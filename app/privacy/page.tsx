export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] py-20 px-6 sm:px-12 relative">
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-[#f2e6d9]/30 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#a0522d] tracking-[0.2em] text-xs font-semibold uppercase">Legal</span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#2a1810] font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mt-6" />
          <p className="text-[#6b3d2a] text-sm pt-4">Last updated: August 13, 2026</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg border border-[#e8c97e]/30 space-y-10">
          
          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">1. Introduction</h2>
            <p className="text-[#6b3d2a] leading-relaxed">
              At WedVibe, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our digital wedding invitation services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">2. Information We Collect</h2>
            <p className="text-[#6b3d2a] leading-relaxed">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#6b3d2a]">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Razorpay.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">3. Use of Your Information</h2>
            <p className="text-[#6b3d2a] leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#6b3d2a]">
              <li>Create and manage your account.</li>
              <li>Process your transactions and deliver the digital invitations you purchase.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">4. Security of User-Uploaded Content</h2>
            <p className="text-[#6b3d2a] leading-relaxed">
              We understand that the photos you upload to customize your wedding invitations are deeply personal. We want to assure you that any images, photographs, or personal media you upload to WedVibe are treated with the highest level of security and respect:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#6b3d2a]">
              <li><strong>Private Storage:</strong> Your uploaded photos are stored securely on our servers and are accessible exclusively for rendering your specific digital invitation.</li>
              <li><strong>No Third-Party Sharing:</strong> We will absolutely never sell, distribute, or share your personal wedding photos with any third parties or advertisers.</li>
              <li><strong>Data Deletion:</strong> You retain full rights to your images. If you delete your account or request the removal of your digital invitation, all associated photos will be permanently deleted from our servers.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">5. General Security of Your Information</h2>
            <p className="text-[#6b3d2a] leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-playfair text-2xl text-[#2a1810] font-bold">6. Contact Us</h2>
            <p className="text-[#6b3d2a] leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at: <br/>
              <a href="mailto:hello@wedvibe.com" className="text-[#a0522d] font-semibold hover:underline">hello@wedvibe.com</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
