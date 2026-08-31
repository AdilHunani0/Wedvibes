import Link from 'next/link'

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Chennai', 
  'Hyderabad', 'Pune', 'Jaipur', 'Kolkata', 'Surat'
]

export function CityLinks() {
  return (
    <section className="py-16 bg-[#fdf8f4] border-t border-[#e8c97e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2a1810]">
          Serving Couples Across India
        </h2>
        <p className="text-[#6b3d2a] max-w-2xl mx-auto text-sm">
          Discover how WedVibe helps couples create stunning animated digital wedding invitations in major cities.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {CITIES.map((city) => (
            <Link
              key={city}
              href={`/digital-wedding-invitation-${city.toLowerCase()}`}
              className="px-6 py-3 rounded-full bg-white border border-[#e8c97e]/40 text-[#a0522d] text-sm font-semibold hover:bg-[#a0522d] hover:text-white transition-colors shadow-sm"
            >
              Wedding Cards in {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
