import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Share2, Github } from 'lucide-react'
import { recipesBySlug } from '@/data/recipesManifest'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function RecipeDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const recipe = slug ? recipesBySlug.get(slug) : undefined

  if (!recipe) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
        <p className="text-2xl font-semibold">Recipe not found</p>
        <p className="mt-2 text-sm text-white/60">
          The recipe you&apos;re looking for doesn&apos;t exist yet. Want to add it?
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button asChild>
            <Link to="/add">Share a recipe</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalTime = recipe.prepMinutes + recipe.cookMinutes

  const copyShareLink = async () => {
    if (typeof navigator === 'undefined') return
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: shareUrl,
        })
        return
      } catch {
        // fall back
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
      window.alert('Recipe link copied to clipboard!')
    } else {
      window.prompt('Copy this link', shareUrl)
    }
  }

  return (
    <article className="space-y-8 text-white">
      <Button
        variant="ghost"
        className="text-white/80"
        onClick={() => navigate(-1)}
        aria-label="Back to results"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Button>
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            {recipe.course} &middot; {recipe.difficulty}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold">{recipe.title}</h2>
          <p className="mt-4 text-lg text-white/80">{recipe.description}</p>
          <img
            src={recipe.heroImage || '/images/recipes/placeholder.jpg'}
            alt=""
            className="mt-6 h-[360px] w-full rounded-3xl object-cover"
          />
          <section className="mt-8 space-y-4">
            <h3 className="text-2xl font-semibold">Ingredients</h3>
            <ul className="grid gap-2 text-white/80 md:grid-cols-2">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={`${ingredient.item}-${ingredient.quantity}`}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="font-semibold text-white">{ingredient.quantity}</span>{' '}
                  {ingredient.item}
                  {ingredient.notes && <span className="text-white/60"> &middot; {ingredient.notes}</span>}
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-8 space-y-4">
            <h3 className="text-2xl font-semibold">Steps</h3>
            <ol className="space-y-4">
              {recipe.steps.map((step) => (
                <li
                  key={step.order}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80"
                >
                  <span className="mr-3 inline-flex size-8 items-center justify-center rounded-full bg-brand-500/30 font-semibold text-brand-100">
                    {step.order}
                  </span>
                  {step.text}
                </li>
              ))}
            </ol>
          </section>
          {recipe.tips && recipe.tips.length > 0 && (
            <section className="mt-8 rounded-3xl border border-brand-500/40 bg-brand-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">
                Tips
              </p>
              <ul className="list-disc space-y-2 pl-5 text-brand-50/90">
                {recipe.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">Snapshot</p>
            <dl className="mt-4 space-y-3 text-white/90">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt>Prep</dt>
                <dd className="font-semibold">{recipe.prepMinutes} min</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt>Cook</dt>
                <dd className="font-semibold">{recipe.cookMinutes} min</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt>Total</dt>
                <dd className="font-semibold">{totalTime} min</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt>Yield</dt>
                <dd className="font-semibold">{recipe.yield}</dd>
              </div>
            </dl>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">Diet labels</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.dietLabels.length > 0 ? (
                recipe.dietLabels.map((label) => (
                  <Badge key={label} className="bg-brand-500/20 text-brand-50">
                    {label}
                  </Badge>
                ))
              ) : (
                <p className="text-white/60">No specific labels.</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full" onClick={copyShareLink}>
              <Share2 className="mr-2 size-4" />
              Share
            </Button>
            <Button asChild variant="ghost" className="w-full border border-white/20 text-white/90">
              <a
                href={`https://github.com/your-org/NotSecretFamilyReceipeBook/tree/main/src/data/recipes/${recipe.slug}.json`}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 size-4" />
                Edit on GitHub
              </a>
            </Button>
          </div>
        </aside>
      </div>
    </article>
  )
}
