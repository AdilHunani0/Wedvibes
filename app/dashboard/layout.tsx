'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" className="text-[#a0522d]" />
        <p className="text-sm font-semibold text-[#6b3d2a]">Loading dashboard profile...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex bg-[#fffaf5] min-h-[calc(100vh-64px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
