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
    <div className="flex bg-[#fffaf5] min-h-[calc(100vh-64px)]">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e8c97e]/20 flex flex-col h-[calc(100vh-64px)] sticky top-16">
        <div className="p-6 border-b border-[#e8c97e]/10 bg-rose-50/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <div>
              <h4 className="font-semibold text-sm text-[#2a1810]">Admin Console</h4>
              <span className="text-[10px] font-bold text-rose-600 block">System Administrator</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-950 text-[#e8c97e] shadow-md'
                    : 'text-[#6b3d2a] hover:bg-[#fdf8f4] hover:text-[#2a1810]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-4 border-t border-[#e8c97e]/10 mt-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#6b3d2a] hover:bg-neutral-100 transition-all"
            >
              <span className="text-lg">↩️</span>
              <span>Back to Client Panel</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-grow p-8 max-w-5xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
