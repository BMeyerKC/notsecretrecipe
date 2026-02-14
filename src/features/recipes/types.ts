import type { Dispatch } from 'react'
import type { Course, DietLabel, Recipe } from '@/types/recipe'

export type PrepTimeFilter =
  | 'any'
  | 'under-15'
  | '15-30'
  | '30-45'
  | '45-plus'

export type ViewMode = 'grid' | 'list'

export type SortOption = 'newest' | 'alphabetical' | 'prep-asc'

export interface RecipeFilters {
  courses: Course[]
  cuisines: string[]
  dietLabels: DietLabel[]
  prepTime: PrepTimeFilter
}

export interface RecipeState {
  recipes: Recipe[]
  searchTerm: string
  filters: RecipeFilters
  viewMode: ViewMode
  sort: SortOption
}

export interface RecipeContextValue {
  state: RecipeState
  filtered: Recipe[]
  stats: {
    total: number
    quickMeals: number
    vegetarian: number
  }
  availableCuisines: string[]
  availableCourses: Course[]
  availableDietLabels: DietLabel[]
  dispatch: Dispatch<RecipeAction>
}

export type RecipeAction =
  | { type: 'set-search'; payload: string }
  | { type: 'toggle-course'; payload: Course }
  | { type: 'toggle-cuisine'; payload: string }
  | { type: 'toggle-diet'; payload: DietLabel }
  | { type: 'set-prep-time'; payload: PrepTimeFilter }
  | { type: 'reset-filters' }
  | { type: 'set-view'; payload: ViewMode }
  | { type: 'set-sort'; payload: SortOption }

export const defaultFilters: RecipeFilters = {
  courses: [],
  cuisines: [],
  dietLabels: [],
  prepTime: 'any',
}
