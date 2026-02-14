import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface PillToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function PillToggle({ className, active = false, ...props }: PillToggleProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition',
        active
          ? 'border-brand-400 bg-brand-50/60 text-brand-700 shadow-inner'
          : 'border-white/30 bg-white/5 text-white/80 hover:bg-white/10',
        className,
      )}
      {...props}
    />
  )
}
