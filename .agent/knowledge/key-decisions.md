# Key Architectural Decisions

## 1. Package Manager: Bun

**Decision:** Use Bun instead of PNPM or npm

**Rationale:**
- Developer preference for faster install times
- Good monorepo support with workspaces
- TypeScript-native tooling built-in
- Active development and community

**Date:** 2026-01-07

---

## 2. UI Pattern: Horizontal Carousels

**Decision:** Use horizontal carousels (eBay design system) instead of vertical product grids

**Rationale:**
- Industry standard for e-commerce mobile apps
- Better mobile experience (swipe gestures)
- Proven accessibility patterns
- Matches user expectations from marketplace apps
- Allows category-based organization

**Source:** eBay Design System specifications

**Implementation:**
- Breakpoints: 375px (1.5 tiles), 512px (2.5 tiles), 1280px (4.5 tiles)
- Navigation: swipe (mobile), arrows (desktop)
- Spacing: 8-16px between tiles

**Date:** 2026-01-07

---

## 3. Validation: Zod + Convex Dual Approach

**Decision:** Use Zod for runtime validation alongside Convex's type system

**Rationale:**
- Convex provides TypeScript types at compile time
- Zod provides runtime validation for external data (API responses, user input)
- Complements each other without redundancy
- Catches errors before they reach the database

**Implementation:**
- API responses: validated with Zod schemas
- User input: validated with Zod before Convex
- Database: Convex schema with `defineSchema`

**Date:** 2026-01-07

---

## 4. Agent Architecture: Multi-Stage (Dexter-Inspired)

**Decision:** Implement multi-agent system with Planning → Action → Validation → Answer stages

**Rationale:**
- Proven architecture from Dexter Financial Research Agent
- Separates concerns for complex shopping queries
- Enables parallel task execution
- Self-validation catches errors early
- Allows cost tracking per stage

**Stages:**
1. **Planning Agent:** Decomposes query into tasks
2. **Action Agents:** Execute tasks (Search, Price, Sourcing, Recommendation)
3. **Validation Agent:** Self-checks results, detects loops
4. **Answer Agent:** Synthesizes final response

**Safety Limits:**
- Max 20 steps per query
- 30s timeout per task
- 5min timeout per query
- $0.10 cost limit per query
- 3 retry attempts

**Date:** 2026-01-07

---

## 5. Typography: Fluid with clamp()

**Decision:** Use CSS `clamp()` for fluid typography instead of breakpoints

**Rationale:**
- Smoother scaling between viewport sizes
- Fewer breakpoints to maintain
- Better readability across all screen sizes
- Modern CSS feature with good browser support

**Scale:**
- H1: `clamp(1.75rem, 3vw + 1.25rem, 3rem)` (28-48px)
- H2: `clamp(1.375rem, 2.5vw + 1rem, 2.25rem)` (22-36px)
- H3: `clamp(1.125rem, 1vw + 1rem, 1.5rem)` (18-24px)
- Body: `clamp(0.875rem, 0.5vw + 0.75rem, 1rem)` (14-16px)
- Price: `clamp(1rem, 0.75vw + 0.75rem, 1.25rem)` (16-20px)

**Date:** 2026-01-07

---

## 6. Authentication: Clerk

**Decision:** Use Clerk for user authentication

**Rationale:**
- Pre-built components and hooks
- Excellent Next.js integration
- User management dashboard
- Multi-factor authentication support
- Works well with Convex

**Implementation:**
- Middleware: `auth.ts`
- Provider: `<ClerkProvider>`
- Protected routes via middleware

**Date:** 2026-01-07

---

## 7. Database: Convex

**Decision:** Use Convex as the primary database

**Rationale:**
- Serverless, no database management
- Real-time subscriptions built-in
- TypeScript-native with automatic types
- Works seamlessly with Clerk for user data
- Good free tier for MV

**Tables (from PRD):**
- `users` - Extended user profiles
- `products` - Cached product data
- `chatSessions` - Conversation history
- `chatMessages` - Individual messages
- `sourcingRequests` - Custom requests
- `analyticsEvents` - Tracking events
- `affiliateLinks` - Generated affiliate URLs

**Date:** 2026-01-07

---

## 8. AI Provider: OpenRouter

**Decision:** Use OpenRouter for LLM access

**Rationale:**
- Access to multiple models (GPT-4, Claude, open models)
- Unified API across providers
- Cost tracking per model
- No vendor lock-in
- Works with Vercel AI SDK

**Models:**
- Primary: GPT-4o or Claude 3.5 Sonnet
- Fallback: GPT-4o-mini or Claude 3 Haiku

**Date:** 2026-01-07

---

## 9. Fonts: Inter + Inter Tight

**Decision:** Use Inter for body text and Inter Tight for headings

**Rationale:**
- Both free (Google Fonts)
- Modern, readable, professional
- Inter Tight has slightly narrower letterforms for headings
- Excellent web performance via `next/font`
- Mobile-friendly weights

**Weights:**
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700

**Date:** 2026-01-07

---

## 10. Monorepo: Turborepo with Bun

**Decision:** Use Turborepo for monorepo orchestration with Bun workspaces

**Rationale:**
- Code sharing between web and mobile apps
- Cached builds for faster iteration
- Shared packages for types, utilities, components
- Clear separation of concerns
- Easier dependency management

**Structure:**
```
sendcat/
├── apps/
│   ├── web/        (Next.js)
│   └── mobile/     (Expo, future)
└── packages/
    ├── shared/     (types, utilities)
    ├── ui/         (shared components)
    └── config/     (shared configs)
```

**Date:** 2026-01-07
