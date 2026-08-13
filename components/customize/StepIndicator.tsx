'use client'

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-4 border-b border-[#e8c97e]/20 bg-[#fdf8f4]/50 backdrop-blur-md sticky top-0 z-10 px-4">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep

          return (
            <div key={step} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-1.5 relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
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
                  className={`text-xs font-medium whitespace-nowrap hidden sm:inline transition-colors duration-300 ${
                    isActive ? 'text-[#2a1810] font-semibold' : 'text-[#a07060]'
                  }`}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative overflow-hidden bg-neutral-200">
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
