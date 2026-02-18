# stu-landing

A component-first landing site for stu. built with Next.js + TypeScript, Tailwind CSS, Storybook, and Vitest.

## Project Overview

stu. is an early-talent alignment platform that translates employer-defined hiring standards into measurable, longitudinal capability pathways — improving candidate readiness before hiring begins.

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

### Type Check

```bash
npm run typecheck
```

### E2E (Playwright)

```bash
npx playwright install chromium
npm run test:e2e
```

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

### Security Audit (runtime dependencies)

```bash
npm run security:audit
```

## CI and Security

GitHub Actions workflows run on pull requests to `main` and pushes to `main`:

- `CI` workflow:
  - ESLint (`npm run lint`)
  - Unit tests (`npm run test`)
  - TypeScript typecheck (`npm run typecheck`)
  - Production build (`npm run build`)
  - Playwright e2e on Chromium (`npm run test:e2e`)
  - Runtime dependency audit (`npm run security:audit`)
  - Dependency Review (`actions/dependency-review-action`) on pull requests
- `CodeQL` workflow:
  - Static analysis with `javascript-typescript` and `security-and-quality` queries
  - Weekly scheduled scan

## Deploy

Deploy to Vercel (recommended) or any Node.js hosting provider:

1. Install dependencies.
2. Run `npm run build`.
3. Run `npm run start` for production serve.

## Notes and TODOs

- TODO: Wire real capability scoring endpoints in `lib/mock/api.ts`.
- TODO: Replace mock onboarding flow with authenticated employer onboarding.
- TODO: Expand analytics coverage for deeper component-level interactions.
- Agent panels are lazy-loaded in `pages/index.tsx` for initial performance.
- Hero media uses native lazy loading.

## PostHog Analytics

Set these in `.env.local` to enable telemetry:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_POSTHOG_ALLOWED_HOSTS=localhost,127.0.0.1,stuplanning.com,www.stuplanning.com
```

Tracked events include:

- Landing CTA clicks (`landing_cta_clicked`)
- Walkthrough entry and depth (`walkthrough_*`)
- Pilot form outcomes (`pilot_request_submitted`, `pilot_request_failed`)
- Frontend runtime errors (`frontend_error`, `frontend_unhandled_rejection`)

## Hero Copy A/B Test

Hero copy supports a PostHog feature flag:

- Flag key: `landing_hero_copy_variant`
- Control values: `control` or flag off
- Variant B values: `concrete`, `test`, `variant`, `b`, `treatment` (or boolean `true`)

Events emitted from hero and pilot submission include `heroCopyVariant` for conversion analysis.
