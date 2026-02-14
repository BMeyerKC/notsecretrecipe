import { useEffect, useState } from 'react'
import { Search, Rows, LayoutGrid } from 'lucide-react'
import { useRecipeStore } from '../store'
import type { SortOption } from '../types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'A -> Z', value: 'alphabetical' },
  { label: 'Fastest prep', value: 'prep-asc' },
]

export function RecipeSearchBar() {
  const {
    state: { searchTerm, sort, viewMode },
    dispatch,
    filtered,
  } = useRecipeStore()
  const [value, setValue] = useState(searchTerm)
  const debounced = useDebouncedValue(value, 300)

  useEffect(() => {
    dispatch({ type: 'set-search', payload: debounced })
  }, [debounced, dispatch])

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-2 shadow-inner">
        <Search className="size-5 text-brand-500" />
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search ingredients, tags, or authors..."
          className="border-none bg-transparent p-0 text-base text-slate-900 shadow-none focus:ring-0"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 p-1">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            className="rounded-2xl px-3 py-1"
            onClick={() => dispatch({ type: 'set-view', payload: 'grid' })}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            className="rounded-2xl px-3 py-1"
            onClick={() => dispatch({ type: 'set-view', payload: 'list' })}
          >
            <Rows className="size-4" />
          </Button>
        </div>
        <select
          className="h-11 rounded-2xl border border-white/20 bg-white/90 px-4 text-sm font-semibold text-slate-900 shadow-inner focus:border-brand-300"
          value={sort}
          onChange={(event) =>
            dispatch({ type: 'set-sort', payload: event.target.value as SortOption })
          }
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="text-sm text-white/70">
          <span className="text-xl font-semibold text-white">{filtered.length}</span> delicious
          result{filtered.length === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  )
}
