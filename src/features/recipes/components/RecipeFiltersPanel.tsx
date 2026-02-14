import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useRecipeStore } from '../store'
import { PillToggle } from '@/components/ui/pill-toggle'
import { Button } from '@/components/ui/button'
import type { PrepTimeFilter } from '../types'

const PREP_TIME_OPTIONS: { label: string; value: PrepTimeFilter }[] = [
  { label: 'Any time', value: 'any' },
  { label: '< 15 min', value: 'under-15' },
  { label: '15-30 min', value: '15-30' },
  { label: '30-45 min', value: '30-45' },
  { label: '45+ min', value: '45-plus' },
]

export function RecipeFiltersPanel() {
  const {
    state: { filters },
    availableCourses,
    availableCuisines,
    availableDietLabels,
    dispatch,
  } = useRecipeStore()
  const [isOpen, setIsOpen] = useState(true)

  const activeCount = useMemo(() => {
    let count = filters.courses.length + filters.cuisines.length + filters.dietLabels.length
    if (filters.prepTime !== 'any') count += 1
    return count
  }, [filters])

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <header className="flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="size-5 text-brand-200" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">Filters</p>
            <p className="text-xl font-semibold">
              Tune the collection{' '}
              {activeCount > 0 && (
                <span className="text-base font-medium text-brand-200">({activeCount})</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80"
            onClick={() => dispatch({ type: 'reset-filters' })}
          >
            Reset
          </Button>
          <button
            type="button"
            className="text-sm text-white/70 underline-offset-4 hover:underline sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? 'Hide' : 'Show'}
          </button>
        </div>
      </header>
      <div className={isOpen ? 'mt-6 space-y-6' : 'hidden sm:mt-6 sm:block sm:space-y-6'}>
        <FilterSection title="Course">
          <div className="flex flex-wrap gap-2">
            {availableCourses.map((course) => (
              <PillToggle
                key={course}
                active={filters.courses.includes(course)}
                onClick={() => dispatch({ type: 'toggle-course', payload: course })}
              >
                {course}
              </PillToggle>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Cuisine">
          <div className="flex flex-wrap gap-2">
            {availableCuisines.map((cuisine) => (
              <PillToggle
                key={cuisine}
                active={filters.cuisines.includes(cuisine)}
                onClick={() => dispatch({ type: 'toggle-cuisine', payload: cuisine })}
              >
                {cuisine}
              </PillToggle>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Diet-friendly">
          <div className="flex flex-wrap gap-2">
            {availableDietLabels.map((diet) => (
              <PillToggle
                key={diet}
                active={filters.dietLabels.includes(diet)}
                onClick={() => dispatch({ type: 'toggle-diet', payload: diet })}
              >
                {diet}
              </PillToggle>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Total time">
          <div className="flex flex-wrap gap-2">
            {PREP_TIME_OPTIONS.map((option) => (
              <PillToggle
                key={option.value}
                active={filters.prepTime === option.value}
                onClick={() => dispatch({ type: 'set-prep-time', payload: option.value })}
              >
                {option.label}
              </PillToggle>
            ))}
          </div>
        </FilterSection>
      </div>
    </section>
  )
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">{title}</p>
      {children}
    </div>
  )
}
