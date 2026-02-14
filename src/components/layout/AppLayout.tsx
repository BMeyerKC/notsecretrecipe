import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'

const links = [
  { to: '/', label: 'Browse Recipes' },
  { to: '/add', label: 'Add a Recipe' },
]

export function AppLayout() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-[-10%] mx-auto h-[60vh] w-[80vw] rounded-full bg-gradient-to-b from-brand-500/30 via-brand-700/30 to-transparent blur-[120px]" />
      </div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Not-So-Secret Family Recipe Book
            </p>
            <h1 className="font-display text-3xl font-semibold">
              Nourish the people you love
            </h1>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full border px-4 py-2 transition',
                    isActive
                      ? 'border-brand-300 bg-brand-500/20 text-white shadow-inner'
                      : 'border-white/20 text-white/80 hover:bg-white/10',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              variant="secondary"
              className="ml-auto shrink-0 border border-white/30 text-white"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth',
                })
              }
            >
              View project notes
            </Button>
          </nav>
        </header>
        <main id="main" className="flex-1 py-10">
          <Outlet />
        </main>
        <footer className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Built with love using React, Vite, and Tailwind CSS.</p>
            <p>
              Deploy via GitHub Pages &middot;{' '}
              <span className="font-mono text-xs text-white/60">
                {import.meta.env.BASE_URL || '/'}
              </span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
