# Not-Secret Family Recipe Book

A React + Vite single-page experience for browsing our collective family recipes, capturing new dishes, and deploying the whole thing to GitHub Pages.

## Highlights

- **Static-friendly data**: Recipes live as structured JSON in `src/data/recipes`, bundled into the client for instant search.
- **Rich browse experience**: Search with debounced keyword matching, filter by course/cuisine/diet/prep time, and view cards in grid or list layout.
- **Focused detail pages**: Sticky sidebars highlight timing, yields, and quick edit/share actions.
- **Contributor wizard**: The Add Recipe page guides authors through validation, generates JSON + Markdown, and mirrors the repo schema.
- **Automated guardrails**: Vitest suites, recipe validation script, and a Pages deployment workflow keep the content honest.

## Tech Stack

- React 19 + React Router 7
- Vite 5 / TypeScript 5.9
- Tailwind CSS with Radix Slot + tailwind-merge utilities
- React Hook Form + Zod for authoring flows
- Vitest + Testing Library for unit/UI coverage
- GitHub Actions + `peaceiris/actions-gh-pages` for deployments

## Getting Started

```bash
pnpm install   # or npm install
npm run dev    # starts Vite dev server with HMR
```

Environment assumptions:

- Node.js 20+
- GitHub Pages repository name matches the configured Vite base path (`notsecretrecipe` by default)

## Available Scripts

| Command                | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Local development server with hot reload                          |
| `npm run build`        | Type-check, build optimized production bundle into `dist/`        |
| `npm run preview`      | Preview the production build                                      |
| `npm run lint`         | ESLint with Tailwind + Prettier rules                             |
| `npm run format`       | Format everything with Prettier                                   |
| `npm run test`         | Watch mode Vitest runner                                          |
| `npm run test:run`     | Single-run Vitest (used in CI)                                    |
| `npm run recipes:validate` | Validates JSON recipes (schema + duplicate slug detection) |

CI/CD lives in `.github/workflows/deploy.yml` and performs lint → test → recipe validation → build → deploy on push to `main`.

## Project Structure

```
src/
  components/         Shared UI primitives + layout shell
  data/               JSON recipes and manifest loader
  features/
    recipes/          Browse + detail views, store, filters
    authoring/        Add Recipe wizard, schema helpers
  hooks/              Reusable hooks (debounce, etc.)
  test/               Vitest setup
scripts/validate-recipes.mjs   Data validation utility
```

## Recipe Schema

Each JSON file under `src/data/recipes` must match:

```ts
{
  slug: string;                  // unique kebab-case identifier
  title: string;
  description: string;
  author: string;
  createdAt: ISODateString;
  updatedAt?: ISODateString;
  tags: string[];
  course: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  cuisine?: string;
  dietLabels: ('vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free')[];
  prepMinutes: number;
  cookMinutes: number;
  yield: string;
  difficulty: 'easy' | 'medium' | 'hard';
  heroImage?: string;            // remote image URL
  tips?: string[];
  ingredients: { quantity: string; item: string; notes?: string }[];
  steps: { order: number; text: string; media?: string }[];
}
```

Run `npm run recipes:validate` before committing to catch schema drift and duplicate slugs.

## Deployment

1. Ensure the repository name matches the Vite base (`notsecretrecipe` by default). If not, update `repoBase` in `vite.config.ts`.
2. Enable GitHub Pages for the repo using the `gh-pages` branch (Settings → Pages → Deploy from branch).
3. Push to `main`. The GitHub Action builds and publishes `dist/` to the `gh-pages` branch automatically.

## Contributing

- Use the Add Recipe page (`/add`) locally to generate valid JSON/Markdown for new dishes.
- Follow the step-by-step instructions in [CONTRIBUTING.md](CONTRIBUTING.md) for naming, screenshots, and pull request expectations.
- Open a “Recipe proposal” issue using the provided template if you want feedback before coding.

Happy cooking! ✨
