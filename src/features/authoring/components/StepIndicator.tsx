import { cn } from '@/lib/cn'

interface StepIndicatorProps {
  steps: string[]
  current: number
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <ol className="flex flex-wrap gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-white/70">
      {steps.map((step, index) => (
        <li
          key={step}
          className={cn(
            'flex items-center gap-2 rounded-2xl px-3 py-2',
            index === current ? 'bg-brand-500/20 text-white' : 'text-white/60',
          )}
        >
          <span className="inline-flex size-6 items-center justify-center rounded-full border border-current">
            {index + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  )
}
