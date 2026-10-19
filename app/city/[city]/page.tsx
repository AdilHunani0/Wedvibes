import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FeaturedTemplates } from '@/components/home/FeaturedTemplates'

const CITIES = [
  'mumbai', 'delhi', 'bangalore', 'ahmedabad', 'chennai',
  'hyderabad', 'pune', 'jaipur', 'kolkata', 'surat'
]

const CITY_NAMES: Record<string, string> = {
  mumbai: 'Mumbai',
  delhi: 'Delhi',
  bangalore: 'Bangalore',
  ahmedabad: 'Ahmedabad',
  chennai: 'Chennai',
  hyderabad: 'Hyderabad',
  pune: 'Pune',
  jaipur: 'Jaipur',
  kolkata: 'Kolkata',
  surat: 'Surat',
}

const CITY_CULTURE: Record<string, string> = {
  delhi: 'Delhi weddings are grand events — from Punjabi baraat traditions to lavish banquet halls. Your digital invitation should be as impressive as the celebration itself.',
  mumbai: 'Mumbai couples blend modern style with rich traditions. From South Indian to Maharashtrian ceremonies, your shaadi card should reflect that cosmopolitan spirit.',
  ahmedabad: 'Gujarati weddings are vibrant, joyful affairs full of colour and garba nights. An animated digital invitation captures that energy perfectly.',
  jaipur: 'Jaipur shaadis carry the royal legacy of Rajasthan — ornate decor, traditional ceremonies, and family-first values. Your invite should echo that elegance.',
  surat: 'Surat is known for its love of celebration and Gujarati traditions. A WedVibe animated card brings that festive spirit directly to your guests\' phones.',
  chennai: 'Tamil weddings are deeply rooted in culture, from the grand Muhurtam moment to the vibrant Nalangu rituals. Your invitation should honour that heritage.',
  pune: 'Pune couples balance Maharashtrian tradition with a modern, educated sensibility — a digital invitation is the perfect blend of both.',
  kolkata: 'Kolkata weddings are elegant affairs with deep cultural roots — from Biye traditions to the Aashirbaad ceremony. Your digital shaadi card should match that sophistication.',
  hyderabad: 'Hyderabad\'s weddings span Telugu and Urdu traditions, from Pellikoduku ceremonies to Nikah celebrations. WedVibe designs honour every beautiful custom.',
  bangalore: 'Bangalore weddings are a beautiful mix of South Indian traditions and cosmopolitan flair. A digital invitation perfectly reflects that modern yet rooted spirit.',
}

const OTHER_CITIES = [
  { slug: 'delhi', name: 'Delhi' },
  { slug: 'mumbai', name: 'Mumbai' },
  { slug: 'ahmedabad', name: 'Ahmedabad' },
  { slug: 'jaipur', name: 'Jaipur' },
  { slug: 'surat', name: 'Surat' },
  { slug: 'chennai', name: 'Chennai' },
  { slug: 'pune', name: 'Pune' },
  { slug: 'kolkata', name: 'Kolkata' },
  { slug: 'hyderabad', name: 'Hyderabad' },
  { slug: 'bangalore', name: 'Bangalore' },
]

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params

  if (!CITIES.includes(city)) return {}

  const cityName = CITY_NAMES[city]
  // Title max 60 chars, description max 155 chars
  const titleMap: Record<string, string> = {
    delhi: `Digital Wedding Invitation Delhi ₹499 | WedVibe`,
    mumbai: `Digital Wedding Invitation Mumbai ₹499 | WedVibe`,
    ahmedabad: `Digital Wedding Invitation Ahmedabad | WedVibe`,
    jaipur: `Digital Wedding Invitation Jaipur ₹499 | WedVibe`,
    surat: `Digital Wedding Invitation Surat ₹499 | WedVibe`,
    chennai: `Digital Wedding Invitation Chennai ₹499 | WedVibe`,
    pune: `Digital Wedding Invitation Pune ₹499 | WedVibe`,
    kolkata: `Digital Wedding Invitation Kolkata ₹499 | WedVibe`,
    hyderabad: `Digital Wedding Card Hyderabad ₹499 | WedVibe`,
    bangalore: `Digital Wedding Invitation Bangalore ₹499 | WedVibe`,
  }
  const descMap: Record<string, string> = {
    delhi: `Delhi couples — send stunning animated digital wedding invitations on WhatsApp in minutes. Just ₹499. No app needed. Share with 100s of guests instantly!`,
    mumbai: `Mumbai's trendiest digital wedding cards — animated, WhatsApp-ready, ₹499. Perfect shaadi invites. Share with all your guests in seconds. Order today!`,
    ahmedabad: `Ahmedabad couples — beautiful animated digital wedding cards at just ₹499. WhatsApp-ready shaadi invitations your family will love. Order yours today!`,
    jaipur: `Jaipur's favourite digital wedding invitation — animated, elegant, WhatsApp-shareable. Just ₹499. Perfect for Rajasthani shaadi traditions. Book now!`,
    surat: `Surat couples — animated digital wedding cards at ₹499. WhatsApp your shaadi invite to 100s of guests instantly. No printing needed. Order today!`,
    chennai: `Chennai weddings deserve stunning digital invitations. Animated WhatsApp-ready shaadi cards at just ₹499. Share with all guests instantly. Order now!`,
    pune: `Pune couples — send animated digital wedding invitations on WhatsApp for just ₹499. Modern shaadi cards your guests will screenshot and save. Order now!`,
    kolkata: `Kolkata weddings, digital-style. Animated WhatsApp shaadi cards at ₹499. Share your wedding invitation with 100s of guests in minutes. Book yours today!`,
    hyderabad: `Hyderabad couples — animated digital wedding cards at ₹499. WhatsApp-ready shaadi invitations perfect for Telugu & Urdu weddings. Order in minutes!`,
    bangalore: `Bangalore couples — animated digital wedding invitations at ₹499. WhatsApp-ready shaadi cards that reflect your modern yet rooted celebration. Order now!`,
  }

  return {
    title: titleMap[city] ?? `Digital Wedding Invitation ${cityName} ₹499 | WedVibe`,
    description: descMap[city] ?? `Send animated digital wedding invitations in ${cityName} via WhatsApp. Just ₹499. Share with hundreds of guests instantly. Order now!`,
    alternates: {
      canonical: `https://wedvibe.in/digital-wedding-invitation-${city}`,
    },
  }
}

export default async function CityLandingPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params

  if (!CITIES.includes(city)) notFound()

  const cityName = CITY_NAMES[city]
  const cultureNote = CITY_CULTURE[city] ?? `${cityName} weddings are vibrant celebrations full of tradition and warmth.`
  const otherCities = OTHER_CITIES.filter((c) => c.slug !== city)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-[#fdf8f4] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#e8c97e]/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[#a0522d] font-bold tracking-widest uppercase text-xs">
            Serving Couples in {cityName}
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-extrabold text-[#2a1810] leading-tight">
            Digital Wedding Invitation in{' '}
            <span className="text-[#a0522d] italic">{cityName}</span> — Animated,
            WhatsApp-Ready, ₹499
          </h1>
          <p className="text-[#6b3d2a] text-lg max-w-2xl mx-auto leading-relaxed">
            Join hundreds of happy couples from {cityName} who chose WedVibe. Get a premium
            animated digital wedding card in minutes — share instantly on WhatsApp.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/templates"
              className="px-8 py-4 rounded-xl bg-[#2a1810] text-[#e8c97e] font-semibold hover:bg-[#3d2218] transition-colors shadow-lg"
            >
              Browse Templates
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl border-2 border-[#a0522d] text-[#a0522d] font-semibold hover:bg-[#a0522d]/10 transition-colors"
            >
              View Pricing — ₹499
            </Link>
          </div>
        </div>
      </section>

      <FeaturedTemplates />

      {/* SEO Body Content — 200 words */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-playfair text-3xl font-bold text-[#2a1810]">
            Digital Wedding Invitations in {cityName} — The Smarter Choice
          </h2>
          <div className="space-y-5 text-[#6b3d2a] leading-relaxed">
            <p>{cultureNote}</p>
            <p>
              Gone are the days of waiting weeks for printed cards. With WedVibe, your{' '}
              <strong>digital wedding invitation in {cityName}</strong> is ready within minutes
              and shared instantly on <strong>WhatsApp</strong> — reaching family and friends
              across {cityName} and beyond in seconds. No courier delays, no extra printing
              costs, no stress.
            </p>
            <p>
              Our animated wedding cards are priced at just <strong>₹499</strong> — that&apos;s
              less than a single printed card, but infinitely more impressive. Each design
              features smooth animations, elegant typography, and customisable details including
              venue, date, and all pre-wedding events like mehendi, haldi, and sangeet.
            </p>
            <p>
              Simply choose a template, add your details, and share on WhatsApp. Thousands of
              couples from {cityName} have already made the switch to digital invitations — join
              them and make your wedding memorable from the very first invite.
            </p>
          </div>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/how-it-works" className="text-sm text-[#a0522d] underline underline-offset-4 hover:text-[#7a3a20]">
              How does WedVibe work? →
            </Link>
            <Link href="/templates" className="text-sm text-[#a0522d] underline underline-offset-4 hover:text-[#7a3a20]">
              Browse all animated templates →
            </Link>
            <Link href="/pricing" className="text-sm text-[#a0522d] underline underline-offset-4 hover:text-[#7a3a20]">
              Full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Other cities — internal linking grid */}
      <section className="bg-[#fdf8f4] border-t border-[#e8c97e]/20 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a0522d] mb-6 text-center">
            Also Serving
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/digital-wedding-invitation-${c.slug}`}
                className="px-4 py-2 rounded-lg border border-[#e8c97e]/60 bg-white text-sm text-[#6b3d2a] hover:border-[#a0522d] hover:text-[#a0522d] transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

