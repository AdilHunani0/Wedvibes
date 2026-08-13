export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f7efe8] rounded-xl ${className}`} />
}

export function TemplateCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#f7efe8]">
      <Skeleton className="h-64 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  )
}
