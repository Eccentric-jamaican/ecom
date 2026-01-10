# Current Session Summary

## Latest Updates (2026-01-10)

- Confirmed eBay launch scope: EBAY_US marketplace, fixed-price only (no auctions).
- EPN campaign ID confirmed; outbound links will always prefer `itemAffiliateWebUrl`.
- Shipping estimates will be tested using `contextualLocation=country=JM`.
- Updated `.agent/plan/current-plan.md` with detailed eBay integration plan.
- Logged eBay launch decisions in `.agent/knowledge/key-decisions.md`.
- Found eBay content freshness requirement: listing info ≤ 6 hours old, other content ≤ 24 hours; disclose staleness if older.
- Clarified background jobs split: Inngest for AI agent calls only; Convex actions/scheduled functions (optional Workpool component) for eBay API work.
- Workpool explicitly deferred; start with Convex actions + scheduled/cron.
- Implemented eBay integration scaffolding: shared eBay client/types/parser + Zod schemas, Convex actions for search/item + internal upsert mutation, OAuth token helper + affiliate fallback builder.
- Wired web UI to Convex actions: FeaturedProducts now fetches live eBay data via `api.products.search`, and product details uses `api.products.getItem` with affiliate CTA.
- Added `@sendcat/shared` to root deps for Convex bundling and added `@sendcat/shared`/`@sendcat/convex` to web deps; ran `bunx convex dev` after fixing type error.
- Set `EBAY_ENV` to `sandbox` in Convex dev + `apps/web/.env.local` and updated storefront search to use query/category params instead of a hardcoded term.
- Started `bunx convex dev` successfully after removing stray compiled Convex outputs; added ignore rules for `convex/*.js` and `convex/*.d.ts*`.
- Added eBay-inspired category browsing: new `/b/[slug]/[node]` route with filter pills (All, Buy It Now, Best Offer, Auction disabled) and a `CategoryResults` component for live listings.
- Updated CategoryGrid links to eBay-like paths and added category node identifiers (real electronics node, placeholders for others).
- Switched `EBAY_ENV` to `production` in Convex dev + `apps/web/.env.local`, fixed seller rating parsing/coercion in shared schemas, and added `i.ebayimg.com` to Next.js image remote patterns (requires Next dev server restart).
- Improved category browsing relevance and UX: category links now pass curated `q` queries, filter pills preserve `q`, loading state shows skeletons, and breadcrumbs now include a Shop link.
- Updated category browsing to use real eBay category IDs and robust URL parsing (client-side pathname/search params) so `/b/[slug]/[node]` reflects the actual category and filter pills preserve `q` + `categoryId`.
- Added skeleton loading for product details, guarded missing itemId calls, and made product details degrade gracefully on errors.

## Last Session (2026-01-07)

### Work Completed

- Created comprehensive PRD.md (134KB, 3,200+ lines)
- Configured Next.js with Inter + Inter Tight fonts
- Implemented fluid typography CSS with clamp() variables
- Documented multi-agent architecture (Dexter-inspired)
- Defined eBay carousel design system specifications
- Selected Zod for runtime validation
- Decided on Bun as package manager
- Updated PRD and README to reflect Bun as the package manager
- Established monorepo scaffold (apps/web, packages/\*, root turbo config)
- Initialized Convex in `apps/web` and added the PRD-backed schema
- Set up Clerk base integration (`@clerk/nextjs`, `src/proxy.ts`, sign-in/sign-up routes)
- Added Convex + Clerk integration (Convex client provider + `convex/auth.config.ts`)
- Removed deprecated `src/middleware.ts` to satisfy Next.js 16 proxy convention
- Resolved merge conflict in `apps/web/src/app/layout.tsx`
- Created agent memory system structure
- Scaffolded Expo mobile app in `apps/mobile` (Expo Router + TypeScript)
- Added Uniwind styling support (`apps/mobile/global.css`, `apps/mobile/metro.config.js`)
- Added mobile Convex client/provider (`apps/mobile/lib/convex.ts`, `app/_layout.tsx`)
- Moved Convex backend to root `convex/` and added `packages/convex` for shared bindings
- Updated root `.gitignore` for Expo + env files and refreshed README mobile instructions
- Wired Clerk Expo SDK in mobile (`@clerk/clerk-expo`, `expo-secure-store`) and integrated `ConvexProviderWithClerk` in `apps/mobile/app/_layout.tsx`
- Switched workspace packages (`shared`, `ui`, `convex`) to compiled `dist/` outputs with build configs and exports for maintainability
- Aligned `apps/mobile/components/ui/icon-symbol.tsx` props with iOS variant (color/style types, keep weight param)
- Updated `apps/mobile/components/ui/icon-symbol.ios.tsx` to accept `OpaqueColorValue` for React Navigation color compatibility
- Updated `apps/mobile/components/themed-text.tsx` to use theme `link` color and removed hardcoded link color
- Replaced invalid CSS animation in `apps/mobile/components/hello-wave.tsx` with a Reanimated shared value + animated style
- Installed Inngest in `apps/web` and added minimal client, functions, and API route with an `inngest:dev` script
- Added `FIRECRAWL_API_KEY` to `apps/web/.env.local`
- Added Sentry MCP server config in `mcp_config.json`
- Moved Sentry DSN to `NEXT_PUBLIC_SENTRY_DSN` env var in server/edge configs and added `.env.example`
- Product details page review note: `params.slug` currently unused; user chose to defer changes until later (no seed script)
- **Foundation Phase Verified:**
  - Installed `@clerk/nextjs`, `ai`, `@ai-sdk/openai`
  - Configured `.env.local` with Clerk & OpenRouter keys
  - Verified `src/proxy.ts` for Next.js 16 auth middleware

### Key Decisions

1. **Package Manager:** Bun (developer preference)
2. **Validation:** Zod + Convex dual validation approach
3. **UI Pattern:** Horizontal carousels (eBay spec) not vertical grids
4. **Agent Architecture:** Multi-stage (Planning → Action → Validation → Answer)
5. **Fonts:** Inter + Inter Tight with fluid clamp() typography
6. **Auth Middleware:** Used `src/proxy.ts` (Next.js 16 convention) instead of `middleware.ts`

### Tech Stack Finalized

| Layer       | Technology                 |
| ----------- | -------------------------- |
| Frontend    | Next.js 16 (App Router)    |
| Styling     | Tailwind CSS               |
| Language    | TypeScript (Strict)        |
| Validation  | Zod                        |
| Auth        | Clerk                      |
| Database    | Convex                     |
| AI          | OpenRouter + Vercel AI SDK |
| Background  | Inngest                    |
| Search      | FireCrawl API              |
| Marketplace | eBay Browse API            |
| Hosting     | Vercel                     |
| Monitoring  | Sentry                     |
| Analytics   | Amplitude + PostHog        |
| Testing     | Playwright + Vitest        |

### Project Context

- **Name:** Sendcat (no space)
- **Type:** Mobile-first e-commerce aggregation platform
- **Target:** Budget-conscious Caribbean shoppers
- **Revenue:** eBay Partner Network affiliate commissions
- **AI:** Multi-agent system for intelligent product discovery

### Ready To Start

- Core UI components (ProductCard, Carousel, ChatInterface)
- Chat API Implementation
