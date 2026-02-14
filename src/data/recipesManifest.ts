import type { Recipe } from '@/types/recipe'

const modules = import.meta.glob('./recipes/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Recipe>

const manifest = Object.values(modules).sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
)

const recipeMap = new Map(manifest.map((recipe) => [recipe.slug, recipe]))

export const recipes = manifest

export const recipesBySlug = recipeMap

export const allTags = Array.from(
  new Set(manifest.flatMap((recipe) => recipe.tags)),
).sort()

export const courses = Array.from(
  new Set(manifest.map((recipe) => recipe.course)),
).sort()

export const cuisines = Array.from(
  new Set(manifest.map((recipe) => recipe.cuisine).filter(Boolean) as string[]),
).sort((a, b) => a.localeCompare(b))

export const dietLabels = Array.from(
  new Set(manifest.flatMap((recipe) => recipe.dietLabels)),
).sort()

export function getRecipe(slug: string) {
  return recipeMap.get(slug)
}
