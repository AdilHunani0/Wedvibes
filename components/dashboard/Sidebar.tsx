'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/cards', label: 'My Cards', icon: '💌' },
  { href: '/dashboard/orders', label: 'Order History', icon: '🛍️' },
  { href: '/dashboard/credits', label: 'Planner Credits', icon: '🪙' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { profile, signOut } = useAuth()

  const isAdmin = profile?.role === 'admin'

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#e8c97e]/20 flex flex-col md:h-[calc(100vh-64px)] md:sticky top-16 z-20">
      {/* User profile widget */}
      {profile && (
        <div className="p-6 border-b border-[#e8c97e]/10 bg-[#fdf8f4]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a0522d] text-[#e8c97e] flex items-center justify-center font-bold text-lg shadow-sm uppercase">
              {profile.full_name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-semibold text-sm text-[#2a1810] truncate" title={profile.full_name}>
                {profile.full_name}
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c9a96e]/20 text-[#a0522d] font-bold capitalize inline-block mt-1">
                {profile.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-none md:flex-1 p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-1 flex flex-row md:flex-col overflow-x-auto md:overflow-visible items-center md:items-stretch scrollbar-hide border-b md:border-b-0 border-[#e8c97e]/10">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-[#2a1810] text-[#e8c97e] shadow-md shadow-neutral-200'
                  : 'text-[#6b3d2a] hover:bg-[#fdf8f4] hover:text-[#2a1810]'
              }`}
            >
              <span className="text-base md:text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}

        {isAdmin && (
          <div className="md:pt-4 md:border-t border-[#e8c97e]/10 md:mt-4 flex-shrink-0 flex items-center md:block">
            <span className="hidden md:block px-4 text-[10px] font-bold text-[#a07060] uppercase tracking-wider mb-2">
              Admin Portal
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold text-rose-700 hover:bg-rose-50/50 transition-all whitespace-nowrap"
            >
              <span className="text-lg">⚙️</span>
              <span>Admin Console</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-2 md:p-4 md:border-t border-[#e8c97e]/10 hidden md:block">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
