'use client'

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const currentTitle = steps[currentStep - 1] || ''

  return (
    <div className="w-full py-3 border-b border-[#e8c97e]/20 bg-[#fdf8f4]/95 backdrop-blur-md sticky top-0 z-20 px-4">

      {/* ── Mobile: compact progress bar ──────────────────────────────── */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#a0522d]">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-[10px] font-medium text-[#2a1810] truncate max-w-[55%] text-right">
            {currentTitle}
          </span>
        </div>
        {/* Thin progress bar */}
        <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7a1f2b] to-[#a0522d] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ── sm+: full step dots ───────────────────────────────────────── */}
      <div className="hidden sm:flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep

          return (
            <div key={step} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-1 relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#a0522d] text-[#e8c97e] ring-2 ring-[#a0522d]/20'
                      : isActive
                      ? 'bg-[#2a1810] text-[#e8c97e] ring-4 ring-[#2a1810]/10 scale-105'
                      : 'bg-white border border-[#e8c97e]/50 text-[#6b3d2a]'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span
                  className={`text-[9px] font-medium whitespace-nowrap hidden md:inline transition-colors duration-300 ${
                    isActive ? 'text-[#2a1810] font-semibold' : 'text-[#a07060]'
                  }`}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-1.5 h-0.5 relative overflow-hidden bg-neutral-200">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#a0522d] transition-all duration-500 ease-out"
                    style={{
                      width: isCompleted ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
