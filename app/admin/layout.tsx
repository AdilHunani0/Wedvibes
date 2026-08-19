'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const ADMIN_NAV = [
  { href: '/admin', label: 'Stats Overview', icon: '📊' },
  { href: '/admin/orders', label: 'Manage Orders', icon: '🛍#' },
  { href: '/admin/templates', label: 'Manage Templates', icon: '🎨' },
  { href: '/admin/users', label: 'Manage Users', icon: '👥' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { loading, profile } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" className="text-[#a0522d]" />
        <p className="text-sm font-semibold text-[#6b3d2a]">Authenticating admin portal...</p>
      </div>
    )
  }

  if (!profile || profile.role !== 'admin') {
    return null
  }

  return (
    <div className="flex flex-col md:flex-row bg-[#fffaf5] min-h-[calc(100vh-64px)]">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#e8c97e]/20 flex flex-col md:h-[calc(100vh-64px)] md:sticky top-16 z-20">
        <div className="p-4 md:p-6 border-b border-[#e8c97e]/10 bg-rose-50/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <div>
              <h4 className="font-semibold text-sm text-[#2a1810]">Admin Console</h4>
              <span className="text-[10px] font-bold text-rose-600 block">System Administrator</span>
            </div>
          </div>
        </div>

        <nav className="flex-none md:flex-1 p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-1 flex flex-row md:flex-col overflow-x-auto md:overflow-visible items-center md:items-stretch scrollbar-hide border-b md:border-b-0 border-[#e8c97e]/10">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-rose-950 text-[#e8c97e] shadow-md'
                    : 'text-[#6b3d2a] hover:bg-[#fdf8f4] hover:text-[#2a1810]'
                }`}
              >
                <span className="text-base md:text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="md:pt-4 md:border-t border-[#e8c97e]/10 md:mt-4 flex-shrink-0 flex items-center md:block">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold text-[#6b3d2a] hover:bg-neutral-100 transition-all whitespace-nowrap"
            >
              <span className="text-base md:text-lg">↩️</span>
              <span className="hidden md:inline">Back to Client Panel</span>
              <span className="inline md:hidden">Client Panel</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-grow w-full p-4 sm:p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
