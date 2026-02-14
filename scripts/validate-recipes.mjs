import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { z } from 'zod'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const recipesDir = path.join(projectRoot, 'src', 'data', 'recipes')

const recipeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
  author: z.string().min(2),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  tags: z.array(z.string().min(1)),
  course: z.enum(['breakfast', 'lunch', 'dinner', 'dessert', 'snack']),
  cuisine: z.string().optional(),
  dietLabels: z.array(z.enum(['vegan', 'vegetarian', 'gluten-free', 'dairy-free'])),
  prepMinutes: z.number().int().min(0),
  cookMinutes: z.number().int().min(0),
  yield: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  heroImage: z.string().url().optional(),
  tips: z.array(z.string().min(3)).optional(),
  ingredients: z
    .array(
      z.object({
        quantity: z.string().min(1),
        item: z.string().min(1),
        notes: z.string().optional(),
      }),
    )
    .min(1),
  steps: z
    .array(
      z.object({
        order: z.number().int().positive(),
        text: z.string().min(3),
        media: z.string().optional(),
      }),
    )
    .min(1),
})

async function main() {
  const files = await fs.readdir(recipesDir)
  const slugs = new Set()
  const errors = []

  for (const fileName of files) {
    if (!fileName.endsWith('.json')) continue
    const filePath = path.join(recipesDir, fileName)
    const contents = await fs.readFile(filePath, 'utf8')
    try {
      const data = JSON.parse(contents)
      const result = recipeSchema.safeParse(data)
      if (!result.success) {
        errors.push({ file: fileName, issues: result.error.issues })
        continue
      }
      if (slugs.has(result.data.slug)) {
        errors.push({
          file: fileName,
          issues: [{ message: `Duplicate slug detected: ${result.data.slug}` }],
        })
      } else {
        slugs.add(result.data.slug)
      }
    } catch (error) {
      errors.push({
        file: fileName,
        issues: [{ message: `Invalid JSON: ${error.message}` }],
      })
    }
  }

  if (errors.length > 0) {
    console.error('Recipe validation failed:')
    for (const error of errors) {
      console.error(`- ${error.file}`)
      for (const issue of error.issues) {
        console.error(`   • ${issue.message}`)
      }
    }
    process.exit(1)
  } else {
    console.log(`Validated ${slugs.size} recipes successfully.`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
