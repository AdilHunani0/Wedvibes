import { CreditsWidget } from '@/components/dashboard/CreditsWidget'

export const metadata = {
  title: 'Planner Credits Wallet | WedVibe',
  description: 'Manage credit balances and purchase packs to customize client wedding cards.',
}

export default function DashboardCredits() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
          Planner Credits
        </h1>
        <p className="text-xs text-[#a07060] mt-1">
          Purchase credit packs, check delta balances, and view transaction audits.
        </p>
      </div>

      <CreditsWidget />
    </div>
  )
}
