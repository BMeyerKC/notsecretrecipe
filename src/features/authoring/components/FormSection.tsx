import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <header>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-white/60">{description}</p>}
      </header>
      {children}
    </section>
  )
}
