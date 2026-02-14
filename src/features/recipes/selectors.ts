import type { Recipe } from '@/types/recipe'
import type { PrepTimeFilter, RecipeFilters, SortOption } from './types'

const PREP_TIME_BUCKETS: Record<
  Exclude<PrepTimeFilter, 'any'>,
  { min?: number; max?: number }
> = {
  'under-15': { max: 15 },
  '15-30': { min: 15, max: 30 },
  '30-45': { min: 30, max: 45 },
  '45-plus': { min: 45 },
}

function matchesPrepTime(recipe: Recipe, filter: PrepTimeFilter) {
  if (filter === 'any') return true
  const bucket = PREP_TIME_BUCKETS[filter]
  const total = recipe.prepMinutes + recipe.cookMinutes
  if (bucket.min !== undefined && total < bucket.min) return false
  if (bucket.max !== undefined && total > bucket.max) return false
  return true
}

function matchesSearch(recipe: Recipe, term: string) {
  if (!term) return true
  const haystack = [
    recipe.title,
    recipe.description,
    recipe.author,
    recipe.tags.join(' '),
    recipe.ingredients.map((ingredient) => `${ingredient.quantity} ${ingredient.item}`).join(' '),
  ]
    .join(' ')
    .toLowerCase()

  const query = term.toLowerCase()

  return query.split(/\s+/).every((token) => haystack.includes(token))
}

function matchesFilters(recipe: Recipe, filters: RecipeFilters) {
  const courseOk =
    filters.courses.length === 0 || filters.courses.includes(recipe.course)
  const cuisineOk =
    filters.cuisines.length === 0 ||
    (recipe.cuisine
      ? filters.cuisines
          .map((value) => value.toLowerCase())
          .includes(recipe.cuisine.toLowerCase())
      : false)
  const dietOk =
    filters.dietLabels.length === 0 ||
    filters.dietLabels.every((label) => recipe.dietLabels.includes(label))

  return courseOk && cuisineOk && dietOk && matchesPrepTime(recipe, filters.prepTime)
}

export function filterRecipes(
  recipes: Recipe[],
  searchTerm: string,
  filters: RecipeFilters,
  sort: SortOption,
) {
  const filtered = recipes.filter(
    (recipe) => matchesSearch(recipe, searchTerm) && matchesFilters(recipe, filters),
  )

  return sortRecipes(filtered, sort)
}

export function sortRecipes(recipes: Recipe[], sort: SortOption) {
  const clone = [...recipes]
  switch (sort) {
    case 'alphabetical':
      return clone.sort((a, b) => a.title.localeCompare(b.title))
    case 'prep-asc':
      return clone.sort(
        (a, b) =>
          a.prepMinutes +
          a.cookMinutes -
          (b.prepMinutes + b.cookMinutes),
      )
    case 'newest':
    default:
      return clone.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      )
  }
}

export function deriveStats(recipes: Recipe[]) {
  return {
    total: recipes.length,
    quickMeals: recipes.filter((recipe) => recipe.prepMinutes + recipe.cookMinutes <= 30)
      .length,
    vegetarian: recipes.filter((recipe) =>
      recipe.dietLabels.includes('vegetarian'),
    ).length,
  }
}
