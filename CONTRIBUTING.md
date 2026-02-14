# Contributing Guide

Thanks for keeping the family recipes alive! This guide explains how to add content, test changes, and open a pull request with confidence.

## 1. Prerequisites

- Node.js 20+ and npm (or pnpm/yarn)
- GitHub account with access to this repo
- Familiarity with Git branches + pull requests

## 2. Local Setup

```bash
git clone <repo>
cd NotSecretFamilyReceipeBook
npm install
npm run dev
```

Visit `http://localhost:5173/` to browse, and `http://localhost:5173/add` for the authoring wizard.

## 3. Adding a Recipe

1. Use the **Add Recipe** wizard (`/add`) to fill in every field.
2. The final step produces:
   - Canonical JSON ready for `src/data/recipes/<slug>.json`
   - Markdown summary (optional for docs or blog posts)
3. Save the JSON file under `src/data/recipes`, matching the slug shown in the wizard.
4. If you include imagery, prefer remote CDN/Unsplash links for now (no `public/` assets required).

## 4. Coding Standards

- Components live under `src/features/*` or `src/components/*` with colocated tests when applicable.
- Tailwind classes go directly inside components; prefer shared primitives if a pattern repeats 3+ times.
- Stick to the provided `Recipe` TypeScript interface for any new logic.
- Accessibility matters: keep headings ordered, use semantic elements, and wire up labels/ARIA for new inputs.

## 5. Validations Before Pushing

```bash
npm run lint
npm run test:run
npm run recipes:validate
npm run build
```

All four commands must pass locally. The GitHub workflow repeats these checks on every push to `main`.

## 6. Submitting a Pull Request

- Base branch: `main`
- Fill out the PR template checkboxes (tests, screenshots, validation output)
- Attach at least one screenshot/GIF for UI changes
- Mention which issue the PR closes (if applicable)
- Keep PRs focused: recipe additions, UI tweaks, and tooling upgrades should land separately whenever possible

## 7. Opening Issues

Use the issue templates under `.github/ISSUE_TEMPLATE`:

- **Recipe proposal** for new dish ideas or contributions
- **Bug report** for defects in UI, filters, data, or build tooling

Include reproduction steps, environment info, and screenshots when relevant.

## 8. Reviewing & Merging

- Another contributor reviews the PR
- Squash merge is preferred to keep the history tidy
- After merging, GitHub Pages automatically redeploys with the latest content

Thank you for helping document our not-so-secret family recipes! 🧑‍🍳
