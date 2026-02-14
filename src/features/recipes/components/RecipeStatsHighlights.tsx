import { ChefHat, Rocket, Sprout } from 'lucide-react'
import { useRecipeStore } from '../store'
import { StatCard } from '@/components/ui/stat-card'

export function RecipeStatsHighlights() {
  const {
    stats: { total, quickMeals, vegetarian },
  } = useRecipeStore()

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Recipes Published"
        value={total}
        icon={<ChefHat className="size-4 text-brand-400" />}
      />
      <StatCard
        label="30-Minute Wins"
        value={quickMeals}
        icon={<Rocket className="size-4 text-brand-400" />}
      />
      <StatCard
        label="Vegetarian Friendly"
        value={vegetarian}
        icon={<Sprout className="size-4 text-brand-400" />}
      />
    </div>
  )
}
