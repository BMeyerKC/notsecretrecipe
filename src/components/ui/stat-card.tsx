import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface StatCardProps {
  label: string
  value: ReactNode
  icon?: ReactNode
  className?: string
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'glass-panel flex flex-col gap-2 rounded-2xl bg-white/80 text-slate-900 shadow-card',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </div>
  )
}
