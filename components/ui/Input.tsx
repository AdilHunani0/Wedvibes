'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#2a1810]">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#2a1810] placeholder-[#a07060]
            transition-all duration-200 outline-none
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-[#e8c97e]/60 focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/20'
            } ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-[#a07060]">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#2a1810]">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#2a1810] placeholder-[#a07060]
            transition-all duration-200 outline-none resize-none
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-[#e8c97e]/60 focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/20'
            } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
