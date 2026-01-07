# Technology Stack

## Frontend

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Framework | Next.js | 16 | App Router, SSR, Vercel integration |
| Language | TypeScript | 5.x | Strict mode, type safety |
| Styling | Tailwind CSS | 4.x | Utility-first, low bundle size |
| Fonts | Inter + Inter Tight | Google Fonts | Modern, readable, free |
| Components | shadcn/ui + Radix UI | Latest | Accessible, customizable |

## Backend & Database

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Database | Convex | Latest | Serverless, real-time, TypeScript-native |
| Auth | Clerk | Latest | Pre-built auth, user management |
| Background Jobs | Inngest | Latest | Serverless background processing |
| Validation | Zod | Latest | Runtime type validation |

## AI & Machine Learning

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| LLM Provider | OpenRouter | Latest | Access to GPT-4, Claude, open models |
| AI SDK | Vercel AI SDK | Latest | Chat interface, streaming, React hooks |
| Agent Framework | Custom (Dexter-inspired) | - | Multi-agent orchestration |

## APIs & Integrations

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Marketplace | eBay Browse API | v1 | Product search and aggregation |
| Web Scraping | FireCrawl API | Latest | Fallback for rich content |
| Search | eBay + FireCrawl | - | Dual strategy for product discovery |

## DevOps & Infrastructure

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Package Manager | Bun | Latest | Fast installs, good monorepo support |
| Build System | Turborepo | Latest | Monorepo orchestration |
| Hosting | Vercel | - | Zero-config Next.js deployment |
| Monitoring | Sentry | Latest | Error tracking, performance monitoring |
| Analytics | Amplitude + PostHog | Latest | Product analytics, user behavior |

## Testing

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| E2E Testing | Playwright | Latest | Cross-browser testing |
| Unit Testing | Vitest | Latest | Fast, Jest-compatible |
| Type Checking | TypeScript | 5.x | Strict mode |

## Design System

| Category | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Typography | Inter + Inter Tight | - | Google Fonts, mobile-friendly |
| Responsive | Fluid (clamp()) | - | Scales without breakpoints |
| Carousels | eBay Design System | - | Horizontal scroll, industry standard |

## Package Manager

**Choice:** Bun

**Reason:** Developer preference for faster installs and better monorepo support with Bun.

---

## Quick Reference

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Type check
bun run typecheck

# Lint
bun run lint

# Test
bun run test

# Convex development
npx convex dev
```
