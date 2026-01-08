# Mobile App Implementation Plan (Expo + Convex + Uniwind)

## Goal
Add a production-ready Expo (React Native) app using Expo Router + TypeScript, Uniwind for Tailwind-style classes, and Convex with shared bindings across web + mobile. Prioritize iOS + Android parity from day one. Keep Bun + Turborepo as the monorepo backbone.

## Constraints / Current State
- Monorepo already exists with `apps/web` and `packages/*`
- Convex currently lives under `apps/web/convex`
- Bun is the only package manager
- Next.js 16 uses `src/proxy.ts` (no middleware)

## Plan (High-Level)
1) **Scaffold `apps/mobile`**
   - Create Expo app with Expo Router + TypeScript (no install, then `bun install`).
   - Ensure `main: "expo-router/entry"` in `apps/mobile/package.json`.
   - Preserve Expo Router structure (`app/` directory).

2) **Uniwind + Tailwind v4**
   - Install `uniwind` + `tailwindcss`.
   - Create `apps/mobile/global.css`:
     - `@import 'tailwindcss';`
     - `@import 'uniwind';`
     - `@source "../../packages/shared/src/**/*.{ts,tsx}";` (monorepo)
   - Add `metro.config.js` with `withUniwindConfig` and `cssEntryFile`.
   - Import `../global.css` in `app/_layout.tsx`.

3) **Share Convex bindings**
   - Move `apps/web/convex` to repo root `convex/` for single source of truth.
   - Add `packages/convex` workspace package to re-export `_generated` bindings.
   - Use `@sendcat/convex` for shared API types from both apps.

4) **Convex client in mobile**
   - Install `convex` in `apps/mobile`.
   - Add `EXPO_PUBLIC_CONVEX_URL` env file for mobile.
   - Wrap Expo Router with `ConvexProvider` in `app/_layout.tsx`.

5) **Monorepo plumbing**
   - Update `.gitignore` for Expo caches (`.expo`, `.expo-shared`, `dist`).
   - Ensure Turbo scripts work with new app (add `dev` script to mobile).
   - Update README with mobile dev commands.

6) **Validation & smoke tests**
   - `bun install` at root.
   - `bun --cwd apps/mobile expo start` (iOS + Android).
   - Confirm Uniwind `className` renders in a sample screen.

## Docs Used (for correctness)
- Expo create-expo-app (default template includes Expo Router + TS)
- Expo Router entry setup
- Uniwind quickstart + metro config
- Convex React Native quickstart
- Convex + Clerk auth docs (for future mobile auth alignment)

## Deliverables
- `apps/mobile` Expo app scaffolded
- Uniwind configured and verified
- Convex shared bindings package (`packages/convex`)
- Root `convex/` folder (single source of truth)
- Updated monorepo configs (gitignore, README)
