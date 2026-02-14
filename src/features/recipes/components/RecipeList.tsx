import { Sparkles } from 'lucide-react'
import { useRecipeStore } from '../store'
import { RecipeCard } from './RecipeCard'

export function RecipeList() {
  const {
    filtered,
    state: { viewMode },
  } = useRecipeStore()

  if (filtered.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-white/70">
        <Sparkles className="mx-auto size-10 text-brand-300" />
        <p className="mt-3 text-xl font-semibold text-white">No recipes found</p>
        <p className="text-sm text-white/60">
          Try broadening your filters or search for another ingredient.
        </p>
      </div>
    )
  }

  const className =
    viewMode === 'grid'
      ? 'grid gap-6 sm:grid-cols-2'
      : 'flex flex-col divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5'

  return (
    <div data-testid="recipe-list" className={className}>
      {filtered.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} layout={viewMode} />
      ))}
    </div>
  )
}
