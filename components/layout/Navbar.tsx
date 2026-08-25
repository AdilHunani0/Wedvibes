'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const { user, profile, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-[#fdf8f4]/95 backdrop-blur-md border-b border-[#e8c97e]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="WedVibe" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/templates" className="text-sm text-[#6b3d2a] hover:text-[#2a1810] transition-colors font-medium">
              Templates
            </Link>
            <Link href="/pricing" className="text-sm text-[#6b3d2a] hover:text-[#2a1810] transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/planners" className="text-sm text-[#6b3d2a] hover:text-[#2a1810] transition-colors font-medium">
              For Planners
            </Link>
            <Link href="/about" className="text-sm text-[#6b3d2a] hover:text-[#2a1810] transition-colors font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-[#6b3d2a] hover:text-[#2a1810] transition-colors font-medium">
              Contact Us
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#f7efe8] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2a1810] flex items-center justify-center text-[#e8c97e] text-sm font-semibold">
                    {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-[#2a1810] font-medium">{profile?.full_name?.split(' ')[0]}</span>
                  <svg className="w-4 h-4 text-[#a07060]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#f7efe8] overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#f7efe8]">
                      <p className="text-xs text-[#a07060]">Signed in as</p>
                      <p className="text-sm font-medium text-[#2a1810] truncate">{user.email}</p>
                      {profile && <p className="text-xs text-[#c9a96e] mt-0.5">{profile.credits} credits</p>}
                    </div>
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-[#2a1810] hover:bg-[#fdf8f4] transition-colors" onClick={() => setUserMenuOpen(false)}>My Dashboard</Link>
                    <Link href="/dashboard/cards" className="block px-4 py-3 text-sm text-[#2a1810] hover:bg-[#fdf8f4] transition-colors" onClick={() => setUserMenuOpen(false)}>My Cards</Link>
                    {profile?.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-3 text-sm text-[#a0522d] hover:bg-[#fdf8f4] transition-colors" onClick={() => setUserMenuOpen(false)}>Admin Panel</Link>
                    )}
                    <button onClick={() => { signOut(); setUserMenuOpen(false) }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-[#f7efe8]">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-[#6b3d2a] hover:text-[#2a1810] font-medium transition-colors px-4 py-2">
                  Sign In
                </Link>
                <Link href="/templates" className="bg-[#2a1810] text-[#e8c97e] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#3d2218] transition-all hover:-translate-y-0.5 shadow-md">
                  Start Creating
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button 
            className="md:hidden p-4 -mr-2 relative z-50 flex flex-col justify-center items-center gap-1.5 cursor-pointer pointer-events-auto" 
            onClick={() => {
              console.log('Hamburger clicked', !menuOpen)
              setMenuOpen(!menuOpen)
            }} 
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-[#2a1810] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#2a1810] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#2a1810] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-b border-[#e8c97e]/30 bg-[#fdf8f4] px-4 py-4 space-y-1 shadow-lg z-[100] pointer-events-auto">
          <Link href="/templates" className="block py-3 text-sm text-[#2a1810] font-medium border-b border-[#f7efe8]" onClick={() => setMenuOpen(false)}>Templates</Link>
          <Link href="/pricing" className="block py-3 text-sm text-[#2a1810] font-medium border-b border-[#f7efe8]" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/planners" className="block py-3 text-sm text-[#2a1810] font-medium border-b border-[#f7efe8]" onClick={() => setMenuOpen(false)}>For Planners</Link>
          <Link href="/about" className="block py-3 text-sm text-[#2a1810] font-medium border-b border-[#f7efe8]" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/contact" className="block py-3 text-sm text-[#2a1810] font-medium border-b border-[#f7efe8]" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block py-3 text-sm text-[#2a1810] font-medium border-b border-[#f7efe8]" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { signOut(); setMenuOpen(false) }} className="block w-full text-left py-3 text-sm text-red-600 font-medium cursor-pointer">Sign Out</button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/auth/login" className="text-center py-3 text-sm text-[#2a1810] border border-[#c9a96e]/50 rounded-full font-medium" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link href="/templates" className="text-center py-3 text-sm font-medium bg-[#2a1810] text-[#e8c97e] rounded-full" onClick={() => setMenuOpen(false)}>Start Creating</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
