import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}
