export type Difficulty = 'easy' | 'medium' | 'hard'

export type Course = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack'

export type DietLabel = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free'

export interface Ingredient {
  quantity: string
  item: string
  notes?: string
}

export interface InstructionStep {
  order: number
  text: string
  media?: string
}

export interface Recipe {
  slug: string
  title: string
  description: string
  author: string
  createdAt: string
  updatedAt?: string
  tags: string[]
  course: Course
  cuisine?: string
  dietLabels: DietLabel[]
  prepMinutes: number
  cookMinutes: number
  yield: string
  difficulty: Difficulty
  heroImage?: string
  tips?: string[]
  ingredients: Ingredient[]
  steps: InstructionStep[]
}
