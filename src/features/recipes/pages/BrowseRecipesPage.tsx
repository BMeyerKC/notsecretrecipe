import { RecipeHero } from '../components/RecipeHero'
import { RecipeStatsHighlights } from '../components/RecipeStatsHighlights'
import { RecipeSearchBar } from '../components/RecipeSearchBar'
import { RecipeFiltersPanel } from '../components/RecipeFiltersPanel'
import { RecipeList } from '../components/RecipeList'

export default function BrowseRecipesPage() {
  return (
    <div className="space-y-8">
      <RecipeHero />
      <RecipeStatsHighlights />
      <RecipeSearchBar />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div className="space-y-6">
          <RecipeList />
        </div>
        <div className="space-y-4">
          <RecipeFiltersPanel />
        </div>
      </div>
    </div>
  )
}
