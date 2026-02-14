import { describe, expect, it } from 'vitest'
import { recipeFormSchema, toRecipe, generateSlug } from './schema'

describe('recipe schema', () => {
  it('validates and transforms minimal payload', () => {
    const result = recipeFormSchema.safeParse({
      title: 'Test stew',
      description: 'Cozy and rich',
      author: 'Jordan',
      tags: ['cozy'],
      course: 'dinner',
      dietLabels: [],
      prepMinutes: 15,
      cookMinutes: 30,
      yield: '4 servings',
      difficulty: 'easy',
      ingredients: [{ quantity: '2 cups', item: 'broth' }],
      steps: [{ order: 1, text: 'Simmer' }],
    })
    expect(result.success).toBe(true)
  })

  it('generates sanitized slug', () => {
    const recipe = toRecipe({
      title: ' Fancy Pancakes! ',
      slug: '',
      description: 'Sweet and fluffy',
      author: 'Jess',
      tags: ['brunch'],
      course: 'breakfast',
      cuisine: '',
      dietLabels: [],
      prepMinutes: 10,
      cookMinutes: 10,
      yield: '6 pancakes',
      difficulty: 'easy',
      ingredients: [{ quantity: '1 cup', item: 'flour' }],
      steps: [{ order: 1, text: 'Mix ingredients.' }],
      heroImage: '',
      createdAt: new Date().toISOString(),
      tips: ['Serve warm'],
    })
    expect(recipe.slug).toBe('fancy-pancakes')
  })

  it('handles manual slug', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world')
  })
})
