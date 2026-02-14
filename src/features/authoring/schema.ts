import { z } from 'zod'
import type { Recipe } from '@/types/recipe'

export const ingredientSchema = z.object({
  quantity: z.string().min(1, 'Add a quantity'),
  item: z.string().min(1, 'Name the ingredient'),
  notes: z.string().optional(),
})

export const instructionSchema = z.object({
  order: z.number().int().positive(),
  text: z.string().min(5, 'Describe the step'),
  media: z.string().url().optional(),
})

export const recipeFormSchema = z.object({
  title: z.string().min(3, 'Give your recipe a name'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens')
    .optional(),
  description: z.string().min(10, 'Write a short description'),
  author: z.string().min(2, 'Add the author name'),
  createdAt: z.string().default(new Date().toISOString()),
  tags: z.array(z.string().min(2)).min(1, 'Add at least one tag'),
  course: z.enum(['breakfast', 'lunch', 'dinner', 'dessert', 'snack']),
  cuisine: z.string().optional(),
  dietLabels: z
    .array(z.enum(['vegan', 'vegetarian', 'gluten-free', 'dairy-free']))
    .default([]),
  prepMinutes: z.coerce.number().int().min(0),
  cookMinutes: z.coerce.number().int().min(0),
  yield: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  heroImage: z.string().url().optional(),
  tips: z.array(z.string().min(4)).optional(),
  ingredients: z.array(ingredientSchema).min(1),
  steps: z.array(instructionSchema).min(1),
})

export type RecipeFormValues = z.infer<typeof recipeFormSchema>

export const defaultRecipeValues: RecipeFormValues = {
  title: '',
  slug: '',
  description: '',
  author: '',
  createdAt: new Date().toISOString(),
  tags: [],
  course: 'dinner',
  cuisine: '',
  dietLabels: [],
  prepMinutes: 15,
  cookMinutes: 15,
  yield: '4 servings',
  difficulty: 'easy',
  heroImage: '',
  tips: [''],
  ingredients: [{ quantity: '', item: '', notes: '' }],
  steps: [{ order: 1, text: '' }],
}

export function toRecipe(values: RecipeFormValues): Recipe {
  const slug = values.slug ? sanitizeSlug(values.slug) : generateSlug(values.title)

  return {
    ...values,
    slug,
    createdAt: values.createdAt || new Date().toISOString(),
    tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
    cuisine: values.cuisine || undefined,
    heroImage: values.heroImage || undefined,
    tips: values.tips?.filter(Boolean),
    dietLabels: values.dietLabels ?? [],
    ingredients: values.ingredients.map((ingredient) => ({
      ...ingredient,
      notes: ingredient.notes || undefined,
    })),
    steps: values.steps.map((step, index) => ({
      ...step,
      order: index + 1,
    })),
  }
}

export function generateSlug(text: string) {
  if (!text) return ''
  return sanitizeSlug(
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-'),
  )
}

function sanitizeSlug(slug: string) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}
