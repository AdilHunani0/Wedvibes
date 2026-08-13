'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
}

const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full'

const variants: Record<string, string> = {
  primary: 'bg-[#2a1810] text-[#e8c97e] hover:bg-[#3d2218] shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  secondary: 'bg-[#c9a96e] text-[#2a1810] hover:bg-[#b8944e] shadow-md hover:-translate-y-0.5',
  outline: 'border border-[#c9a96e] text-[#2a1810] hover:bg-[#fdf8f4] hover:-translate-y-0.5',
  ghost: 'text-[#6b3d2a] hover:bg-[#f7efe8]',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
