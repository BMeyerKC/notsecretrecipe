import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function RecipeHero() {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-600/40 via-brand-500/30 to-transparent p-8 text-white shadow-card">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">Family tested</p>
      <h2 className="mt-2 font-display text-4xl font-semibold">
        Cook from the collective memory of our people
      </h2>
      <p className="mt-4 text-lg text-white/80">
        Search trusted recipes, explore new cuisines, and capture your own creations for the next
        gathering.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/add">Share a recipe</Link>
        </Button>
        <Button variant="ghost" className="text-white hover:text-brand-100">
          Download cookbook PDF
        </Button>
      </div>
    </section>
  )
}
