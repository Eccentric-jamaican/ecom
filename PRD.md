# Sendcat - Product Requirements Document (PRD)

## Document Information

| Field | Value |
|-------|-------|
| **Project Name** | Sendcat |
| **Version** | 1.0 |
| **Status** | Draft |
| **Created** | January 6, 2026 |
| **Tech Stack** | Next.js, Tailwind, TypeScript, Zod, Clerk, Convex, OpenRouter, Inngest, Vercel |
| **Architecture** | Monorepo (Web + Mobile) |

---

## 1. Executive Summary

Sendcat is a mobile-first e-commerce aggregation platform that connects users with products from multiple marketplaces (eBay, Amazon, AliExpress) through an intelligent AI-powered shopping assistant. The platform uses a multi-agent architecture to handle complex shopping queries, provide personalized recommendations, and source products across multiple categories in a single request.

**Core Value Proposition:**
- Unified shopping experience across multiple marketplaces
- AI-powered intelligent shopping assistant with multi-agent architecture
- Natural language product search ("Find laptops under $800, red jackets, and size 10 shoes")
- Results organized by category in horizontal carousels
- Affiliate revenue through marketplace partnerships

**Target Audience:**
- Budget-conscious shoppers in the Caribbean region
- Users who want to compare products across multiple platforms
- Shoppers who prefer AI-assisted discovery over manual browsing

**Revenue Model:**
- eBay Partner Network affiliate commissions on eligible purchases
- Premium subscription tier (future) for advanced AI features

---

## 2. Monorepo Architecture

### 2.1 Architecture Overview

Sendcat uses a **monorepo architecture** to share code between the web application (Next.js) and future mobile application (Expo). This approach maximizes code reuse, simplifies maintenance, and ensures feature parity across platforms.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Sendcat Monorepo                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                        Root Configuration                    │   │
│   │   • Turborepo (build orchestration)                         │   │
│   │   • PNPM (package manager)                                  │   │
│   │   • TypeScript (shared config)                              │   │
│   │   • ESLint (shared linting)                                 │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌─────────────────────┐    ┌─────────────────────────────────┐   │
│   │       apps/         │    │          packages/              │   │
│   ├─────────────────────┤    ├─────────────────────────────────┤   │
│   │                     │    │                                 │   │
│   │  ┌───────────────┐  │    │  ┌───────────────────────────┐  │   │
│   │  │    web/       │  │    │  │       shared/             │  │   │
│   │  │  Next.js      │  │    │  │  • types/                 │  │   │
│   │  │  (Current)    │  │    │  │  • api-clients/           │  │   │
│   │  │               │  │    │  │  • convex-functions/      │  │   │
│   │  │ • App Router  │  │    │  │  • ai-agents/             │  │   │
│   │  │ • Tailwind    │  │    │  │  • logging/               │  │   │
│   │  │ • Clerk Auth  │  │    │  │  • utilities/             │  │   │
│   │  └───────────────┘  │    │  └───────────────────────────┘  │   │
│   │                     │    │                                 │   │
│   │  ┌───────────────┐  │    │  ┌───────────────────────────┐  │   │
│   │  │   mobile/     │  │    │  │         ui/               │  │   │
│   │  │    Expo       │  │    │  │  • ProductCard/           │  │   │
│   │  │   (Future)    │  │    │  │  • Carousel/              │  │   │
│   │  │               │  │    │  │  • ChatInterface/         │  │   │
│   │  │ • Expo Router │  │    │  │  • Button/                │  │   │
│   │  │ • NativeWind  │  │    │  │  • shared-components/     │  │   │
│   │  │ • Reanimated  │  │    │  └───────────────────────────┘  │   │
│   │  └───────────────┘  │    │                                 │   │
│   │                     │    │  ┌───────────────────────────┐  │   │
│   └─────────────────────┘    │  │       config/             │  │   │
│                              │  │  • tailwind/               │  │   │
│                              │  │  • typescript/             │  │   │
│                              │  │  • eslint/                 │  │   │
│                              │  └───────────────────────────┘  │   │
│                              └────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Directory Structure

```
send-cat/
├── apps/
│   ├── web/                          # Next.js web application
│   │   ├── src/
│   │   │   ├── app/                  # App Router pages
│   │   │   │   ├── page.tsx          # Home/storefront
│   │   │   │   ├── search/           # Search results
│   │   │   │   ├── chat/             # AI chat interface
│   │   │   │   ├── profile/          # User profile
│   │   │   │   └── saved/            # Saved items
│   │   │   ├── components/           # Web-specific components
│   │   │   ├── lib/                  # Web-specific utilities
│   │   │   └── middleware.ts         # Clerk auth middleware
│   │   ├── public/                   # Static assets
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── mobile/                       # Expo React Native app (Future)
│       ├── src/
│       │   ├── app/                  # Expo Router pages
│       │   │   ├── _layout.tsx       # Native navigation
│       │   │   ├── index.tsx         # Home
│       │   │   ├── search.tsx        # Search
│       │   │   ├── chat.tsx          # AI chat
│       │   │   └── profile.tsx       # User profile
│       │   ├── components/           # Native components
│       │   ├── hooks/                # Native hooks
│       │   └── utils/                # Native utilities
│       ├── app.json
│       ├── app.config.ts
│       ├── metro.config.js
│       └── package.json
│
├── packages/
│   ├── shared/                       # Shared code (web + mobile)
│   │   ├── src/
│   │   │   ├── types/                # TypeScript interfaces
│   │   │   │   ├── product.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── agent.ts
│   │   │   │   └── analytics.ts
│   │   │   ├── api-clients/          # Marketplace API clients
│   │   │   │   ├── ebay/
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── parser.ts
│   │   │   │   ├── amazon/           # Future
│   │   │   │   └── aliexpress/       # Future
│   │   │   ├── convex-functions/     # Convex backend functions
│   │   │   │   ├── queries/
│   │   │   │   ├── mutations/
│   │   │   │   └── actions/
│   │   │   ├── ai-agents/            # Multi-agent architecture
│   │   │   │   ├── supervisor/
│   │   │   │   ├── search-agent/
│   │   │   │   ├── price-agent/
│   │   │   │   ├── sourcing-agent/
│   │   │   │   └── recommendation-agent/
│   │   │   ├── logging/              # Structured logging
│   │   │   │   ├── wide-event.ts
│   │   │   │   ├── otel-config.ts
│   │   │   │   └── sampler.ts
│   │   │   ├── validation/           # Zod schemas
│   │   │   │   ├── index.ts
│   │   │   │   ├── product.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── agent.ts
│   │   │   │   └── search.ts
│   │   │   ├── constants/            # Shared constants
│   │   │   │   ├── rate-limits.ts
│   │   │   │   └── config.ts
│   │   │   └── utilities/            # Helper functions
│   │   │       ├── formatting.ts
│   │   │       └── validation.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                           # Shared UI components
│   │   ├── src/
│   │   │   ├── ProductCard/          # Reusable product card
│   │   │   │   ├── index.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── shared-styles.ts
│   │   │   ├── Carousel/             # Horizontal scrolling carousel
│   │   │   │   ├── index.tsx
│   │   │   │   ├── hooks/
│   │   │   │   └── shared-config.ts
│   │   │   ├── ChatInterface/        # AI chat UI
│   │   │   │   ├── index.tsx
│   │   │   │   ├── message.tsx
│   │   │   │   └── input.tsx
│   │   │   ├── Button/               # Reusable button
│   │   │   ├── Modal/                # Modal dialog
│   │   │   └── shared-components/    # Cross-platform components
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                       # Shared configurations
│       ├── tailwind/
│       │   ├── web-tailwind.config.ts
│       │   ├── nativewind.config.ts
│       │   └── theme.ts
│       ├── typescript/
│       │   ├── base.json
│       │   └── strict.json
│       └── eslint/
│           ├── base.json
│           └── react.json
│
├── package.json                      # Root workspace
├── pnpm-workspace.yaml               # PNPM workspaces
├── turbo.json                        # Turborepo config
├── .env.example                      # Environment template
└── README.md
```

### 2.3 Package Manager & Build System

**PNPM** is chosen as the package manager for its:
- Disk efficiency (shared node_modules)
- Faster installations
- Strict workspace protocol

**Turborepo** provides:
- Intelligent build caching
- Parallel task execution
- Remote caching (for CI/CD)
- Dependency graph visualization

```json
// package.json (root)
{
  "name": "send-cat",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "pnpm": "^9.0.0"
  }
}
```

### 2.4 Code Sharing Strategy

| Category | Shared | Web-Specific | Mobile-Specific |
|----------|--------|--------------|-----------------|
| **Types** | All TypeScript interfaces | | |
| **API Clients** | eBay, Amazon, AliExpress | | |
| **AI Agents** | All agent logic | | |
| **Convex Functions** | All queries/mutations/actions | | |
| **Logging Config** | Structured logging setup | | |
| **Product Card Logic** | Data handling, rendering logic | Styling | Styling (NativeWind) |
| **Carousel Logic** | Scroll, snap, pagination | Touch/keyboard | Native gestures |
| **Chat Interface** | Message rendering, state | Input handling | Keyboard, voice |
| **Auth** | Clerk integration | | Native prompts |
| **Navigation** | | Next.js App Router | Expo Router |
| **Styling** | | Tailwind CSS | NativeWind |

### 2.5 Convex Integration

Convex serves as the backend database for both applications:

- **Web**: Next.js API routes call Convex functions
- **Mobile**: React Native app calls same Convex functions
- **Shared**: Same Convex backend, same database schema

```typescript
// packages/shared/src/convex-functions/queries/products.ts
import { query } from "convex/server";
import { v } from "convex/values";

export const searchProducts = query({
  args: {
    query: v.string(),
    filters: v.optional(v.object({
      priceMin: v.optional(v.number()),
      priceMax: v.optional(v.number()),
      category: v.optional(v.string()),
      condition: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    // This works for both web and mobile
    const products = await ctx.db
      .query("products")
      .withIndex("search")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "active"),
          q.gte(q.field("price"), args.filters?.priceMin ?? 0),
          q.lte(q.field("price"), args.filters?.priceMax ?? 999999)
        )
      )
      .take(50);
    
    return products;
  },
});
```

### 2.6 Migration Path

**Phase 1 (Current)**: Build web application
```
apps/web/          # Next.js (existing)
packages/shared/   # Create shared package first
packages/ui/       # Create shared UI components
packages/config/   # Shared configurations
```

**Phase 2 (Mobile Expansion)**: Add mobile application
```
apps/mobile/       # Expo app (new)
packages/ui/       # Extend components for native
```

**Key Principle**: Write web components with React Native compatibility in mind (use NativeWind for cross-platform styling).

---

## 3. Technical Architecture

### 3.1 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend (Web)** | Next.js 14+ (App Router) | React framework, SSR, routing |
| **Styling** | Tailwind CSS | Utility-first styling |
| **Language** | TypeScript (Strict Mode) | Type safety, no `any` types |
| **Validation** | Zod | Runtime validation for forms, AI outputs, API inputs |
| **Authentication** | Clerk | User management, auth flows |
| **Database** | Convex | Backend, real-time sync, queries |
| **AI/ML** | OpenRouter | LLM access (GPT-4, Claude, etc.) |
| **AI SDK** | Vercel AI SDK | Chat interface, streaming |
| **Background Jobs** | Inngest | Long-running AI tasks, notifications |
| **Web Search** | FireCrawl API | Enhanced product discovery |
| **Marketplace APIs** | eBay Browse API, Feed API | Product aggregation |
| **Hosting** | Vercel | Deployment, edge functions, CDN |
| **Monitoring** | Sentry | Error tracking, performance |
| **Analytics** | Amplitude + PostHog | Product analytics, user behavior |
| **Testing** | Playwright (E2E), Vitest (Unit) | Test automation |
| **Linting** | ESLint + Prettier | Code quality |

### 3.1.1 Validation Strategy (Zod + Convex Integration)

Sendcat uses **Zod** for runtime validation alongside Convex's database validators. They serve different purposes and complement each other:

| Validation Layer | Tool | Purpose | When It Runs |
|------------------|------|---------|--------------|
| **Database Schema** | Convex `v.*` validators | Defines what data is stored | Database level |
| **Runtime Validation** | Zod | Validates inputs/outputs at runtime | API calls, forms, AI outputs |
| **Type Safety** | TypeScript | Compile-time type checking | Development only |

#### Zod Schemas (packages/shared/src/validation/)

```typescript
// User preference schemas
export const zUserPreferences = z.object({
  preferredBrands: z.array(z.string()).optional(),
  sizeRanges: z.array(z.string()).optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
});

// Product schemas
export const zProduct = z.object({
  externalId: z.string(),
  title: z.string().min(1).max(500),
  imageUrl: z.string().url(),
  images: z.array(z.string().url()).optional(),
  price: z.number().positive(),
  currency: z.string().length(3),
  condition: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
});

// AI agent schemas
export const zAgentTask = z.object({
  taskId: z.string(),
  type: z.enum(["search", "price", "sourcing", "recommendation"]),
  query: z.string(),
  parameters: z.record(z.unknown()).optional(),
  priority: z.number().int().min(1).max(10).default(5),
});

export const zAgentResult = z.object({
  taskId: z.string(),
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  durationMs: z.number().positive(),
});

// Search filter schemas
export const zSearchFilters = z.object({
  query: z.string().min(1).max(200),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  category: z.string().optional(),
  condition: z.enum(["new", "used", "refurbished"]).optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  sortBy: z.enum(["relevance", "price_asc", "price_desc", "ending_soon"]).optional(),
});
```

#### Convex + Zod Integration (using convex-helpers)

```typescript
import { z } from "zod";
import { zCustomMutation } from "convex-helpers/server/zod";

export const createProduct = zCustomMutation({
  input: z.object({
    title: z.string().min(1).max(200),
    price: z.number().positive(),
    category: z.enum(["electronics", "clothing", "home", "sports"]),
    imageUrl: z.string().url(),
  }),
  output: z.object({
    id: z.string(),
    success: z.boolean(),
  }),
  handler: async (ctx, args) => {
    // Args are already validated by Zod
    const id = await ctx.db.insert("products", {
      ...args,
      status: "active",
      cachedAt: Date.now(),
    });
    return { id, success: true };
  },
});
```

#### AI Agent Output Validation

Critical for multi-agent system to validate agent outputs at runtime:

```typescript
import { z } from "zod";

const ProductSearchResult = z.object({
  category: z.string(),
  products: z.array(z.object({
    id: z.string(),
    title: z.string(),
    price: z.number().positive(),
    imageUrl: z.string().url(),
    affiliateUrl: z.string().url(),
  })),
  totalCount: z.number().int().nonnegative(),
});

// Validate agent output before storing
function validateSearchResult(output: unknown): ProductSearchResult {
  return ProductSearchResult.parse(output);
}

// In agent handler
async function searchAgentHandler(query: string) {
  const rawResults = await eBayAPI.search(query);
  
  // Critical: validate AI/API output before processing
  const validatedResults = validateSearchResult({
    category: detectCategory(query),
    products: rawResults,
    totalCount: rawResults.length,
  });
  
  return validatedResults;
}
```

#### Form Validation (React Hook Forms + Zod)

```typescript
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchQuerySchema = z.object({
  query: z.string().min(2).max(500),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  category: z.string().optional(),
});

function SearchForm() {
  const form = useForm({
    resolver: zodResolver(SearchQuerySchema),
    defaultValues: {
      query: "",
      priceMin: undefined,
      priceMax: undefined,
      category: "",
    },
  });
  // ...
}
```

#### Why Zod Benefits Sendcat

| Use Case | Convex | Zod | Benefit |
|----------|--------|-----|---------|
| Database schema | ✅ | | Defines stored data |
| API input validation | | ✅ | Prevents invalid data entering system |
| AI output validation | | ✅ | Critical for agent reliability |
| Form validation | | ✅ | User-friendly error messages |
| Cross-package types | ✅ | ✅ | Shareable via `z.infer<typeof schema>` |
| AI SDK integration | | ✅ | Vercel AI SDK uses Zod for schema validation |

### 3.2 Multi-Agent Architecture (Dexter-Inspired)

Sendcat's AI architecture is **inspired by Dexter**, an open-source autonomous financial research agent known for its intelligent task planning, self-validation, and loop detection capabilities. Unlike simple chatbot interfaces, Sendcat's agents **think, plan, and validate** their work before delivering results.

#### 3.2.1 Agent Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Dexter-Inspired Multi-Agent Architecture                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   User Query: "Find laptops under $800, red jackets under $50, size 10     │
│               running shoes, and 55-inch 4K TVs"                           │
│                                      │                                      │
│                                      ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                    1. PLANNING AGENT                                 │  │
│   │   ┌──────────────────────────────────────────────────────────────┐  │  │
│   │   │ • Analyzes complex query                                      │  │  │
│   │   │ • Decomposes into structured research tasks                  │  │  │
│   │   │ • Identifies categories: laptops, jackets, shoes, TVs        │  │  │
│   │   │ • Creates task list with dependencies                        │  │  │
│   │   │ • Estimates effort per task                                  │  │  │
│   │   └──────────────────────────────────────────────────────────────┘  │  │
│   │                                      │                                │  │
│   │                                      ▼                                │  │
│   │   ┌─────────────────────────────────────────────────────────────────┐│
│   │   │                      TASK QUEUE                                 ││
│   │   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               ││
│   │   │  │ Task 1:     │ │ Task 2:     │ │ Task 3:     │               ││
│   │   │  │ Search      │ │ Search      │ │ Search      │               ││
│   │   │  │ Laptops     │ │ Jackets     │ │ Shoes       │               ││
│   │   │  │ ($800)      │ │ ($50, red)  │ │ (size 10)   │               ││
│   │   │  └─────────────┘ └─────────────┘ └─────────────┘               ││
│   │   │         +            +           +                               ││
│   │   │  ┌─────────────┐ ┌─────────────────────────────────┐           ││
│   │   │  │ Task 4:     │ │     DEPENDENCY GRAPH            │           ││
│   │   │  │ Search      │ │                                 │           ││
│   │   │  │ TVs (55",   │ │  T1 ──► T2 ──► T3 ──► T4       │           ││
│   │   │  │ 4K)         │ │    (parallel where possible)   │           ││
│   │   │  └─────────────┘ └─────────────────────────────────┘           ││
│   │   └──────────────────────────────────────────────────────────────────┘│
│   │                                      │                                │
│   │                    ┌─────────────────┼─────────────────┐              │
│   │                    ▼                 ▼                 ▼              │
│   │   ┌────────────────────────┐ ┌────────────────────────┐             ││
│   │   │   2. ACTION AGENTS     │ │  3. VALIDATION AGENT   │             ││
│   │   ├────────────────────────┤ ├────────────────────────┤             ││
│   │   │                        │ │                        │             ││
│   │   │  ┌─────────────────┐   │ │  ┌─────────────────┐  │             ││
│   │   │  │ Search Agent    │   │ │  │ Self-Validation │  │             ││
│   │   │  │ • eBay Browse   │───┼─┼──│ • Results check │  │             ││
│   │   │  │ • FireCrawl     │   │ │  │ • Data quality  │  │             ││
│   │   │  │ • Web Search    │   │ │  │ • Gap detection │  │             ││
│   │   │  └─────────────────┘   │ │  └─────────────────┘  │             ││
│   │   │                        │ │                        │             ││
│   │   │  ┌─────────────────┐   │ │  ┌─────────────────┐  │             ││
│   │   │  │ Price Agent     │   │ │  │ Loop Detection  │  │             ││
│   │   │  │ • Compare       │───┼─┼──│ • Step counting │  │             ││
│   │   │  │ • Track trends  │   │ │  │ • Timeout caps  │  │             ││
│   │   │  │ • Find deals    │   │ │  │ • Infinite loop │  │             ││
│   │   │  └─────────────────┘   │ │    prevention     │  │             ││
│   │   │                        │ │  └─────────────────┘  │             ││
│   │   │  ┌─────────────────┐   │ │                        │             ││
│   │   │  │ Sourcing Agent  │   │ │  ┌─────────────────┐  │             ││
│   │   │  │ • Multi-item    │───┼─┼──│ • Retry Logic   │  │             ││
│   │   │  │ • Batch search  │   │ │  │ • Re-plan if    │  │             ││
│   │   │  │ • Parallel exec │   │ │    failed        │  │             ││
│   │   │  └─────────────────┘   │ │  └─────────────────┘  │             ││
│   │   │                        │ │                        │             ││
│   │   │  ┌─────────────────┐   │ │                        │             ││
│   │   │  │ Recommendation  │   │ │                        │             ││
│   │   │  │   Agent         │   │ │                        │             ││
│   │   │  │ • Personalized  │   │ │                        │             ││
│   │   │  │ • User prefs    │   │ │                        │             ││
│   │   │  │ • History-based │   │ │                        │             ││
│   │   │  └─────────────────┘   │ │                        │             ││
│   │   └────────────────────────┘ └────────────────────────┘             ││
│   │                                      │                                │
│   │                                      ▼                                │
│   │   ┌──────────────────────────────────────────────────────────────────┐│
│   │   │                  4. ANSWER AGENT                                 ││
│   │   │   ┌────────────────────────────────────────────────────────────┐ ││
│   │   │   │ • Synthesizes results from all agents                     │ ││
│   │   │   │ • Organizes by category for carousel display              │ ││
│   │   │   │ • Generates human-readable response                       │ ││
│   │   │   │ • Includes price comparisons and recommendations          │ ││
│   │   │   │ • Cites sources (eBay listings, prices)                   │ ││
│   │   │   └────────────────────────────────────────────────────────────┘ ││
│   │   │                                      │                           ││
│   │   │                                      ▼                           ││
│   │   │   ┌──────────────────────────────────────────────────────────┐  ││
│   │   │   │              Structured Output                           │  ││
│   │   │   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │  ││
│   │   │   │  │ Laptops:    │ │ Jackets:    │ │ Shoes:      │        │  ││
│   │   │   │  │ 3 results   │ │ 5 results   │ │ 4 results   │        │  ││
│   │   │   │  │ $650-$799   │ │ $29-$52     │ │ $65-$120    │        │  ││
│   │   │   │  └─────────────┘ └─────────────┘ └─────────────┘        │  ││
│   │   │   │         +                                                   │  ││
│   │   │   │  ┌─────────────┐                                           │  ││
│   │   │   │  │ TVs:        │                                           │  ││
│   │   │   │  │ 2 results   │                                           │  ││
│   │   │   │  │ $599-$749   │                                           │  ││
│   │   │   │  └─────────────┘                                           │  ││
│   │   │   └──────────────────────────────────────────────────────────┘  ││
│   │   └──────────────────────────────────────────────────────────────────┘│
│   │                                                                             │
│   └─────────────────────────────────────────────────────────────────────────────┘
```

#### 3.2.2 Agent Responsibilities

**1. Planning Agent (Task Decomposition)**
- **Query Analysis**: Parses natural language into structured intent
  - Entity extraction (products, brands, prices, sizes, colors)
  - Intent classification (search, compare, track, source)
  - Complexity assessment (simple vs. multi-category)
- **Task Decomposition**: Breaks complex queries into research steps
  - Creates dependency graph for parallel execution
  - Estimates effort per task
  - Prioritizes tasks based on user intent
- **Multi-Category Routing**: For queries like "Find laptops, jackets, shoes, and TVs"
  - Identifies 4 separate categories
  - Creates independent search tasks for each
  - Enables parallel execution for speed

**2. Action Agents (Tool Execution)**
Action agents execute research steps using available tools:

| Agent | Tools/Capabilities | Output |
|-------|-------------------|--------|
| **Search Agent** | eBay Browse API, FireCrawl API, Category detection | Structured product data |
| **Price Agent** | Price comparison, Deal detection, Trend analysis | Price comparisons, recommendations |
| **Sourcing Agent** | Batch search, Parallel execution, Result aggregation | Multi-category results |
| **Recommendation Agent** | User profile access, History analysis, Preference learning | Personalized suggestions |

**3. Validation Agent (Self-Validation)**
- **Results Quality Check**: Verifies agent outputs meet requirements
  - Are results relevant to the query?
  - Are prices within specified ranges?
  - Are there enough results per category?
- **Gap Detection**: Identifies missing information
  - "No results for size 10 - try expanding size range?"
  - "Price range too narrow - suggest alternatives?"
- **Loop Detection**: Prevents infinite execution
  - Tracks steps per task (max 20 steps)
  - Detects repeated actions
  - Timeout enforcement (30 seconds per task)
- **Retry Logic**: Replans failed tasks automatically
  - 3 retry attempts per task
  - Exponential backoff between retries

**4. Answer Agent (Response Synthesis)**
- **Result Aggregation**: Combines outputs from all action agents
- **Category Organization**: Groups products by category for carousel display
- **Response Formatting**: Creates human-readable responses
  - Markdown support for rich formatting
  - Tables for price comparisons
  - Carousel components for product displays
- **Source Attribution**: Cites data sources (eBay listings, prices)
- **Recommendations**: Adds personalized suggestions based on user history

#### 3.2.3 Safety Features (Inspired by Dexter)

| Feature | Implementation | Limit |
|---------|----------------|-------|
| **Step Limits** | Max 20 steps per query | Prevents runaway execution |
| **Timeout Enforcement** | 30 seconds per agent task | 5 minutes per complex query |
| **Loop Detection** | Tracks repeated actions | 3 max repeats before abort |
| **Cost Controls** | Token limits per query | Max $0.10 per query (adjustable) |
| **Retry Limits** | 3 attempts per failed task | Exponential backoff |

#### 3.2.4 Execution Flow Example

```
Query: "Find laptops under $800 and red jackets under $50"

┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: PLANNING AGENT                                          │
├─────────────────────────────────────────────────────────────────┤
│ Analysis:                                                       │
│ - Products: laptops, jackets                                    │
│ - Constraints: price ranges, color (red)                        │
│ - Complexity: MEDIUM (2 categories)                             │
│                                                                 │
│ Task Plan:                                                      │
│ 1. Task: Search laptops (< $800)                                │
│ 2. Task: Search red jackets (< $50)                             │
│ 3. Task: Compare prices (both categories)                       │
│ 4. Task: Generate recommendations                               │
│                                                                 │
│ Execution Mode: PARALLEL (Tasks 1 & 2 can run simultaneously)   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: ACTION AGENTS (Parallel Execution)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Task 1 (Search Agent):                                          │
│ - Calls eBay Browse API with filter: price < $800              │
│ - Returns: 15 laptop listings                                   │
│ - Time: 2.3s                                                    │
│                                                                 │
│ Task 2 (Search Agent):                                          │
│ - Calls eBay Browse API with filters: price < $50, color: red  │
│ - Returns: 8 red jacket listings                                │
│ - Time: 1.8s                                                    │
│                                                                 │
│ Tasks 1 & 2 complete in parallel → Total time: 2.3s            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: VALIDATION AGENT                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Validation Checks:                                              │
│ ✓ Task 1 results: 15 laptops - VALID                           │
│ ✓ Task 2 results: 8 jackets - VALID                            │
│ ✓ Price ranges: All within constraints                         │
│ ✓ Data quality: Images, titles, prices present                 │
│                                                                 │
│ Loop Detection:                                                 │
│ - Steps taken: 4                                               │
│ - Max steps: 20                                                │
│ - Loop detected: NO                                             │
│                                                                 │
│ Result: VALID - Proceed to answer generation                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: ANSWER AGENT                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Synthesis:                                                      │
│ - Organized 2 categories with results                          │
│ - Price comparisons generated                                  │
│ - Recommendations based on user preferences                    │
│                                                                 │
│ Output:                                                         │
│ 💻 LAPTOPS (15 results, under $800)                            │
│   [Carousel: 3 featured laptops with prices]                   │
│                                                                 │
│ 🧥 JACKETS - RED (8 results, under $50)                        │
│   [Carousel: 3 featured red jackets with prices]               │
│                                                                 │
│ 💡 Recommendations based on your search history                 │
│   [Carousel: 2 personalized suggestions]                       │
│                                                                 │
│ Total Time: 3.1s (parallel execution achieved!)                │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.2.5 Comparison: Simple Chatbot vs. Dexter-Inspired Agents

| Aspect | Simple Chatbot | Dexter-Inspired Agents |
|--------|----------------|------------------------|
| **Query Processing** | Single-pass | Multi-stage (Plan → Act → Validate → Answer) |
| **Task Decomposition** | None | Automatic decomposition of complex queries |
| **Parallel Execution** | Sequential only | Parallel execution of independent tasks |
| **Self-Validation** | None | Results checked before presentation |
| **Loop Prevention** | None | Step limits, timeout enforcement |
| **Retry Logic** | None | Automatic retry with backoff |
| **Multi-Category Queries** | Linear search | Parallel category searches |
| **Response Quality** | Variable | Consistent with validation |
| **Cost Control** | None | Token limits, step limits |
| **Transparency** | Black box | Visible task planning, source attribution |

### 3.3 Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Data Flow Diagram                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  User ──► Next.js (Web) / Expo (Mobile) ──► Clerk Auth             │
│    │                                              │                 │
│    │                                              ▼                 │
│    │                              ┌─────────────────────────────┐   │
│    │                              │     Convex Database         │   │
│    │                              │  • User profiles            │   │
│    │                              │  • Saved items              │   │
│    │                              │  • Chat history             │   │
│    │                              │  • Sourcing requests        │   │
│    │                              │  • Order tracking           │   │
│    │                              └─────────────────────────────┘   │
│    │                                              │                 │
│    └──────────────────────────────────────────────┼─────────────────┘
│                                                  │                   │
│                    ┌─────────────────────────────┼───────────────┐   │
│                    │                             │               │   │
│                    ▼                             ▼               │   │
│           ┌───────────────┐             ┌─────────────────┐      │   │
│           │   AI Chat     │             │  Product Search │      │   │
│           │  Interface    │             │  (eBay API)     │      │   │
│           └───────┬───────┘             └────────┬────────┘      │   │
│                   │                             │                │   │
│                   ▼                             ▼                │   │
│           ┌───────────────┐             ┌─────────────────┐      │   │
│           │ OpenRouter    │             │  FireCrawl      │      │   │
│           │ (LLM Agents)  │             │  (Web Search)   │      │   │
│           └───────┬───────┘             └────────┬────────┘      │   │
│                   │                             │                │   │
│                   └──────────┬──────────────────┘                │
│                              │                                   │
│                              ▼                                   │
│                    ┌─────────────────────────┐                   │
│                    │    Inngest              │                   │
│                    │  • Long-running tasks   │                   │
│                    │  • Price notifications  │                   │
│                    │  • Background jobs      │                   │
│                    └─────────────────────────┘                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Core Features

### 4.1 User Authentication (Clerk)

**Access Levels**:

| Feature | Unauthenticated | Authenticated (Free) | Authenticated (Premium) |
|---------|-----------------|----------------------|------------------------|
| Browse Landing Page | ✅ | ✅ | ✅ |
| Search Products | ❌ | ✅ | ✅ |
| AI Chat | ❌ | ✅ (50/day) | ✅ (Unlimited) |
| Save Items | ❌ | ✅ | ✅ |
| Background Sourcing | ❌ | ✅ | ✅ Priority |
| Price Tracking | ❌ | ❌ | ✅ |
| Image Try-On | ❌ | ❌ | ✅ |

**Rate Limits**:

| Tier | Search Requests | AI Queries | Background Jobs |
|------|-----------------|------------|-----------------|
| Unauthenticated | 10/hour | 5/day | 0 |
| Free | 100/hour | 50/day | 5/day |
| Premium | Unlimited | Unlimited | Unlimited |

### 4.1.1 Placeholder Pricing Tiers

**Note**: These are placeholder values for planning purposes. Actual pricing should be validated with market research.

| Feature | Free | Pro | Premium |
|---------|------|-----|---------|
| **Monthly Price** | $0 | $9.99 | $29.99 |
| **Yearly Price** | $0 | $99.99/year ($8.33/mo) | $299.99/year ($24.99/mo) |
| **AI Queries** | 50/day | Unlimited | Unlimited |
| **Search Requests** | 100/hour | 500/hour | Unlimited |
| **Background Jobs** | 5/day | 50/day | Unlimited |
| **Price Alerts** | ❌ | ✅ | ✅ |
| **Priority Sourcing** | ❌ | Standard | Priority |
| **Image Try-On** | ❌ | ❌ | ✅ |
| **API Access** | ❌ | ❌ | ✅ |
| **Early Access Features** | ❌ | ❌ | ✅ |

#### Revenue Projection (Placeholder)

| Month | Target Users | Conversion Rate | Avg Revenue/User | Monthly Revenue |
|-------|--------------|-----------------|------------------|-----------------|
| Month 3 | 10,000 | 2% | $0.50 | $5,000 |
| Month 6 | 100,000 | 3% | $0.75 | $22,500 |
| Month 12 | 1,000,000 | 5% | $1.00 | $50,000 |

### 4.1.2 Internationalization (i18n) Strategy

#### Supported Languages

| Language | Region | Population Served | Priority |
|----------|--------|-------------------|----------|
| **English** | Caribbean, Global | 45M+ | P0 |
| **Spanish** | Cuba, Dominican Republic, Puerto Rico, Venezuela, Colombia | 35M+ | P0 |
| **French** | Haiti, Martinique, Guadeloupe, French Guiana | 12M+ | P1 |

#### Implementation Architecture

```typescript
// next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr"],
    localeDetection: true,
  },
};
```

#### Translation Structure

```
/messages
  /en.json
  {
    "common": {
      "searchPlaceholder": "Search products...",
      "signIn": "Sign In",
      "signUp": "Sign Up",
      "loading": "Loading...",
      "error": "An error occurred",
      "retry": "Try Again"
    },
    "nav": {
      "home": "Home",
      "search": "Search",
      "chat": "AI Chat",
      "saved": "Saved Items",
      "profile": "Profile"
    },
    "chat": {
      "title": "AI Shopping Assistant",
      "placeholder": "Ask me to find products...",
      "loading": "Searching...",
      "noResults": "No products found"
    }
  }
  /es.json
  /fr.json
```

#### Search NLP Support

AI assistant must understand queries in all supported languages:

| Language | Example Query | English Translation |
|----------|---------------|---------------------|
| **English** | "Find red jackets under $50" | - |
| **Spanish** | "Encuentra chaquetas rojas por menos de $50" | Find red jackets under $50 |
| **French** | "Trouver des vestes rouges à moins de 50$" | Find red jackets under $50 |

**Implementation**: OpenRouter models with multilingual support (GPT-4, Claude), language detection middleware, query normalization before agent processing.

### 4.2 AI Shopping Assistant

**Interface**: Vercel AI SDK chat interface with markdown support

**Capabilities**:
- **Natural Language Search**: "Find red jackets under $50, size M"
- **Multi-Category Queries**: "Find laptops, TVs, and shoes in one request"
- **Price Comparison**: Compare prices across listings
- **Complex Sourcing**: "Find vintage leather items from the 1980s"
- **Personalized Recommendations**: Based on user history
- **Image Try-On**: Users upload photos to visualize products

**Example Multi-Category Query**:
```
User: "Find laptops under $800, red jackets under $50, 
        size 10 running shoes, and 55-inch 4K TVs"

Assistant:
┌─────────────────────────────────────────────────────────────┐
│  💻 LAPTOPS (3 results)                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐                                 │
│  │ 🖥️  │ │ 💻  │ │ Mac  │  ← Horizontal Carousel             │
│  │ $799│ │ $650│ │ $999│                                    │
│  └──────┘ └──────┘ └──────┘                                 │
├─────────────────────────────────────────────────────────────┤
│  🧥 JACKETS - RED (5 results)                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ 🔴  │ │ 🔴  │ │ 🔴  │ │ 🔴  │ │ 🔴  │  ← Horizontal Carousel │
│  │ $45 │ │ $38 │ │ $52 │ │ $29 │ │ $41 │                     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘               │
├─────────────────────────────────────────────────────────────┤
│  👟 SHOES - SIZE 10 (4 results)                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                        │
│  │ 👟  │ │ 👟  │ │ 👟  │ │ 👟  │  ← Horizontal Carousel       │
│  │ $89 │ │ $120│ │ $65 │ │ $95 │                             │
│  └──────┘ └──────┘ └──────┘ └──────┘                        │
├─────────────────────────────────────────────────────────────┤
│  📺 4K TVs - 55" (2 results)                                 │
│  ┌──────┐ ┌──────┐                                           │
│  │ 📺  │ │ 📺  │  ← Horizontal Carousel                       │
│  │ $599│ │ $749│                                             │
│  └──────┘ └──────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Product Search & Discovery

**Primary Search**: eBay Browse API
- Full-text search
- Filtering by price, category, condition, brand
- Sorting by price, relevance, ending time

**Enhancement**: FireCrawl API
- Web search for product comparisons
- Review aggregation
- Price tracking across sites

**Caching Strategy**:
- Product listings: Cached per eBay documentation (1-24 hours)
- Search results: Vercel Edge cache (5-15 minutes)
- User-specific data: Real-time from Convex

### 4.4 Background Jobs (Inngest)

**Long-Running Sourcing Tasks**:
- Users submit complex multi-category queries
- System processes in background (Inngest)
- Users can close app and return later
- Push notification when complete
- Results stored in Convex for retrieval

**Price Drop Notifications**:
- Users subscribe to price alerts
- System monitors prices (Inngest scheduled functions)
- Push notification on significant drops
- Link directly to product with affiliate tracking

**Task Timeout Strategy**:
- Simple queries: 30 seconds
- Medium complexity: 2 minutes
- Complex sourcing: 5-30 minutes (configurable)
- Per-step timeouts with retry logic

### 4.5 Monetization

**Affiliate Revenue**: eBay Partner Network
- Automatic affiliate parameter injection
- Commission on eligible purchases
- Dashboard for earnings tracking

**Affiliate URL Structure**:
```
https://www.ebay.com/itm/{itemId}?
  mkevt=1&              // Event type: Click
  mkcid=1&              // Channel: EPN
  mkrid={rotationId}&   // Rotation ID
  campid={campaignId}&  // Campaign ID
  toolid={toolId}&      // Tool ID
  customid={userId}     // Custom tracking
```

**Premium Subscription (Future)**:
- Higher AI query limits
- Advanced price tracking
- Priority sourcing
- Image try-on feature
- Early access to new features

---

## 5. Database Schema (Convex)

### 5.1 Schema Overview

```typescript
// packages/shared/src/convex-functions/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User management
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    subscriptionTier: v.union(v.literal("free"), v.literal("premium")),
    preferences: v.object({
      preferredBrands: v.array(v.string()),
      sizeRanges: v.array(v.string()),
      priceMin: v.number(),
      priceMax: v.number(),
    }),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  }).index("by_clerk", ["clerkId"]),

  // Saved items / wishlist
  savedItems: defineTable({
    userId: v.id("users"),
    productId: v.string(), // eBay item ID
    productData: v.object({
      title: v.string(),
      imageUrl: v.string(),
      price: v.number(),
      currency: v.string(),
      condition: v.optional(v.string()),
      seller: v.optional(v.object({
        name: v.string(),
        rating: v.number(),
      })),
    }),
    affiliateUrl: v.string(),
    priceAtSave: v.number(),
    addedAt: v.number(),
    priceAlertEnabled: v.boolean(),
  }).index("by_user", ["userId"]),

  // Chat sessions and messages
  chatSessions: defineTable({
    userId: v.id("users"),
    title: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  chatMessages: defineTable({
    sessionId: v.id("chatSessions"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    agentType: v.optional(v.union(
      v.literal("supervisor"),
      v.literal("search"),
      v.literal("price"),
      v.literal("sourcing"),
      v.literal("recommendation")
    )),
    tokensUsed: v.optional(v.number()),
    timestamp: v.number(),
    // Structured result for AI responses
    results: v.optional(v.array(v.object({
      category: v.string(),
      products: v.array(v.any()),
      totalCount: v.number(),
    }))),
  }).index("by_session", ["sessionId"]),

  // Sourcing requests (Inngest background jobs)
  sourcingRequests: defineTable({
    userId: v.id("users"),
    sessionId: v.optional(v.id("chatSessions")),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    originalRequest: v.string(),
    parsedQuery: v.optional(v.object({
      categories: v.array(v.object({
        name: v.string(),
        filters: v.optional(v.any()),
      })),
    })),
    results: v.optional(v.array(v.object({
      category: v.string(),
      products: v.array(v.any()),
      totalCount: v.number(),
    }))),
    progress: v.optional(v.number()), // 0-100
    createdAt: v.number(),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    error: v.optional(v.string()),
    inngestRunId: v.optional(v.string()),
  }).index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"]),

  // Product cache (from eBay API)
  products: defineTable({
    externalId: v.string(), // eBay item ID
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    images: v.optional(v.array(v.string())),
    price: v.number(),
    currency: v.string(),
    condition: v.optional(v.string()),
    category: v.optional(v.string()),
    brand: v.optional(v.string()),
    seller: v.optional(v.object({
      id: v.string(),
      name: v.string(),
      rating: v.number(),
    })),
    affiliateUrl: v.string(),
    itemUrl: v.string(),
    status: v.union(v.literal("active"), v.literal("sold"), v.literal("ended")),
    cachedAt: v.number(),
    expiresAt: v.number(),
  }).index("by_external_id", ["externalId"])
    .index("by_category", ["category"])
    .index("by_status", ["status"]),

  // Order tracking (affiliate)
  affiliateClicks: defineTable({
    userId: v.optional(v.id("users")),
    productId: v.string(),
    affiliateUrl: v.string(),
    source: v.union(v.literal("search"), v.literal("chat"), v.literal("saved")),
    clickedAt: v.number(),
    sessionId: v.optional(v.string()),
    metadata: v.optional(v.object({
      query: v.optional(v.string()),
      category: v.optional(v.string()),
    })),
  }).index("by_user", ["userId"])
    .index("by_product", ["productId"])
    .index("by_clicked_at", ["clickedAt"]),

  affiliateConversions: defineTable({
    clickId: v.id("affiliateClicks"),
    userId: v.optional(v.id("users")),
    productId: v.string(),
    saleAmount: v.number(),
    commissionAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    clickTimestamp: v.number(),
    saleTimestamp: v.number(),
    commissionTimestamp: v.optional(v.number()),
    ebayOrderId: v.optional(v.string()),
  }).index("by_click_id", ["clickId"])
    .index("by_status", ["status"])
    .index("by_user", ["userId"]),

  // Price history for alerts
  priceHistory: defineTable({
    productId: v.string(),
    price: v.number(),
    timestamp: v.number(),
  }).index("by_product", ["productId"])
    .index("by_product_timestamp", ["productId", "timestamp"]),

  // Analytics events (for Amplitude/PostHog)
  analyticsEvents: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.optional(v.string()),
    eventType: v.string(),
    properties: v.optional(v.any()),
    timestamp: v.number(),
    platform: v.union(v.literal("web"), v.literal("mobile")),
  }).index("by_user", ["userId"])
    .index("by_event_type", ["eventType"])
    .index("by_timestamp", ["timestamp"]),
});
```

### 5.2 TypeScript Type Definitions

```typescript
// packages/shared/src/types/product.ts

export interface Product {
  id: string;
  externalId: string;
  title: string;
  description?: string;
  imageUrl: string;
  images?: string[];
  price: number;
  currency: string;
  condition?: string;
  category?: string;
  brand?: string;
  seller?: {
    id: string;
    name: string;
    rating: number;
  };
  affiliateUrl: string;
  itemUrl: string;
  status: "active" | "sold" | "ended";
}

export interface ProductSearchFilters {
  query?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  condition?: string;
  brand?: string;
  size?: string;
  color?: string;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "ending_soon";
}

export interface SearchResult {
  category: string;
  products: Product[];
  totalCount: number;
  page: number;
  hasMore: boolean;
}

// packages/shared/src/types/user.ts

export interface UserPreferences {
  preferredBrands: string[];
  sizeRanges: string[];
  priceMin: number;
  priceMax: number;
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  subscriptionTier: "free" | "premium";
  preferences: UserPreferences;
  createdAt: number;
  lastActiveAt: number;
}

// packages/shared/src/types/agent.ts

export type AgentType = 
  | "supervisor"
  | "search"
  | "price"
  | "sourcing"
  | "recommendation";

export interface AgentMessage {
  role: "user" | "assistant" | "system";
  content: string;
  agentType?: AgentType;
  timestamp: number;
  tokensUsed?: number;
  results?: SearchResult[];
}

export interface SourcingRequest {
  userId: string;
  sessionId?: string;
  status: "pending" | "processing" | "completed" | "failed";
  originalRequest: string;
  parsedQuery?: {
    categories: Array<{
      name: string;
      filters?: ProductSearchFilters;
    }>;
  };
  results?: SearchResult[];
  progress?: number;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  error?: string;
}
```

---

## 6. Security Requirements

### 6.1 API Key Management

| Key | Storage | Access | Rotation |
|-----|---------|--------|----------|
| **eBay API Tokens** | Vercel Environment Variables + Convex Server-Side | Server-side only | Manual when needed |
| **OpenRouter Keys** | Vercel Environment Variables | Server-side only | Manual |
| **FireCrawl Keys** | Vercel Environment Variables | Server-side only | Manual |
| **Clerk Keys** | Vercel Environment Variables | Public + Server |

**Key Storage Pattern**:
```typescript
// packages/shared/src/api-clients/ebay/client.ts
const EBAY_API_KEY = process.env.EBAY_API_KEY;
const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID;
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;

// Never expose these to the client
if (!EBAY_API_KEY) {
  throw new Error("EBAY_API_KEY is not configured");
}
```

### 6.2 Authentication & Authorization

**Clerk Middleware Protection**:
```typescript
// apps/web/src/middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook(.*)"],
  ignoredRoutes: ["/api/health"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

**Route Protection**:
- Landing page: Public
- Search, Chat, Profile: Authenticated only
- API routes: Validate Clerk session token

### 6.3 Data Privacy

**Analytics Anonymization**:
- User IDs hashed before sending to Amplitude/PostHog
- No PII in analytics events
- Session IDs used for behavior tracking instead of user IDs

**Data Retention**:
- User data: Retained until account deletion
- Chat history: Retained for 2 years
- Analytics data: Aggregated, raw data deleted after 90 days
- Affiliate data: Retained per eBay requirements

**User Rights**:
- Delete account functionality (removes all Convex data)
- Export data functionality
- View preferences

### 6.4 Rate Limiting

**Implementation**:
```typescript
// packages/shared/src/utilities/rate-limiter.ts
import { ConvexError, v } from "convex/server";

const RATE_LIMITS = {
  unauthenticated: {
    searchesPerHour: 10,
    aiQueriesPerDay: 5,
  },
  free: {
    searchesPerHour: 100,
    aiQueriesPerDay: 50,
    backgroundJobsPerDay: 5,
  },
  premium: {
    searchesPerHour: -1, // Unlimited
    aiQueriesPerDay: -1,
    backgroundJobsPerDay: -1,
  },
};

export async function checkRateLimit(
  ctx: any,
  userId: string | null,
  tier: "unauthenticated" | "free" | "premium",
  action: "search" | "aiQuery" | "backgroundJob"
) {
  const limit = RATE_LIMITS[tier][`${action}sPer${action === "aiQuery" ? "Day" : "Hour"}`];
  
  if (limit === -1) return; // Unlimited
  
  const windowMs = action === "aiQuery" ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
  const windowStart = Date.now() - windowMs;
  
  const recentActions = await ctx.db
    .query("rateLimitLogs")
    .withIndex("by_user_action", (q) =>
      q.eq("userId", userId ?? "anonymous").eq("action", action)
    )
    .filter((q) => q.gt(q.field("timestamp"), windowStart))
    .collect();
  
  if (recentActions.length >= limit) {
    throw new ConvexError({
      code: 429,
      message: `Rate limit exceeded for ${action}. Please upgrade to premium.`,
    });
  }
  
  await ctx.db.insert("rateLimitLogs", {
    userId: userId ?? "anonymous",
    action,
    timestamp: Date.now(),
  });
}
```

### 6.5 Secure Communication

- HTTPS enforced on all connections
- CSP headers configured
- CORS configured for API endpoints
- No sensitive data in logs
- Environment variables validated at startup

---

## 7. UI/UX Specifications

### 7.1 Mobile-First Design Principles

**Target Devices**:
- Primary: iPhone 17, Samsung S25 (modern smartphones)
- Secondary: Tablets (iPad, Android tablets)
- Desktop: Responsive design for larger screens

**Core Principles**:
1. Touch-first interactions
2. Thumb-zone navigation
3. Fast loading (under 2 seconds)
4. Minimal cognitive load
5. Progressive disclosure

### 7.2 Horizontal Carousel UI Pattern

**Key Design Decision**: Use horizontal scrolling carousels instead of vertical grids for content organization:

```
┌──────────────────────────────────────────────────────────────┐
│  🛒 Sendcat                                                  │
├──────────────────────────────────────────────────────────────┤
│  🔍 Search products...                                        │
├──────────────────────────────────────────────────────────────┤
│  👗 WOMEN'S FASHION • Trending Now                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │     │
│  │ 👗  │ │ 👜  │ │ 👠  │ │ 🧥  │ │ 💄  │ │ 🕶️  │     │
│  │$24.99│ │$45.00│ │$32.00│ │$58.00│ │$18.50│ │$29.99│     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
│         ◄─────── Horizontal Scroll ───────►                  │
├──────────────────────────────────────────────────────────────┤
│  💻 ELECTRONICS • Top Deals                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │     │
│  │ 📱  │ │ 🎧  │ │ 💻  │ │ ⌚  │ │ 🎮  │ │ 📷  │     │
│  │$299 │ │$89  │ │$799 │ │$199 │ │$299 │ │$459 │     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
│         ◄─────── Horizontal Scroll ───────►                  │
├──────────────────────────────────────────────────────────────┤
│  🏠 HOME & LIVING • New Arrivals                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │                    │
│  │ 🛋️  │ │ 🪴  │ │ 💡  │ │ 🖼️  │ │ 🛏️  │                    │
│  │$399 │ │$25  │ │$35  │ │$89  │ │$199 │                    │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘               │
│         ◄─────── Horizontal Scroll ───────►                  │
├──────────────────────────────────────────────────────────────┤
│  ⚡ AI Recommendations • Picks for You                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │ │ 📸  │                    │
│  │ 🧡  │ │ 🧡  │ │ 🧡  │ │ 🧡  │ │ 🧡  │                    │
│  │Based │ │Based │ │Based │ │Based │ │Based │                    │
│  │ on   │ │ on   │ │ on   │ │ on   │ │ on   │                    │
│  │your  │ │your  │ │your  │ │your  │ │your  │                    │
│  │search│ │saved │ │brows-│ │pref- │ │pref- │                    │
│  │history│ │items │ │ing   │ │erences│ │erences│                    │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘               │
│         ◄─────── Horizontal Scroll ───────►                  │
└──────────────────────────────────────────────────────────────┘
```

### 7.3 Bucket Types

| Bucket Type | Content | Interaction | Purpose |
|-------------|---------|-------------|---------|
| **Category Buckets** | "Women", "Electronics", "Home" | Horizontal carousel of products | Browsing discovery |
| **Trending Now** | Top 10 items in category | Auto-scroll or drag | FOMO-driven discovery |
| **AI Recommendations** | Personalized picks | Horizontal scroll | Personalization |
| **Recently Viewed** | User's browsing history | Horizontal scroll | Return visitors |
| **Saved Items** | Wishlist items | Horizontal grid (scrollable) | Purchase intent |
| **Related Products** | "You may also like" | Horizontal carousel | Cross-selling |
| **Deals & Discounts** | Price-reduced items | Badge overlay | Conversion |
| **AI Multi-Category Results** | Products organized by category | Multiple carousels | Search results |

### 7.4 Key Screens

| Screen | Features | Navigation |
|--------|----------|------------|
| **Landing Page** | Featured products, categories, value prop, sign-up CTA | Public |
| **Home/Storefront** | Curated buckets, trending items, AI recommendations | Bottom tab |
| **Search Results** | Search bar, filters, horizontal carousels by category | Bottom tab |
| **Product Detail** | Images carousel, price, seller info, affiliate link, save button | Modal/Page |
| **AI Chat Interface** | Conversational UI, markdown support, image upload, results carousels | Bottom tab |
| **Saved Items/Wishlist** | Grid of saved products, price tracking, swipe actions | Bottom tab |
| **User Profile** | Order history, preferences, subscription, settings | Bottom tab |
| **Onboarding** | Sign up/sign in flow (Clerk) | Modal |

### 7.5 Mobile Interaction Patterns

| Interaction | Behavior |
|-------------|----------|
| **Swipe Gestures** | Horizontal swipe to navigate carousels |
| **Snap Scrolling** | Cards snap into view on release |
| **Pull-to-Refresh** | Refresh bucket content on pull |
| **Infinite Scroll** | Load more items as user scrolls horizontally |
| **Long Press** | Quick save to wishlist |
| **Swipe Left/Right** | Quick actions on saved items |
| **Pinch Zoom** | Product image zoom |
| **Bottom Navigation** | Fixed tabs (Home, Search, AI Chat, Saved, Profile) |

### 7.6 Desktop Adaptations

| Feature | Mobile | Desktop |
|---------|--------|---------|
| **Navigation** | Bottom tab bar | Top header + sidebar |
| **Carousel Navigation** | Swipe | Mouse drag + arrow keys + chevron buttons |
| **Carousel Items** | 2-3 visible | 4-5 visible |
| **Chat Interface** | Full-screen modal | Side panel or dedicated page |
| **Keyboard Shortcuts** | N/A | Arrow keys for carousels |
| **Hover Effects** | N/A | Show quick actions on hover |

### 7.7 PWA Features

- **Offline Browsing**: Cache recent searches and saved items
- **Background Sync**: Queue actions when offline
- **Push Notifications**: Price drops, AI task completion
- **Install Prompt**: Prompt to install on home screen
- **App Icon**: Custom Sendcat icon
- **Splash Screen**: Branded loading screen

### 7.8 Accessibility Requirements

Sendcat is committed to WCAG 2.1 Level AA compliance.

#### Color Contrast

| Element | Requirement | Implementation |
|---------|-------------|----------------|
| **Text** | 4.5:1 ratio | Primary text #1F2937 on white |
| **Large Text** | 3:1 ratio | Headings >18px |
| **Interactive** | 3:1 ratio | Buttons, links, form controls |
| **Focus Indicators** | 2:1 ratio | Visible focus ring (2px solid #3B82F6) |

#### Keyboard Navigation

```typescript
function Carousel() {
  const [focusIndex, setFocusIndex] = useState(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        setFocusIndex((prev) => Math.min(prev + 1, itemsRef.current.length - 1));
        itemsRef.current[focusIndex + 1]?.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        setFocusIndex((prev) => Math.max(prev - 1, 0));
        itemsRef.current[focusIndex - 1]?.focus();
        break;
      case "Home":
        e.preventDefault();
        setFocusIndex(0);
        itemsRef.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        setFocusIndex(itemsRef.current.length - 1);
        itemsRef.current[itemsRef.current.length - 1]?.focus();
        break;
    }
  };

  return (
    <div role="region" aria-label="Product carousel" onKeyDown={handleKeyDown}>
      <ul>
        {products.map((product, index) => (
          <li key={product.id}>
            <button
              ref={(el) => (itemsRef.current[index] = el)}
              aria-label={`${product.title}, ${formatPrice(product.price)}`}
            >
              <img src={product.imageUrl} alt="" />
              <span>{product.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Screen Reader Support

```typescript
function ProductCard({ product }: { product: Product }) {
  return (
    <article
      role="listitem"
      aria-labelledby={`product-title-${product.id}`}
      tabIndex={0}
    >
      <img
        src={product.imageUrl}
        alt={`${product.title} - ${formatPrice(product.price)}`}
      />
      <h3 id={`product-title-${product.id}`}>{product.title}</h3>
      <p aria-label="Price">{formatPrice(product.price)}</p>
      <button
        aria-label={`Save ${product.title} to wishlist`}
        aria-pressed={product.isSaved}
      >
        {product.isSaved ? "❤️" : "🤍"}
      </button>
    </article>
  );
}

function ChatInterface() {
  return (
    <div
      role="log"
      aria-live="polite"
      aria-atomic="false"
      aria-label="Chat messages"
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
```

#### Testing Requirements

| Test Type | Tool | Coverage Target |
|-----------|------|-----------------|
| **Automated a11y tests** | axe-core | 90% of components |
| **Keyboard testing** | Manual | 100% of interactive elements |
| **Screen reader testing** | VoiceOver, NVDA | Core user journeys |
| **Color contrast** | axe-core, manual | 100% compliance |

### 7.9 Error Handling Strategy

#### Error Types & User Messages

| Error Type | User Message |
|------------|--------------|
| **No Results** | "We couldn't find any products matching your search. Try adjusting your filters." |
| **Rate Limited** | "You've reached your search limit. Upgrade to Pro for unlimited searches." |
| **API Error** | "We're having trouble connecting to our search service. Please try again." |
| **Network Error** | "It looks like you're offline. Check your connection and try again." |
| **Authentication Required** | "Sign in to continue searching and save your favorite products." |

#### Error State Components

```typescript
function NoResultsState({ query }: { query: string }) {
  return (
    <div role="status" className="no-results">
      <h3>No products found</h3>
      <p>We couldn't find any products matching "{query}"</p>
      <div className="suggestions">
        <p>Suggestions:</p>
        <ul>
          <li>Try broader search terms</li>
          <li>Remove some filters</li>
          <li>Check your spelling</li>
        </ul>
      </div>
      <button onClick={() => window.history.back()}>Back to Search</button>
    </div>
  );
}

function RateLimitState({ upgradeUrl }: { upgradeUrl: string }) {
  return (
    <div role="alert" className="rate-limit">
      <h3>Search Limit Reached</h3>
      <p>You've used your free search limit for this hour.</p>
      <a href={upgradeUrl} className="upgrade-button">
        Upgrade to Pro
      </a>
      <p className="timer">Resets in 23 minutes</p>
    </div>
  );
}
```

#### Auto-Retry with Exponential Backoff

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; baseDelay?: number; maxDelay?: number } = {}
): Promise<T> {
  const { maxAttempts = 3, baseDelay = 1000, maxDelay = 10000 } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries exceeded");
}
```

### 7.10 SEO Strategy

#### Brand Identity

| Element | Value |
|---------|-------|
| **Brand Name** | Sendcat (no space) |
| **Primary Colors** | Blue (#3B82F6), Orange (#F97316), White (#FFFFFF) |
| **Brand Voice** | Friendly, helpful, intelligent |

#### Meta Tags

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://sendcat.com"),
  title: {
    default: "Sendcat - AI-Powered E-Commerce Shopping",
    template: "%s | Sendcat",
  },
  description:
    "Discover products from eBay with AI-powered search. Find the best deals on electronics, clothing, home goods, and more. Your intelligent shopping assistant.",
  keywords: [
    "eBay",
    "shopping",
    "AI search",
    "price comparison",
    "deals",
    "electronics",
    "clothing",
    "AI shopping assistant",
  ],
  authors: [{ name: "Sendcat" }],
  creator: "Sendcat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sendcat.com",
    siteName: "Sendcat",
    title: "Sendcat - AI-Powered E-Commerce Shopping",
    description:
      "Discover products from eBay with AI-powered search",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sendcat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sendcat - AI-Powered E-Commerce Shopping",
    description: "Discover products from eBay with AI-powered search",
    images: ["/og-image.png"],
    site: "@sendcat",
  },
  themeColor: "#3B82F6",
};
```

#### Product Schema Markup

```typescript
function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      url: product.affiliateUrl,
      priceCurrency: product.currency,
      price: product.price,
      availability: product.stockStatus,
      seller: { "@type": "Organization", name: product.seller?.name || "eBay Seller" },
    },
    aggregateRating: product.seller?.rating !== undefined ? {
      "@type": "AggregateRating",
      ratingValue: product.seller.rating,
      reviewCount: product.seller?.reviewCount || 0,
    } : undefined,
  };
}
```

#### Sitemap Generation

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sendcat.com";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/chat`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/saved`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];
}
```

### 7.10 Carousel Component Specifications

Sendcat's carousel components follow eBay's official design system specifications for consistency and accessibility.

#### 7.10.1 Carousel Anatomy

```
┌─────────────────────────────────────────────────────────┐
│  Category Title                            [See all >]  │
├─────────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ 🖼️  │ │ 🖼️  │ │ 🖼️  │ │ 🖼️  │ │ 🖼️  │ ◄─ Scroll  │
│  │ $24  │ │ $45  │ │ $32  │ │ $58  │ │ $18  │          │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
│      [<]                                        [>]    │
└─────────────────────────────────────────────────────────┘
```

**Components:**
1. **Title**: Short, descriptive section title
2. **Content**: Horizontally scrollable product tiles
3. **Link Button**: "See all" link to full category page
4. **Pagination Controls**: Previous/Next arrows

#### 7.10.2 Responsive Tile Counts

| Screen Size | Breakpoint | Tiles Visible | Control Behavior |
|-------------|------------|---------------|------------------|
| **Small** | 375-511px | 1.5 - 2.5 | Swipe only, no visible controls |
| **Medium** | 512-1024px | 2.5 - 4.5 | Controls appear on hover |
| **Large** | 1280-1440px | 4.5 | Controls appear on hover |
| **X-Large** | 1680px+ | 5 | Controls always visible |

#### 7.10.3 Spacing Specifications

| Element | Small Screens | Medium+ Screens |
|---------|---------------|-----------------|
| Title → Content | 16px | 24px |
| Tile → Tile | 8px | 16px |
| Image → Price | 12px | 12px |
| Pagination Controls | N/A | 32px tall, vertically centered |

#### 7.10.4 Accessibility Requirements

**Keyboard Navigation:**
```typescript
// Arrow keys for horizontal navigation
// Home = first item
// End = last item
// Tab = move through interactive elements
```

**Swipe Gestures:**
- Left/Right swipe to scroll through tiles
- Single pointer gesture (WCAG 2.5.1 compliant)

**Screen Reader Support:**
```typescript
<carousel
  role="region"
  aria-label="Product carousel: Category Name"
  aria-roledescription="carousel"
  aria-live="polite"
>
  <button aria-label="Previous item" aria-controls="carousel-items">
    ←
  </button>
  <ul id="carousel-items">
    <li>
      <button aria-label="Product Name, $Price">
        <img alt="Product image" />
      </button>
    </li>
  </ul>
  <button aria-label="Next item" aria-controls="carousel-items">
    →
  </button>
</carousel>
```

**Focus Indicators:**
- Visible focus ring (#3B82F6 - Sendcat Blue)
- 2px solid border on focus
- Only visible items in tab sequence

#### 7.10.5 Product Tile Specifications

**Image Size:**
- Mobile: 200x200px
- Desktop: 240x320px

**Tile Structure:**
```typescript
interface ProductTile {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number; // percentage
  isSaved?: boolean;
  currency: string;
}
```

**Discount Badge Overlay:**
- Position: Top-right corner
- Color: Orange (#F97316)
- Format: "-XX%"

#### 7.10.6 Scroll Behavior

**Momentum Scrolling:**
- Smooth, physics-based scrolling
- Snap to nearest tile on release
- Inertia continues scrolling

**Touch Devices:**
- Direct manipulation swipe
- Bounce at boundaries
- No scrollbar visible

**Desktop:**
- Mouse wheel scrolls horizontally
- Drag to scroll
- Scrollbar visible on hover

### 7.10.7 Typography

Sendcat uses **Inter + Inter Tight** for all typography with **fluid scaling** that adjusts automatically across screen sizes. This approach was selected for:

- Modern, professional e-commerce appearance
- Excellent readability for prices and product information
- Mobile-friendly character shapes
- Variable font support (smaller file size, faster loading)
- Free and open source (Google Fonts)
- WCAG 2.1 AA compliance

#### Fluid Typography with clamp()

Typography uses CSS `clamp()` for smooth scaling between minimum and maximum sizes without breakpoints:

```css
/* Example: H1 scales from 28px (mobile) to 48px (desktop) */
font-size: clamp(1.75rem, 3vw + 1.25rem, 3rem);
```

#### Fluid Typography Scale

| Element | Min (375px) | Max (1440px) | Clamp Formula |
|---------|-------------|--------------|---------------|
| **H1 - Hero Title** | 28px | 48px | `clamp(1.75rem, 3vw + 1.25rem, 3rem)` |
| **H2 - Section Title** | 22px | 36px | `clamp(1.375rem, 2.5vw + 1rem, 2.25rem)` |
| **H3 - Card Title** | 18px | 24px | `clamp(1.125rem, 1vw + 1rem, 1.5rem)` |
| **Body - Primary** | 14px | 16px | `clamp(0.875rem, 0.5vw + 0.75rem, 1rem)` |
| **Body - Secondary** | 12px | 14px | `clamp(0.75rem, 0.5vw + 0.625rem, 0.875rem)` |
| **Price** | 16px | 20px | `clamp(1rem, 0.75vw + 0.75rem, 1.25rem)` |
| **Navigation** | 12px | 14px | `clamp(0.75rem, 0.5vw + 0.625rem, 0.875rem)` |
| **Caption** | 10px | 12px | `clamp(0.625rem, 0.5vw + 0.5rem, 0.75rem)` |

#### Fluid Line Height

Line height decreases as font size increases for optimal readability:

| Element | Min LH | Max LH | Clamp Formula |
|---------|--------|--------|---------------|
| **H1 - Hero** | 1.2 | 1.3 | `clamp(1.2, -0.2vw + 1.3, 1.3)` |
| **H2 - Section** | 1.3 | 1.4 | `clamp(1.3, -0.2vw + 1.4, 1.4)` |
| **H3 - Card Title** | 1.35 | 1.45 | `clamp(1.35, -0.2vw + 1.5, 1.45)` |
| **Body - Primary** | 1.5 | 1.6 | `clamp(1.5, -0.2vw + 1.65, 1.6)` |
| **Price** | 1.4 | 1.5 | `clamp(1.4, -0.2vw + 1.55, 1.5)` |

#### Tailwind CSS Implementation

```css
/* In globals.css @theme block */
@theme inline {
  --font-sans: var(--font-inter);
  --font-tight: var(--font-inter-tight);

  /* Fluid font sizes */
  --text-fluid-h1: clamp(1.75rem, 3vw + 1.25rem, 3rem);
  --text-fluid-h2: clamp(1.375rem, 2.5vw + 1rem, 2.25rem);
  --text-fluid-h3: clamp(1.125rem, 1vw + 1rem, 1.5rem);
  --text-fluid-body: clamp(0.875rem, 0.5vw + 0.75rem, 1rem);
  --text-fluid-price: clamp(1rem, 0.75vw + 0.75rem, 1.25rem);

  /* Fluid line heights */
  --leading-fluid-tight: clamp(1.2, -0.2vw + 1.3, 1.3);
  --leading-fluid-normal: clamp(1.4, -0.2vw + 1.5, 1.5);
  --leading-fluid-relaxed: clamp(1.5, -0.2vw + 1.65, 1.6);
}
```

#### Component Usage

```tsx
// H1 - Hero Title
<h1 
  className="text-[length:var(--text-fluid-h1)] leading-[length:var(--leading-fluid-tight)] font-tight font-bold"
>
  Find your perfect product
</h1>

// H2 - Section Title
<h2 
  className="text-[length:var(--text-fluid-h2)] leading-[length:var(--leading-fluid-tight)] font-tight font-semibold"
>
  Trending Now
</h2>

// Price
<span 
  className="text-[length:var(--text-fluid-price)] leading-[length:var(--leading-fluid-normal)] font-semibold"
>
  $299
</span>

// Body text
<p 
  className="text-[length:var(--text-fluid-body)] leading-[length:var(--leading-fluid-relaxed)]"
>
  Product description here
</p>

// Card Title
<h3 
  className="text-[length:var(--text-fluid-h3)] leading-[length:var(--leading-fluid-normal)] font-tight font-medium"
>
  Product Name
</h3>
```

#### Font Loading Strategy

```typescript
// app/layout.tsx
import { Inter, Inter_Tight } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

#### Performance Optimization

| Technique | Implementation |
|-----------|----------------|
| **Variable Fonts** | Load single Inter variable file (~30KB) |
| **Subset Loading** | Load only Latin characters |
| **Display Swap** | `font-display: swap` for fast text rendering |
| **No Breakpoints** | clamp() scales smoothly without media queries |
| **CSS Variables** | Efficient browser rendering |

#### Mobile-First Scaling Reference

| Screen | Viewport | Scale Factor | Example Output |
|--------|----------|--------------|----------------|
| **Small Mobile** | 375px | 1.0x (min) | H1 = 28px, Body = 14px |
| **Large Mobile** | 430px | 1.1x | H1 = 32px, Body = 15px |
| **Small Tablet** | 768px | 1.5x | H1 = 38px, Body = 16px |
| **Desktop** | 1024px | 1.8x | H1 = 44px, Body = 16px |
| **Large Desktop** | 1440px | 2.0x (max) | H1 = 48px, Body = 16px |

### 7.11 Design Inspiration

| Platform | Element | Implementation |
|----------|---------|----------------|
| **Amazon** | Search, filters, product cards | Search bar, filter panel, card layout |
| **eBay** | Seller ratings, condition info | Seller badges, condition badges |
| **Shein** | Visual-first, fast scroll | Large images, horizontal carousels |
| **Etsy** | Curated collections, storytelling | Featured collections, seller stories |
| **Pinterest** | Horizontal buckets | Carousel-based UI |

---

## 8. Performance & Scalability

### 8.1 Target Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Monthly Requests** | 1M+ requests/month | Vercel Analytics |
| **Monthly Active Users** | 1M+ MAU | Amplitude |
| **Peak Concurrent Users** | 10,000+ | Vercel Analytics |
| **Page Load Time** | <2 seconds | Web Vitals (LCP) |
| **Time to Interactive** | <3 seconds | Web Vitals (TTI) |
| **AI Response Time** | <5 seconds (simple), <30s (complex) | Custom metrics |
| **Error Rate** | <0.1% | Sentry |
| **Uptime** | 99.9% | UptimeRobot |

### 8.1.1 Performance Budgets

#### Core Web Vitals Targets

| Metric | Target | Threshold | Measurement |
|--------|--------|-----------|-------------|
| **LCP** (Largest Contentful Paint) | <2.5s | <4.0s | 75th percentile |
| **FID** (First Input Delay) | <100ms | <300ms | 75th percentile |
| **CLS** (Cumulative Layout Shift) | <0.1 | <0.25 | 75th percentile |
| **TTFB** (Time to First Byte) | <800ms | <1.5s | 75th percentile |
| **INP** (Interaction to Next Paint) | <200ms | <500ms | 75th percentile |

#### Bundle Size Budgets

| Asset Type | Budget | Hard Limit |
|------------|--------|------------|
| **Initial JS** | <150KB gzipped | <200KB |
| **Total JS** | <300KB gzipped | <500KB |
| **Initial CSS** | <50KB gzipped | <100KB |
| **Images** | <200KB (first load) | <500KB |
| **Fonts** | <50KB gzipped | <100KB |
| **Third-party Scripts** | <100KB gzipped | <200KB |

#### API Response Time SLAs

| Endpoint | P95 Target | P99 Target |
|----------|------------|------------|
| **Product Search** | <500ms | <1s |
| **AI Chat Response** | <3s | <5s |
| **Save Item** | <200ms | <500ms |
| **User Profile** | <300ms | <800ms |

### 8.1.2 Image Optimization Strategy

#### Next.js Image Configuration

```typescript
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ebayimg.com" },
      { protocol: "https", hostname: "img.hypedc.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1280],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
};
```

#### Product Image Component

```typescript
function ProductImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="product-image-container">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={generateBlurDataURL(src)}
        priority={priority}
        quality={80}
        onError={(e) => {
          e.currentTarget.src = "/placeholder-product.png";
        }}
      />
    </div>
  );
}
```

#### Optimization Techniques

| Technique | Benefit | Implementation |
|-----------|---------|----------------|
| **AVIF/WebP** | 30-50% smaller | Next.js `formats` config |
| **Responsive sizing** | Faster loads | `sizes` prop with breakpoints |
| **Lazy loading** | Faster FCP | Default in Next.js Image |
| **Priority loading** | Better LCP | `priority={true}` for above-fold |
| **Blur placeholder** | Better UX | `placeholder="blur"` |
| **Error fallback** | Reliability | `onError` handler |
| **CDN caching** | Global performance | Vercel Edge Network |

### 8.2 Caching Strategy

| Layer | Technology | Strategy |
|-------|------------|----------|
| **Product Listings** | Convex Cache + Vercel Data Cache | 1-24 hours (per eBay docs) |
| **Search Results** | Vercel Data Cache | 5-15 minutes |
| **API Responses** | Vercel Network Cache | 60 seconds |
| **Static Assets** | Vercel Edge CDN | Long-term cache with versioning |
| **Images** | eBay CDN (direct links) | Browser cache |
| **User Data** | Convex Real-time | No cache (real-time) |
| **Chat Context** | Convex + Inngest | Session-based |

### 8.3 Edge Computing

**Vercel Edge Functions** for:
- Affiliate URL generation
- Request validation
- Rate limiting checks
- Response transformation
- A/B testing routing

```typescript
// apps/web/src/app/api/affiliate-link/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  
  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }
  
  const affiliateUrl = generateAffiliateUrl(productId);
  
  return NextResponse.json({ url: affiliateUrl });
}

function generateAffiliateUrl(itemId: string): string {
  const params = new URLSearchParams({
    mkevt: "1",
    mkcid: "1",
    mkrid: process.env.EBAY_ROTATION_ID!,
    campid: process.env.EBAY_CAMPAIGN_ID!,
    toolid: process.env.EBAY_TOOL_ID!,
    customid: "sendcat",
  });
  
  return `https://www.ebay.com/itm/${itemId}?${params.toString()}`;
}
```

### 8.4 Database Scaling

- **Convex**: Automatic scaling, connection pooling
- **Indexed Queries**: Optimized for user lookups
- **Pagination**: Cursor-based for large result sets
- **Sharding**: Not needed at current scale

### 8.5 Frontend Optimization

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: next/image with eBay CDN
- **Bundle Analysis**: @next/bundle-analyzer
- **Prefetching**: Link prefetch for navigation
- **Streaming**: React Suspense for AI responses

---

## 9. Analytics & Monitoring

### 9.1 Product Analytics (Amplitude + PostHog)

**Events to Track**:

| Event Category | Events |
|----------------|--------|
| **Search** | query_entered, filters_applied, results_viewed, no_results |
| **AI Chat** | query_sent, response_received, result_clicked, conversation_started |
| **Products** | product_viewed, image_tap, seller_info_viewed |
| **Engagement** | item_saved, item_removed, share_clicked |
| **Conversion** | affiliate_link_clicked, purchase_initiated |
| **Session** | session_start, session_end, page_viewed |
| **Performance** | page_load_time, ai_response_time |

**User Properties**:
- subscription_tier
- preferred_categories
- average_order_value
- total_saved_items
- ai_queries_per_day

**Sample Event Structure**:
```typescript
{
  event: "ai_query_sent",
  user_id: "user_123",
  device_type: "mobile",
  platform: "web",
  time: 1704556800000,
  properties: {
    query: "laptops under $800",
    categories_detected: ["electronics", "computers"],
    ai_model: "gpt-4",
    tokens_used: 150,
    subscription_tier: "free",
  }
}
```

### 9.2 Error Tracking (Sentry)

**Error Categories**:

| Category | Examples | Alert Priority |
|----------|----------|----------------|
| **API Failures** | eBay API timeout, rate limit | Medium |
| **AI Agent Failures** | LLM error, timeout, hallucination | High |
| **Authentication Errors** | Clerk session expired | Low |
| **Database Errors** | Convex query failed | High |
| **Client Errors** | React rendering errors, hydration | Medium |
| **Rate Limit Errors** | User rate limit exceeded | Low |

**Alert Rules**:
- Critical errors: Immediate Slack notification
- High error rate (>1%): Email alert
- Performance degradation (P99 > 5s): Email alert

### 9.3 Business Metrics Dashboard

**Key Metrics**:
- Daily/Monthly Active Users (DAU/MAU)
- AI Chat Sessions per User
- Average Query Complexity
- Product Views per Session
- Affiliate Link Click-Through Rate (CTR)
- Conversion Rate (clicks → purchases)
- Affiliate Revenue
- User Acquisition (organic vs. paid)
- Retention Rate (1-day, 7-day, 30-day)
- Churn Rate
- Net Promoter Score (NPS)

---

## 10. Logging & Observability Strategy

### 10.1 Core Philosophy: Wide Events / Canonical Log Lines

Instead of scattered `console.log` statements, each request generates **one comprehensive log event** containing all context:

```typescript
// Traditional (AVOID):
console.log("User logged in");
console.log("Fetching products");
console.log("Products found:", count);
console.log("Rendering UI");

// Wide Event Approach (PREFERRED):
{
  "timestamp": "2026-01-06T10:30:00.000Z",
  "level": "info",
  "requestId": "req_abc123xyz",
  "traceId": "trace_456def789",
  "spanId": "span_012abc345",
  "userId": "user_456",
  "sessionId": "sess_789ghi012",
  "service": "send-cat-api",
  "eventType": "product_search_request",
  "status": "success",
  "latencyMs": 245,
  "httpStatusCode": 200,
  "context": {
    "subscriptionTier": "free",
    "userRegion": "caribbean",
    "isVipUser": false,
    "aiModelUsed": "gpt-4",
    "agentType": "search",
    "cacheHit": false,
    "apiRateLimitRemaining": 95,
    "searchQuery": "vintage leather jacket",
    "filtersApplied": ["price_range", "condition_new"],
    "resultsCount": 47,
    "categoryDetected": "clothing",
    "apiSource": "ebay_browse_api",
    "retryAttempt": 0,
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0...",
    "platform": "web",
    "featureFlags": ["ai_chat_v2", "image_tryon"]
  },
  "error": null
}
```

### 10.2 Structured Logging Standards

| Field | Type | Description | Cardinality |
|-------|------|-------------|-------------|
| `timestamp` | ISO 8601 | UTC timestamp with milliseconds | Low |
| `level` | enum | "debug", "info", "warn", "error", "fatal" | Low |
| `requestId` | UUID | Unique request identifier | High |
| `traceId` | UUID | Distributed trace ID | High |
| `spanId` | string | Current span identifier | High |
| `userId` | string | User ID (null for anonymous) | High |
| `sessionId` | string | Session identifier | High |
| `service` | string | Service name (api, ai-agent, auth) | Low |
| `eventType` | string | Business event type | Medium |
| `status` | enum | "success", "error", "timeout", "rate_limited" | Low |
| `latencyMs` | number | Request duration in milliseconds | High |
| `error` | object | Error details (if applicable) | Medium |
| `context` | object | Business context (high dimensionality) | High |

### 10.3 Business Context Fields (High Dimensionality)

```typescript
context: {
  // User context
  subscriptionTier: "free" | "premium",
  userRegion: "caribbean" | "latam" | "other",
  isVipUser: boolean,
  preferredCategories: string[],
  
  // Request context
  aiModelUsed?: string,
  agentType?: "search" | "price" | "sourcing" | "recommendation",
  cacheHit: boolean,
  cacheTtl?: number,
  apiRateLimitRemaining: number,
  retryAttempt: number,
  
  // Business context
  cartValue?: number,
  itemsInCart?: number,
  searchQuery: string,
  categoryId?: string,
  productCount: number,
  filtersApplied: string[],
  
  // AI context
  tokensUsed?: number,
  aiPromptTokens?: number,
  aiCompletionTokens?: number,
  aiCostUsd?: number,
  
  // Technical context
  userAgent: string,
  platform: "web" | "mobile",
  screenWidth?: number,
  connectionType?: string,
  
  // Feature flags
  featureFlags: string[],
}
```

### 10.4 OpenTelemetry (OTEL) Integration

**Purpose**: Standardized trace propagation and span attributes

```typescript
// packages/shared/src/logging/otel-config.ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "send-cat",
    [ATTR_SERVICE_VERSION]: "1.0.0",
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": { enabled: false },
    }),
  ],
});

sdk.start();

// Graceful shutdown
process.on("SIGTERM", () => {
  sdk.shutdown().then(() => console.log("OTEL shut down"));
});
```

**Span Attributes for Business Context**:
```typescript
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("send-cat");

async function handleSearchRequest(userId: string, query: string) {
  const span = tracer.startSpan("product_search");
  
  try {
    span.setAttribute("user.id", userId);
    span.setAttribute("search.query", query);
    span.setAttribute("subscription.tier", await getUserTier(userId));
    span.setAttribute("search.category_detected", detectCategory(query));
    
    const results = await searchProducts(query);
    
    span.setAttribute("results.count", results.length);
    span.setAttribute("search.success", true);
    
    return results;
  } catch (error) {
    span.setAttribute("error.message", error.message);
    span.setAttribute("error.code", error.code);
    span.setAttribute("search.success", false);
    throw error;
  } finally {
    span.end();
  }
}
```

### 10.5 Smart Sampling Strategy

| Request Type | Sampling Rate | Rationale |
|--------------|---------------|-----------|
| **Errors** | 100% | Always retain for debugging |
| **Slow Requests** (P99+) | 100% | Performance investigation |
| **VIP Users** | 100% | Premium experience保障 |
| **Internal/Test Accounts** | 100% | QA and debugging |
| **Complex AI Queries** | 100% | Costly operations |
| **Happy Path (Normal)** | 1-5% | Cost control for high traffic |

**Sampling Implementation**:
```typescript
// packages/shared/src/logging/sampler.ts
interface SamplingDecision {
  shouldSample: boolean;
  sampleRate: number;
  traceId: string;
}

export function makeSamplingDecision(
  status: "success" | "error",
  latencyMs: number,
  userId: string | null,
  isVipUser: boolean
): SamplingDecision {
  // Always sample errors
  if (status === "error") {
    return { shouldSample: true, sampleRate: 1.0, traceId: crypto.randomUUID() };
  }
  
  // Always sample slow requests (> P99 threshold, e.g., 5s)
  if (latencyMs > 5000) {
    return { shouldSample: true, sampleRate: 1.0, traceId: crypto.randomUUID() };
  }
  
  // Always sample VIP users
  if (isVipUser) {
    return { shouldSample: true, sampleRate: 1.0, traceId: crypto.randomUUID() };
  }
  
  // Sample internal accounts
  if (userId?.startsWith("internal_")) {
    return { shouldSample: true, sampleRate: 1.0, traceId: crypto.randomUUID() };
  }
  
  // Random sampling for normal requests (5%)
  const shouldSample = Math.random() < 0.05;
  return { 
    shouldSample, 
    sampleRate: shouldSample ? 0.05 : 0, 
    traceId: crypto.randomUUID() 
  };
}
```

### 10.6 Log Event Types

| Event Type | When to Emit | Key Fields |
|------------|--------------|------------|
| `api_request_start` | Request begins | requestId, userId, eventType |
| `api_request_complete` | Request ends | All context, latency, status |
| `ai_agent_invoked` | Agent called | agentType, query, model |
| `ai_agent_complete` | Agent finished | results, tokens, cost |
| `background_job_start` | Inngest job begins | jobId, type, userId |
| `background_job_complete` | Job ends | results, duration, status |
| `affiliate_click` | User clicks product | productId, source, session |
| `user_authenticated` | Login/signup | authMethod, provider |
| `error_occurred` | Any error | errorCode, errorMessage, stack |
| `rate_limit_exceeded` | Rate limit hit | limit, tier, endpoint |

### 10.7 Disallowed Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| `console.log` statements | No structure, no context | Use structured logger |
| Logging every step | Verbose, expensive | Single wide event per request |
| Missing `requestId` | Cannot trace across services | Auto-inject on every request |
| Ignoring high cardinality | Loses debugging value | Always include userId, requestId |
| Logging sensitive data | Security/privacy risk | Sanitize PII before logging |
| Not handling errors | Silent failures | Always log errors with context |

### 10.8 Cost-Effective Implementation

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Log Ingestion** | OpenTelemetry Collector | Standardized export |
| **Storage** | Datadog / Honeycomb / ClickHouse | Columnar storage for high-cardinality data |
| **Query Interface** | Platform-specific analytics | Debug queries without SQL |
| **Alerting** | Sentry + Custom alerts | Error and anomaly detection |

---

## 11. Compliance & Legal

### 11.1 Affiliate Disclosure

**Requirements**:
- Clear disclosure that Sendcat is an eBay affiliate
- Disclosure visible on every page (footer)
- Product page badge: "Affiliate link"

**Implementation**:
```typescript
// apps/web/src/components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-400">
          Sendcat is an eBay affiliate. We earn commissions on qualifying 
          purchases made through our links at no extra cost to you.
        </p>
      </div>
    </footer>
  );
}
```

### 11.2 Cookie Consent

**Requirements** (Caribbean jurisdiction):
- Cookie banner on first visit
- Opt-in for analytics tracking
- Easy withdrawal of consent
- Privacy policy link

**Implementation**:
- Use @vercel/analytics or similar with consent
- PostHog has built-in consent management
- Clerk handles authentication cookies

### 11.3 Returns & Refunds

**Policy**:
- Users redirected to eBay for purchases
- Sendcat cannot process returns (aggregator model)
- Links to eBay return policy on product pages
- Clear disclaimer: "Purchases are subject to eBay's policies"

### 11.4 Data Protection

| Aspect | Policy |
|--------|--------|
| **User Data Storage** | Convex (SOC 2 compliant) |
| **Analytics** | Anonymized (no PII) |
| **Data Retention** | Delete on account deletion request |
| **Data Export** | User can export all data |
| **Third-Party Sharing** | Only with marketplace APIs for search |

### 11.5 Terms of Service

Required sections:
1. **Service Description**: AI-powered product aggregation
2. **Affiliate Disclosure**: Commissions on purchases
3. **User Responsibilities**: Accurate account information
4. **Limitation of Liability**: Aggregator role, not seller
5. **Governing Law**: Caribbean jurisdiction
6. **Dispute Resolution**: Arbitration clause

### 11.6 Webhooks & External Integrations

#### Webhook Overview

| Source | Events | Handler | Priority |
|--------|--------|---------|----------|
| **Clerk** | `user.created`, `user.updated`, `user.deleted` | Sync user to Convex | High |
| **eBay** | `order.completed`, `inventory.updated` | Track conversions, update cache | High |
| **Inngest** | `job.completed`, `job.failed` | Notify user, handle failures | High |

#### Clerk Webhooks

```typescript
export async function POST(req: Request) {
  const headers = req.headers;
  const svix_id = headers.get("svix-id");
  const svix_timestamp = headers.get("svix-timestamp");
  const svix_signature = headers.get("svix-signature");

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let event: WebhookEvent;

  try {
    event = webhook.verify(req.body as string, {
      "svix-id": svix_id!,
      "svix-timestamp": svix_timestamp!,
      "svix-signature": svix_signature!,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Webhook verification failed", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
      await convex.mutation(internal.users.createFromClerk, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0]?.email_address,
      });
      break;
    case "user.deleted":
      await convex.mutation(internal.users.deleteFromClerk, {
        clerkId: event.data.id,
      });
      break;
  }

  return new Response("Webhook processed", { status: 200 });
}
```

#### Webhook Security

| Measure | Implementation |
|---------|----------------|
| **Signature verification** | Svix (Clerk), HMAC (eBay) |
| **Idempotency** | Track webhook IDs in Convex |
| **Retry handling** | Exponential backoff, max 3 attempts |
| **Logging** | Log all webhook events for debugging |

### 11.7 Legal Pages URLs

#### Required Pages

| Page | URL | Last Updated |
|------|-----|--------------|
| **Privacy Policy** | https://sendcat.com/privacy | TBD |
| **Terms of Service** | https://sendcat.com/terms | TBD |
| **Cookie Policy** | https://sendcat.com/cookies | TBD |
| **Affiliate Disclosure** | https://sendcat.com/affiliate-disclosure | TBD |

#### Privacy Policy Content Outline

1. Introduction
2. Information We Collect (Personal, Usage, Device)
3. How We Use Your Information
4. Information Sharing
5. Data Retention
6. Your Rights (Access, Correction, Deletion)
7. Contact Information

#### Footer Implementation

```typescript
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4>Sendcat</h4>
            <p>AI-powered e-commerce shopping</p>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/affiliate-disclosure">Affiliate Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p>© 2026 Sendcat. All rights reserved.</p>
          <p>Sendcat is an eBay affiliate. We earn commissions on qualifying purchases.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 12. Development & Deployment

### 12.1 Code Quality Standards

**TypeScript Configuration**:
```json
// packages/config/typescript/strict.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": false,
    "forceConsistentCasingInFileNames": true
  }
}
```

**No `any` Types**: All types must be explicit. Use `unknown` when type is truly unknown.

### 12.2 Testing Requirements

**Unit Tests** (Vitest):
```typescript
// packages/shared/src/utilities/formatting.test.ts
import { describe, it, expect } from "vitest";
import { formatCurrency, truncateText } from "./formatting";

describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    expect(formatCurrency(29.99, "USD")).toBe("$29.99");
  });
  
  it("handles zero", () => {
    expect(formatCurrency(0, "USD")).toBe("$0.00");
  });
});

describe("truncateText", () => {
  it("truncates long text", () => {
    expect(truncateText("Hello World", 5)).toBe("He...");
  });
});
```

**E2E Tests** (Playwright):
```typescript
// apps/web/tests/search.spec.ts
import { test, expect } from "@playwright/test";

test("user can search for products", async ({ page }) => {
  await page.goto("/");
  
  // Sign in
  await page.click("text=Sign In");
  await page.fill("input[name=email]", "test@example.com");
  await page.fill("input[name=password]", "password123");
  await page.click("button[type=submit]");
  
  // Search for products
  await page.fill("input[placeholder*='Search']", "laptops");
  await page.press("input[placeholder*='Search']", "Enter");
  
  // Verify results appear
  await expect(page.locator("text=Laptops")).toBeVisible();
  
  // Check carousel exists
  const carousel = page.locator("text=Laptops").locator("..");
  await expect(carousel).toBeVisible();
});

test("AI chat responds to query", async ({ page }) => {
  await page.goto("/chat");
  
  // Type query
  await page.fill("textarea", "Find red jackets under $50");
  await page.click("button:has-text('Send')");
  
  // Wait for response
  await expect(page.locator("text=Jackets")).toBeVisible({ timeout: 30000 });
});
```

**Test Coverage Requirements**:
- Unit tests: 80% coverage for shared packages
- E2E tests: Critical paths (search, chat, auth, checkout)
- Integration tests: API endpoints, Convex functions

### 12.3 CI/CD Pipeline (Vercel)

**Pipeline Flow**:
```
┌─────────────────────────────────────────────────────────────────────┐
│                        CI/CD Pipeline                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. PUSH TO BRANCH                                                 │
│     │                                                               │
│     ▼                                                               │
│  2. RUN TESTS                                                      │
│     ├─ Unit Tests (Vitest)                                         │
│     ├─ Type Check (TSC)                                            │
│     ├─ Lint (ESLint)                                               │
│     └─ Build (Next.js)                                             │
│     │                                                               │
│     ▼                                                               │
│  3. PREVIEW DEPLOYMENT                                             │
│     ├─ Vercel Preview URL                                          │
│     ├─ E2E Tests (Playwright)                                      │
│     └─ Accessibility Tests                                         │
│     │                                                               │
│     ▼                                                               │
│  4. MERGE TO MAIN                                                  │
│     │                                                               │
│     ▼                                                               │
│  5. PRODUCTION DEPLOY                                              │
│     ├─ Vercel Production                                           │
│     ├─ Database Migration                                          │
│     └─ Smoke Tests                                                 │
│                                                                     │
│  6. MONITORING                                                     │
│     ├─ Sentry Error Tracking                                       │
│     ├─ Performance Monitoring                                      │
│     └─ Alerting                                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Turborepo Configuration**:
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "outputs": ["coverage/**"],
      "dependsOn": []
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "outputs": []
    }
  }
}
```

### 12.4 Monitoring & Alerts

**Uptime Monitoring**:
- UptimeRobot or Vercel Uptime Checks
- 5-minute check interval
- Alert via Slack/email on downtime

**Performance Monitoring**:
- Vercel Analytics Dashboard
- Web Vitals (LCP, FID, CLS)
- Custom performance metrics

**Error Monitoring**:
- Sentry real-time error tracking
- Session replay for debugging
- Alerting for critical errors

**Logging**:
- Convex Dashboard for database logs
- Vercel Function Logs
- OpenTelemetry traces

---

## 13. Roadmap

### Phase 1: MVP (Months 1-3)

**Goal**: Launch web application with core eBay integration and basic AI chat

| Feature | Priority | Week |
|---------|----------|------|
| Monorepo setup (web + shared) | P0 | 1 |
| Clerk authentication | P0 | 2 |
| Convex database schema | P0 | 2 |
| eBay Browse API integration | P0 | 3 |
| Product search UI | P0 | 4 |
| Horizontal carousel components | P0 | 5 |
| Vercel AI SDK chat interface | P0 | 6 |
| Basic supervisor agent | P0 | 7 |
| Save items/wishlist | P1 | 8 |
| Affiliate link injection | P0 | 8 |
| PWA offline support | P1 | 9 |
| Analytics (Amplitude) | P1 | 10 |
| Error tracking (Sentry) | P1 | 10 |
| E2E tests | P1 | 11 |
| Performance optimization | P1 | 12 |
| **Launch** | **P0** | **12** |

**Exit Criteria**:
- [ ] Users can sign up and browse eBay products
- [ ] AI chat works for single-category searches
- [ ] Users can save items to wishlist
- [ ] Affiliate links track correctly
- [ ] Page load < 2 seconds
- [ ] E2E tests pass
- [ ] Error rate < 0.5%

### Phase 2: Enhanced AI (Months 4-6)

**Goal**: Deploy full multi-agent architecture and complex sourcing

| Feature | Priority | Week |
|---------|----------|------|
| Multi-agent architecture (supervisor + subagents) | P0 | 1 |
| Search agent with eBay API | P0 | 2 |
| Price comparison agent | P1 | 3 |
| Sourcing agent for multi-category queries | P0 | 4 |
| Inngest background jobs | P0 | 5 |
| Long-running task notifications | P0 | 6 |
| Price drop alerts | P1 | 7 |
| Image generation for try-on | P2 | 8 |
| Recommendation agent | P1 | 9 |
| User preference learning | P1 | 10 |
| Enhanced chat memory | P1 | 11 |
| Performance optimization | P1 | 12 |

### Phase 3: Scale & Expand (Months 7-12)

**Goal**: Scale to 1M users, add marketplaces, launch mobile

| Feature | Priority | Week |
|---------|----------|------|
| Amazon API integration | P1 | 1 |
| AliExpress API integration | P1 | 4 |
| Mobile app (Expo) | P1 | 7 |
| Shared UI components for native | P1 | 7 |
| Premium subscription tier | P2 | 10 |
| Advanced analytics dashboard | P2 | 12 |
| A/B testing framework | P2 | 14 |
| Scale to 1M users | P1 | 16 |
| Performance optimization for scale | P1 | 20 |

### Future Features (Post-Launch)

| Feature | Description |
|---------|-------------|
| Voice search | Voice input for queries |
| AR product preview | Augmented reality previews |
| Social shopping | Share lists with friends |
| Browser extension | Quick search from toolbar |
| Multi-language | Support for Spanish, French |
| Regional marketplaces | Additional Caribbean-focused features |
| Deal alerts | Push notifications for deals |
| Price history charts | Visual price trends |

---

## 14. Success Metrics

### 14.1 Technical Metrics

| Metric | Target (Month 3) | Target (Month 6) | Target (Month 12) |
|--------|------------------|------------------|-------------------|
| Monthly Active Users | 10,000 | 100,000 | 1,000,000 |
| Page Load Time (LCP) | <2s | <1.5s | <1s |
| Time to Interactive | <3s | <2.5s | <2s |
| AI Response Time (simple) | <5s | <3s | <2s |
| AI Response Time (complex) | <30s | <20s | <15s |
| Error Rate | <0.5% | <0.2% | <0.1% |
| Uptime | 99.5% | 99.9% | 99.95% |

### 14.2 Business Metrics

| Metric | Target (Month 3) | Target (Month 6) | Target (Month 12) |
|--------|------------------|------------------|-------------------|
| Daily Active Users | 1,000 | 10,000 | 100,000 |
| AI Chat Sessions | 5,000/month | 50,000/month | 500,000/month |
| Products Viewed | 100,000/month | 1M/month | 10M/month |
| Saved Items | 10,000 | 100,000 | 1M |
| Affiliate Revenue | $500/month | $5,000/month | $50,000/month |
| User Retention (30-day) | 20% | 30% | 40% |
| Chat Completion Rate | 80% | 90% | 95% |
| NPS Score | 30 | 50 | 60 |

### 14.3 Quality Metrics

| Metric | Target |
|--------|--------|
| E2E Test Pass Rate | 100% |
| TypeScript Strict Mode | 100% compliance |
| Test Coverage (Shared) | >80% |
| Lighthouse Score | >90 |
| Accessibility (a11y) | WCAG 2.1 AA |

---

## 15. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **eBay API rate limits** | High | Medium | Caching, user tier limits, request queuing |
| **AI costs scaling** | High | Medium | Rate limits, tiered pricing, prompt optimization |
| **Affiliate commission changes** | Medium | Low | Diversify to Amazon/AliExpress |
| **Security breach** | Critical | Low | Regular audits, token rotation, WAF |
| **Performance at scale** | High | Medium | Edge caching, database optimization |
| **Marketplace API deprecation** | High | Low | Abstraction layer, multi-provider support |
| **User churn** | Medium | Medium | Personalization, better UX, AI improvements |
| **Regulatory changes** | Medium | Low | Legal review, compliance monitoring |
| **Vendor lock-in (Convex)** | Medium | Low | Export tools, migration path |
| **Team capacity** | Medium | Medium | Clear roadmap, prioritization |

---

## 16. Appendix

### 16.1 eBay API Reference

**Browse API Endpoints**:
- `GET /shopping/v1/item_summary/search` - Search products
- `GET /shopping/v1/item_summary/{item_id}` - Get item details
- `GET /shopping/v1/category_tree/{category_tree_id}` - Get categories

**Rate Limits**:
- 5,000 calls/day (standard)
- 10,000 calls/day (affiliate)

**Caching Requirements**:
- Product data: Cache for 1 hour minimum
- Search results: Cache for 5 minutes minimum
- No caching of user-specific data

### 16.2 Convex Limits

| Resource | Limit |
|----------|-------|
| Functions per deployment | 100 |
| Function timeout | 120 seconds |
| Database size | 5GB (free tier) |
| API calls/month | 10M (free tier) |

### 16.3 Inngest Pricing

| Plan | Price | Executions | Concurrent |
|------|-------|------------|------------|
| Hobby | $0/mo | 50,000/month | 5 |
| Pro | $75/mo | 1M+/month | 100 |
| Enterprise | Custom | Unlimited | Custom |

### 16.4 Vercel Pricing (Pro)

| Feature | Limit |
|---------|-------|
| Bandwidth | 100GB/month |
| Serverless Functions | 100GB-hours |
| Build Minutes | 6,000 minutes |
| Team Members | 10 |

### 16.5 Disaster Recovery & Backup

#### Backup Strategy

| Data Type | Backup Frequency | Retention | Location |
|-----------|------------------|-----------|----------|
| **Convex Database** | Real-time (Convex-managed) | 7 days | Convex Cloud |
| **Code Repository** | On every push | Indefinite | GitHub |
| **Environment Variables** | Manual backup | Indefinite | 1Password/Vault |
| **Analytics Data** | Daily export | 1 year | Amplitude/PostHog |
| **Logs** | Real-time stream | 30 days | Datadog/Sentry |

#### Incident Response Plan

| Severity | Definition | Response Time | Examples |
|----------|------------|---------------|----------|
| **P0 - Critical** | Complete outage | 15 min | Site down, data loss |
| **P1 - High** | Major feature broken | 1 hour | Search not working |
| **P2 - Medium** | Minor feature broken | 4 hours | Analytics offline |
| **P3 - Low** | Non-critical issue | 24 hours | UI glitch |

#### Uptime SLAs

| Service | Target | Monthly Minutes Lost |
|---------|--------|----------------------|
| **Website** | 99.9% | ~43 min/month |
| **API** | 99.9% | ~43 min/month |
| **Database** | 99.95% | ~22 min/month |
| **AI Services** | 99.5% | ~3.6 hours/month |

#### Rollback Procedures

```bash
# Vercel rollback
vercel rollback --prod

# Rollback checklist
1. Assess impact and severity
2. Notify stakeholders (if P0/P1)
3. Execute rollback
4. Verify functionality
5. Document incident
6. Post-mortem within 48 hours
```

#### Monitoring & Alerting

| Alert Type | Threshold | Notification |
|------------|-----------|--------------|
| **Uptime Check** | Site returns 5xx | Slack + PagerDuty |
| **Error Rate** | >1% errors for 5 min | Slack |
| **Latency** | P95 > 5s for 5 min | Slack |
| **Budget Alert** | >80% monthly spend | Email |
| **API Quota** | >80% eBay quota | Slack |

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1 | 2026-01-06 | Sendcat Team | Added Zod validation, placeholder pricing tiers, i18n strategy, accessibility requirements, error handling, SEO strategy, performance budgets, image optimization, webhooks, legal pages, disaster recovery |
| 1.0 | 2026-01-06 | Sendcat Team | Initial PRD |

---

**End of Document**
