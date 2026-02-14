import { useEffect, useState } from 'react'
import { useForm, useFieldArray, useWatch, type FieldPath, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, FileJson, Plus, Trash2 } from 'lucide-react'
import { StepIndicator } from '../components/StepIndicator'
import { FormSection } from '../components/FormSection'
import {
  defaultRecipeValues,
  recipeFormSchema,
  toRecipe,
  type RecipeFormValues,
  generateSlug,
} from '../schema'
import type { Recipe } from '@/types/recipe'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const STEPS = ['Basics', 'Ingredients', 'Steps', 'Review']

export default function AddRecipePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [preview, setPreview] = useState<Recipe | null>(null)

  const {
    register,
    control,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema) as Resolver<RecipeFormValues>,
    defaultValues: defaultRecipeValues,
    mode: 'onBlur',
  })

  const ingredientArray = useFieldArray({ control, name: 'ingredients' })
  const stepsArray = useFieldArray({ control, name: 'steps' })

  const tags = useWatch({ control, name: 'tags' }) ?? []
  const tips = useWatch({ control, name: 'tips' }) ?? ['']

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed) return
    if (tags.includes(trimmed)) return
    setValue('tags', [...tags, trimmed], { shouldValidate: true })
  }

  const handleRemoveTag = (tag: string) => {
    setValue(
      'tags',
      tags.filter((entry) => entry !== tag),
      { shouldValidate: true },
    )
  }

  const addTipField = () => {
    setValue(
      'tips',
      [...tips, ''],
      { shouldValidate: true },
    )
  }

  const removeTipField = (index: number) => {
    if (tips.length === 1) return
    setValue(
      'tips',
      tips.filter((_, tipIndex) => tipIndex !== index),
      { shouldValidate: true },
    )
  }

  const slug = useWatch({ control, name: 'slug' }) ?? ''
  const title = useWatch({ control, name: 'title' }) ?? ''

  useEffect(() => {
    if (!title) return
    if (!slug) {
      setValue('slug', generateSlug(title), { shouldValidate: true })
    }
  }, [slug, title, setValue])

  const onSubmit = (values: RecipeFormValues) => {
    const recipe = toRecipe(values)
    setPreview(recipe)
    setCurrentStep(3)
  }

  const sectionsPerStep: Record<number, FieldPath<RecipeFormValues>[]> = {
    0: [
      'title',
      'description',
      'author',
      'slug',
      'course',
      'cuisine',
      'dietLabels',
      'prepMinutes',
      'cookMinutes',
      'yield',
      'difficulty',
      'heroImage',
      'tags',
    ],
    1: ['ingredients'],
    2: ['steps', 'tips'],
    3: [],
  }

  const nextStep = async () => {
    if (currentStep === 3) return
    const fields = sectionsPerStep[currentStep]
    const isValid = await trigger(fields)
    if (!isValid) return
    if (currentStep === 2) {
      await handleSubmit(onSubmit)()
    } else {
      setCurrentStep((step) => Math.min(step + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  const renderError = (field?: { message?: string }) =>
    field?.message ? <p className="text-xs text-rose-300">{field.message}</p> : null

  const downloadJson = () => {
    if (!preview) return
    if (typeof document === 'undefined') return
    const blob = new Blob([JSON.stringify(preview, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${preview.slug}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const markdown = preview ? formatMarkdown(preview) : ''

  return (
    <div className="space-y-6">
      <header className="space-y-3 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contributor tool</p>
        <h2 className="font-display text-4xl font-semibold">Share your trusted recipe</h2>
        <p className="text-white/70">
          Walk through the wizard, then copy the generated JSON or Markdown into{' '}
          <code>src/data/recipes</code> before opening a pull request.
        </p>
      </header>
      <StepIndicator steps={STEPS} current={currentStep} />
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <FormSection
            title="Foundations"
            description="Give us the basics so cooks know what to expect."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white">Title</label>
                <Input placeholder="Midnight pantry pasta" {...register('title')} />
                {renderError(errors.title)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Slug</label>
                <Input placeholder="midnight-pantry-pasta" {...register('slug')} />
                {renderError(errors.slug)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Author</label>
                <Input placeholder="Your name" {...register('author')} />
                {renderError(errors.author)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Course</label>
                <select
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/90 px-4 text-sm text-slate-900"
                  {...register('course')}
                >
                  {['breakfast', 'lunch', 'dinner', 'dessert', 'snack'].map((course) => (
                    <option key={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Cuisine</label>
                <Input placeholder="e.g. Nigerian" {...register('cuisine')} />
                {renderError(errors.cuisine)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Difficulty</label>
                <select
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/90 px-4 text-sm text-slate-900"
                  {...register('difficulty')}
                >
                  {['easy', 'medium', 'hard'].map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Prep minutes</label>
                <Input type="number" min={0} {...register('prepMinutes')} />
                {renderError(errors.prepMinutes)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Cook minutes</label>
                <Input type="number" min={0} {...register('cookMinutes')} />
                {renderError(errors.cookMinutes)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Yield</label>
                <Input placeholder="4 servings" {...register('yield')} />
                {renderError(errors.yield)}
              </div>
              <div>
                <label className="text-sm font-semibold text-white">Hero image URL</label>
                <Input placeholder="https://..." {...register('heroImage')} />
                {renderError(errors.heroImage)}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-white">Description</label>
              <Textarea rows={4} {...register('description')} />
              {renderError(errors.description)}
            </div>
            <div>
              <label className="text-sm font-semibold text-white">Tags</label>
              <TagInput tags={tags} onAdd={handleAddTag} onRemove={handleRemoveTag} />
              {renderError(errors.tags)}
            </div>
            <div>
              <label className="text-sm font-semibold text-white">Diet labels</label>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/80">
                {['vegan', 'vegetarian', 'gluten-free', 'dairy-free'].map((label) => (
                  <label key={label} className="inline-flex items-center gap-2">
                    <input type="checkbox" value={label} {...register('dietLabels')} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </FormSection>
        )}

        {currentStep === 1 && (
          <FormSection
            title="Ingredients"
            description="List everything a cook needs. Break complex sections into multiple rows."
          >
            <div className="space-y-4">
              {ingredientArray.fields.map((field, index) => {
                const ingredientError = errors.ingredients?.[index]
                return (
                  <div
                    key={field.id}
                    className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <Input placeholder="Quantity" {...register(`ingredients.${index}.quantity`)} />
                      {renderError(ingredientError?.quantity)}
                    </div>
                    <div>
                      <Input placeholder="Ingredient" {...register(`ingredients.${index}.item`)} />
                      {renderError(ingredientError?.item)}
                    </div>
                    <div>
                      <Input placeholder="Notes" {...register(`ingredients.${index}.notes`)} />
                      {renderError(ingredientError?.notes)}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="col-span-full justify-self-end text-white/60"
                      onClick={() => ingredientArray.remove(index)}
                    >
                    <Trash2 className="mr-2 size-4" />
                      Remove
                    </Button>
                  </div>
                )
              })}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => ingredientArray.append({ quantity: '', item: '', notes: '' })}
            >
              <Plus className="mr-2 size-4" />
              Add ingredient
            </Button>
          </FormSection>
        )}

        {currentStep === 2 && (
          <FormSection
            title="Steps & Tips"
            description="Write each step as a clear action. Keep verbs first."
          >
            <div className="space-y-4">
              {stepsArray.fields.map((field, index) => {
                const stepError = errors.steps?.[index]
                return (
                  <div key={field.id} className="space-y-2 rounded-2xl border border-white/10 p-4">
                    <label className="text-sm font-semibold text-white">Step {index + 1}</label>
                    <Textarea rows={3} {...register(`steps.${index}.text`)} />
                    <div className="flex justify-between">
                      {renderError(stepError?.text)}
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-white/60"
                        onClick={() => stepsArray.remove(index)}
                        disabled={stepsArray.fields.length === 1}
                      >
                      <Trash2 className="mr-2 size-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => stepsArray.append({ order: stepsArray.fields.length + 1, text: '' })}
            >
              <Plus className="mr-2 size-4" />
              Add step
            </Button>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white">Tips</label>
              {tips.map((_, index) => (
                <div key={`tip-${index}`} className="flex items-start gap-3">
                  <Textarea rows={2} {...register(`tips.${index}`)} />
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/60"
                    onClick={() => removeTipField(index)}
                    disabled={tips.length === 1}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addTipField}>
                <Plus className="mr-2 size-4" />
                Add tip
              </Button>
            </div>
          </FormSection>
        )}

        {currentStep === 3 && preview && (
          <FormSection
            title="Review and export"
            description="Copy this data into the repo as <slug>.json under src/data/recipes/"
          >
            <div className="space-y-4 text-sm text-white/80">
              <p>
                Slug <Badge className="ml-2 bg-brand-500/20 text-brand-50">{preview.slug}</Badge>
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-white">Recipe JSON</h4>
                  <pre className="mt-2 max-h-80 overflow-auto rounded-2xl bg-slate-900/80 p-4 text-xs text-green-200">
                    {JSON.stringify(preview, null, 2)}
                  </pre>
                  <div className="mt-2 flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => copyToClipboard(preview)}>
                    <FileJson className="mr-2 size-4" />
                      Copy JSON
                    </Button>
                    <Button type="button" variant="ghost" onClick={downloadJson}>
                    <Download className="mr-2 size-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-white">Markdown snapshot</h4>
                  <pre className="mt-2 max-h-80 overflow-auto rounded-2xl bg-slate-900/80 p-4 text-xs text-indigo-100">
                    {markdown}
                  </pre>
                  <Button type="button" variant="secondary" onClick={() => copyMarkdown(markdown)}>
                    Copy Markdown
                  </Button>
                </div>
              </div>
            </div>
          </FormSection>
        )}
      </form>
      <div className="flex justify-between">
        <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep < 3 && (
          <Button onClick={nextStep} variant="primary">
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}

function TagInput({
  tags,
  onAdd,
  onRemove,
}: {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
}) {
  const [draft, setDraft] = useState('')

  const submitTag = () => {
    onAdd(draft)
    setDraft('')
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} className="bg-brand-500/20 text-brand-50">
            {tag}
            <button
              type="button"
              className="ml-2 text-xs text-white/60"
              onClick={() => onRemove(tag)}
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add a tag"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              submitTag()
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={submitTag}>
          Add
        </Button>
      </div>
    </div>
  )
}

function copyToClipboard(recipe: Recipe) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    window.alert('Clipboard unavailable in this environment.')
    return
  }
  navigator.clipboard.writeText(JSON.stringify(recipe, null, 2))
}

function copyMarkdown(markdown: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    window.alert('Clipboard unavailable in this environment.')
    return
  }
  navigator.clipboard.writeText(markdown)
}

function formatMarkdown(recipe: Recipe) {
  return [
    `# ${recipe.title}`,
    '',
    recipe.description,
    '',
    `**Author:** ${recipe.author}`,
    `**Course:** ${recipe.course}`,
    `**Difficulty:** ${recipe.difficulty}`,
    '',
    '## Ingredients',
    ...recipe.ingredients.map((ingredient) => `- ${ingredient.quantity} ${ingredient.item}`),
    '',
    '## Steps',
    ...recipe.steps.map((step) => `${step.order}. ${step.text}`),
  ].join('\n')
}
