import { describe, expect, it } from 'vitest'
import { filterRecipes, deriveStats } from './selectors'
import type { Recipe } from '@/types/recipe'

const sampleRecipes: Recipe[] = [
  {
    slug: 'a',
    title: 'Summer Salad',
    description: 'Fresh salad with herbs',
    author: 'Jamie',
    createdAt: '2026-01-01T00:00:00.000Z',
    tags: ['fresh', 'salad'],
    course: 'lunch',
    cuisine: 'Mediterranean',
    dietLabels: ['vegetarian'],
    prepMinutes: 10,
    cookMinutes: 0,
    yield: '2 servings',
    difficulty: 'easy',
    heroImage: '',
    tips: [],
    ingredients: [{ quantity: '2 cups', item: 'greens' }],
    steps: [{ order: 1, text: 'Toss everything.' }],
  },
  {
    slug: 'b',
    title: 'Slow braised short ribs',
    description: 'Comfort food',
    author: 'Taylor',
    createdAt: '2025-12-01T00:00:00.000Z',
    tags: ['comfort'],
    course: 'dinner',
    cuisine: 'American',
    dietLabels: [],
    prepMinutes: 20,
    cookMinutes: 120,
    yield: '4 servings',
    difficulty: 'medium',
    heroImage: '',
    tips: [],
    ingredients: [{ quantity: '3 lb', item: 'short ribs' }],
    steps: [{ order: 1, text: 'Sear and braise.' }],
  },
]

describe('recipe selectors', () => {
  it('filters by search and diet', () => {
    const results = filterRecipes(
      sampleRecipes,
      'salad herbs',
      { courses: [], cuisines: [], dietLabels: ['vegetarian'], prepTime: 'any' },
      'alphabetical',
    )
    expect(results).toHaveLength(1)
    expect(results[0]?.slug).toBe('a')
  })

  it('sorts by total prep time', () => {
    const results = filterRecipes(
      sampleRecipes,
      '',
      { courses: [], cuisines: [], dietLabels: [], prepTime: '45-plus' },
      'prep-asc',
    )
    expect(results).toHaveLength(1)
    expect(results[0]?.slug).toBe('b')
  })

  it('derives stats from list', () => {
    const stats = deriveStats(sampleRecipes)
    expect(stats.total).toBe(2)
    expect(stats.quickMeals).toBe(1)
    expect(stats.vegetarian).toBe(1)
  })
})
