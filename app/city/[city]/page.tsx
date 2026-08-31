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
  surat: 'Surat'
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  
  if (!CITIES.includes(city)) {
    return {}
  }
  
  const cityName = CITY_NAMES[city]
  return {
    title: `Animated Digital Wedding Invitation Card in ${cityName} | WedVibe`,
    description: `Design stunning animated digital wedding invitation cards in ${cityName}. Customise premium online shaadi cards and share via WhatsApp instantly.`,
    alternates: {
      canonical: `/digital-wedding-invitation-${city}`,
    }
  }
}

export default async function CityLandingPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params

  if (!CITIES.includes(city)) {
    notFound()
  }

  const cityName = CITY_NAMES[city]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#fdf8f4] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#e8c97e]/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[#a0522d] font-bold tracking-widest uppercase text-xs">
            Serving Couples in {cityName}
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-extrabold text-[#2a1810] leading-tight">
            Animated Digital Wedding Invitation Cards in <span className="text-[#a0522d] italic">{cityName}</span>
          </h1>
          <p className="text-[#6b3d2a] text-lg max-w-2xl mx-auto leading-relaxed">
            Join hundreds of happy couples from {cityName} who chose WedVibe. Design a premium, animated wedding e-card in minutes and invite your guests via WhatsApp instantly.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/templates"
              className="px-8 py-4 rounded-xl bg-[#2a1810] text-[#e8c97e] font-semibold hover:bg-[#3d2218] transition-colors shadow-lg"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      <FeaturedTemplates />

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-playfair text-3xl font-bold text-[#2a1810]">
            Why Couples in {cityName} Choose Digital Invitations
          </h2>
          <div className="space-y-6 text-[#6b3d2a] leading-relaxed">
            <p>
              Planning a wedding in {cityName} is already a monumental task. Between finalizing venues, coordinating with vendors, and managing the guest list, you need a hassle-free way to invite your loved ones. Traditional printed cards take weeks to design, print, and distribute. 
            </p>
            <p>
              With WedVibe's <strong>animated digital wedding invitation cards</strong>, you can select a premium design, customize your details, and send it directly via WhatsApp. Our interactive cards feature stunning animations, background music, and Google Maps integration, making it incredibly easy for your {cityName} guests to RSVP and find the venue.
            </p>
            <p>
              Whether you are hosting an intimate ceremony or a grand celebration, our templates cater to every style—from royal heritage to modern minimalist. Stand out and give your guests a wow experience right from the moment they receive your invite.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
