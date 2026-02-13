# stu-landing

A component-first landing site for Stu built with Next.js + TypeScript, Tailwind CSS, Storybook, and Vitest.

## Project Overview

Stu is an early-talent alignment platform that translates employer-defined hiring standards into measurable, longitudinal capability pathways — improving candidate readiness before hiring begins.

This prototype uses a Storybook-first workflow with reusable UI primitives (`Button`, `Card`, `Badge`) and composable landing sections.

## Stack

- Next.js (TypeScript, Pages Router)
- Tailwind CSS + PostCSS
- Storybook (with Tailwind styling support)
- Vitest + Testing Library
- ESLint + Prettier

## Development Flow

1. Build components in Storybook first (`Button`, `Card`, `Hero`, then section components).
2. Compose the landing page in `pages/index.tsx` using only reusable components.
3. Keep all data mocked via `lib/mock/exampleData.ts` and `lib/mock/api.ts`.

## Install

### npm

```bash
npm install
```

### pnpm

```bash
pnpm install
```

### yarn

```bash
yarn
```

## Run

### Dev server

```bash
npm run dev
```

### Storybook

```bash
npm run storybook
```

### Tests

```bash
npm run test
```

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

## Deploy

Deploy to Vercel (recommended) or any Node.js hosting provider:

1. Install dependencies.
2. Run `npm run build`.
3. Run `npm run start` for production serve.

## Notes and TODOs

- TODO: Wire real capability scoring endpoints in `lib/mock/api.ts`.
- TODO: Replace mock onboarding flow with authenticated employer onboarding.
- TODO: Add analytics hooks for CTA and agent-workspace interactions.
- Agent panels are lazy-loaded in `pages/index.tsx` for initial performance.
- Hero media uses native lazy loading.
