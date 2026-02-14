import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 focus-visible:ring-brand-400',
  secondary:
    'bg-white/10 text-white border border-white/30 hover:bg-white/20 focus-visible:ring-white/50',
  ghost:
    'text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-200 border border-transparent',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isFullWidth?: boolean
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      type = 'button',
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        type={asChild ? undefined : type}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          isFullWidth && 'w-full',
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
