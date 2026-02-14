import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import {
  recipes as manifest,
  courses as manifestCourses,
  cuisines as manifestCuisines,
  dietLabels as manifestDietLabels,
} from '@/data/recipesManifest'
import type { RecipeState, RecipeAction, RecipeContextValue } from './types'
import { defaultFilters } from './types'
import { deriveStats, filterRecipes } from './selectors'

const PREFERENCE_KEY = 'nsfrb::preferences::v1'

type Preferences = Pick<RecipeState, 'viewMode' | 'sort'>

const defaultPreferences: Preferences = {
  viewMode: 'grid',
  sort: 'newest',
}

function readPreferences(): Preferences {
  if (typeof window === 'undefined') {
    return defaultPreferences
  }

  try {
    const stored = window.localStorage.getItem(PREFERENCE_KEY)
    if (!stored) return defaultPreferences
    const parsed = JSON.parse(stored) as Preferences
    return {
      viewMode: parsed.viewMode ?? defaultPreferences.viewMode,
      sort: parsed.sort ?? defaultPreferences.sort,
    }
  } catch {
    return defaultPreferences
  }
}

function writePreferences(prefs: Preferences) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(prefs))
}

const createInitialState = (): RecipeState => {
  const preferences = readPreferences()
  return {
    recipes: manifest,
    searchTerm: '',
    filters: { ...defaultFilters },
    viewMode: preferences.viewMode,
    sort: preferences.sort,
  }
}

function toggleValue<T>(collection: T[], value: T) {
  return collection.includes(value)
    ? collection.filter((entry) => entry !== value)
    : [...collection, value]
}

function recipeReducer(state: RecipeState, action: RecipeAction): RecipeState {
  switch (action.type) {
    case 'set-search':
      return { ...state, searchTerm: action.payload }
    case 'toggle-course':
      return {
        ...state,
        filters: {
          ...state.filters,
          courses: toggleValue(state.filters.courses, action.payload),
        },
      }
    case 'toggle-cuisine':
      return {
        ...state,
        filters: {
          ...state.filters,
          cuisines: toggleValue(state.filters.cuisines, action.payload),
        },
      }
    case 'toggle-diet':
      return {
        ...state,
        filters: {
          ...state.filters,
          dietLabels: toggleValue(state.filters.dietLabels, action.payload),
        },
      }
    case 'set-prep-time':
      return {
        ...state,
        filters: {
          ...state.filters,
          prepTime: action.payload,
        },
      }
    case 'reset-filters':
      return {
        ...state,
        filters: { ...defaultFilters },
      }
    case 'set-view':
      return { ...state, viewMode: action.payload }
    case 'set-sort':
      return { ...state, sort: action.payload }
    default:
      return state
  }
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recipeReducer, undefined, createInitialState)

  useEffect(() => {
    writePreferences({ viewMode: state.viewMode, sort: state.sort })
  }, [state.sort, state.viewMode])

  const filtered = useMemo(
    () => filterRecipes(state.recipes, state.searchTerm, state.filters, state.sort),
    [state.filters, state.recipes, state.searchTerm, state.sort],
  )

  const value = useMemo<RecipeContextValue>(
    () => ({
      state,
      filtered,
      stats: deriveStats(filtered),
      availableCourses: manifestCourses,
      availableCuisines: manifestCuisines,
      availableDietLabels: manifestDietLabels,
      dispatch,
    }),
    [filtered, state],
  )

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecipeStore() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useRecipeStore must be used within RecipeProvider')
  }
  return context
}
