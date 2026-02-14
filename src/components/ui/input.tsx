import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-11 w-full rounded-xl border border-white/20 bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
