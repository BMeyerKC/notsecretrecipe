import { Link } from 'react-router-dom'
import { Clock3, ChefHat } from 'lucide-react'
import type { Recipe } from '@/types/recipe'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/cn'

interface RecipeCardProps {
  recipe: Recipe
  layout?: 'grid' | 'list'
}

export function RecipeCard({ recipe, layout = 'grid' }: RecipeCardProps) {
  return (
    <Link
      to={`/recipe/${recipe.slug}`}
      className={cn(
        'group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-card transition hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-brand-500/30',
        layout === 'list' ? 'flex gap-6 p-4' : 'flex flex-col',
      )}
    >
      <div
        className={cn(
          'overflow-hidden bg-slate-900/40',
          layout === 'list' ? 'h-32 w-48 rounded-2xl' : 'aspect-[4/3] w-full',
        )}
      >
        <img
          src={recipe.heroImage || '/placeholder.jpg'}
          alt=""
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className={cn('flex flex-1 flex-col gap-3', layout === 'grid' ? 'p-6' : '')}>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/70">
          <span className="font-semibold text-brand-200">{recipe.course}</span>
          <span className="text-white/40">•</span>
          <span>{recipe.difficulty}</span>
        </div>
        <h3 className="text-2xl font-semibold text-white">{recipe.title}</h3>
        <p className="text-sm text-white/70">{recipe.description}</p>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} className="bg-brand-500/10 text-brand-100">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-white/80">
          <span className="inline-flex items-center gap-1">
            <ChefHat className="size-4 text-brand-200" />
            {recipe.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-4 text-brand-200" />
            {recipe.prepMinutes + recipe.cookMinutes} mins total
          </span>
        </div>
      </div>
    </Link>
  )
}
