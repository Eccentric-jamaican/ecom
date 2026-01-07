# Sendcat Agent Filesystem Memory System

## Core Principles

1. **Always read memory files first** - Start every task by reading `.agent/plan/current-plan.md` and `.agent/memory/current-summary.md`
2. **Trust files over internal recollection** - If filesystem says something different from what you remember, trust the files
3. **Update memory after completing tasks** - Write completed work to `.agent/memory/completed-tasks.md`
4. **Record key decisions** - Document architectural decisions in `.agent/knowledge/key-decisions.md`

## Mandatory Start-of-Turn Procedure

```markdown
1. Read `.agent/plan/current-plan.md` - Understand current task
2. Read `.agent/memory/current-summary.md` - Recent context
3. Read `.agent/memory/completed-tasks.md` - What's done
4. Read `PRD.md` if the task involves architecture, requirements, or design decisions
5. Update `.agent/memory/current-summary.md` - Add new context
```

## Directory Structure

```
.agent/
├── plan/
│   └── current-plan.md          # Active task plan (READ FIRST)
├── knowledge/
│   ├── tech-stack.md            # Technology choices & rationale
│   ├── key-decisions.md         # Architectural decisions log
│   ├── api-endpoints.md         # API endpoints reference
│   └── conventions.md           # Code style & patterns
├── memory/
│   ├── current-summary.md       # Recent session context
│   ├── completed-tasks.md       # Completed work log
│   └── session-history.md       # Full session history
└── filesystem.md                # This file

# Root Project Files
├── PRD.md                       # Product Requirements Document (134KB, 3,200+ lines)
├── package.json                 # Project dependencies
└── tsconfig.json                # TypeScript configuration
```

## Project Context

| Attribute | Value |
|-----------|-------|
| **Project Name** | Sendcat |
| **Type** | Mobile-first e-commerce aggregation platform |
| **Package Manager** | bun |
| **Primary Language** | TypeScript (Strict Mode) |
| **Frontend Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS |
| **Validation** | Zod (runtime) |
| **Authentication** | Clerk |
| **Database** | Convex |
| **AI Provider** | OpenRouter (GPT-4, Claude) |
| **AI SDK** | Vercel AI SDK |
| **Background Jobs** | Inngest |
| **Architecture** | Monorepo (Turborepo) |
| **Design Pattern** | Multi-agent (Dexter-inspired) |
| **UI Pattern** | Horizontal carousels (eBay spec) |
| **Typography** | Inter + Inter Tight, fluid clamp() |

## Project Documentation

### PRD.md - Product Requirements Document

**Location:** `./PRD.md` (134KB, 3,200+ lines)

**IMPORTANT:** This is the authoritative source for all project requirements, architecture decisions, and design specifications.

**When to read PRD.md:**
- Understanding feature requirements
- Reviewing database schema
- Checking UI/UX specifications
- Understanding agent architecture
- Validating design decisions
- Planning new features

**PRD Sections:**
1. Executive Summary & Value Proposition
2. Monorepo Architecture
3. Technical Architecture & Tech Stack
4. Multi-Agent Architecture (Dexter-inspired)
5. Core Features & Functionality
6. Database Schema (Convex tables)
7. Security Requirements
8. UI/UX Specifications
9. Carousel Component Specs (eBay Design System)
10. Typography & Fluid Design
11. Performance & Scalability
12. Analytics & Monitoring Strategy
13. Logging Strategy
14. Compliance & Legal
15. Development & Deployment
16. Roadmap (3 phases)
17. Success Metrics
18. Risks & Mitigations

**Quick reference commands in PRD:**
- `grep -n "TODO\|FIXME\|HACK"` - Find implementation notes
- `grep -n "## [0-9]\." PRD.md` - List all sections
- `sed -n '1,100p' PRD.md` - Read first 100 lines

### Key PRD-Derived Documents

| File | Source | Purpose |
|------|--------|---------|
| `.agent/knowledge/tech-stack.md` | PRD Section 3 | Tech stack reference |
| `.agent/knowledge/key-decisions.md` | PRD Section 4+ | Architectural decisions |
| `.agent/knowledge/api-endpoints.md` | PRD Section 6 | API references |
| `.agent/plan/current-plan.md` | PRD Section 16 | Current roadmap |

**Always prefer PRD.md for authoritative answers about project requirements.**

## Code Conventions

### TypeScript
- **No `any`** - Use explicit types or `unknown`
- **Strict mode enabled** - All strict flags on
- **Explicit return types** - Required for exported functions
- **No unused variables** - Remove or prefix with `_`

### Component Pattern
```tsx
// Functional components with hooks
export function ComponentName({ prop1, prop2 }: Props) {
  return <div>{prop1}</div>
}
```

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Hooks: `useCamelCase.ts`
- Types: `types.ts` or `PascalCase.types.ts`

### Directory Structure
```
src/
├── app/                    # App Router pages
├── components/             # React components
│   ├── ui/                 # Base UI (shadcn/ui)
│   └── features/           # Feature-specific components
├── lib/                    # Utilities & clients
├── convex/                 # Convex functions
└── types/                  # TypeScript types
```

## External Tool Documentation

**IMPORTANT:** When working with external libraries, APIs, or tools, **always use web search** to get the most current documentation. Do not rely on internal knowledge which may be outdated.

### How to Get Up-to-Date Docs

1. **Use `websearch` or `codesearch` tool** before implementing external integrations
2. **Search for official documentation** - Prefer official docs over third-party guides
3. **Verify API versions** - Check for breaking changes in recent versions
4. **Check for best practices** - Look for updated patterns and recommendations

### Common Documentation Sources

| Tool/Library | Search Query |
|--------------|--------------|
| Next.js 16 | `Next.js 16 App Router documentation 2025` |
| Convex | `Convex database functions documentation` |
| Clerk | `Clerk authentication Next.js documentation` |
| Vercel AI SDK | `Vercel AI SDK chat interface documentation` |
| OpenRouter | `OpenRouter API documentation` |
| Inngest | `Inngest Next.js background jobs documentation` |
| Tailwind CSS | `Tailwind CSS v4 documentation` |
| Zod | `Zod validation TypeScript documentation` |
| shadcn/ui | `shadcn/ui components installation documentation` |
| eBay API | `eBay Browse API v1 documentation` |

### Before Using Any External Tool

```markdown
1. Search for official documentation the version being used (
2. Notecheck package.json)
3. Look for migration guides if upgrading
4. Check for TypeScript type definitions
5. Review rate limits and pricing
6. Note any required environment variables
```

## Agent Memory Update Template

After completing a task, update `.agent/memory/completed-tasks.md`:

```markdown
## [YYYY-MM-DD] - Task Name

**Status:** Completed
**Files Changed:**
- `path/to/file1.ts`
- `path/to/file2.ts`

**Summary:**
Brief description of what was done

**Key Decisions:**
- Decision made
- Another decision

**Next Steps:**
- What should come next
```

## Communication Protocol

- **Be concise** - Short, direct responses
- **Show your work** - Explain briefly what you're doing
- **Ask questions** - Clarify before making major architectural changes
- **Report blockers** - Flag issues early with context

## Error Handling

When encountering errors:
1. Check `.agent/knowledge/key-decisions.md` for relevant context
2. Search for similar issues in documentation
3. Document the error and solution in `.agent/memory/completed-tasks.md`
4. Do not continue without understanding the root cause

## Security Guidelines

- **Never commit secrets** - Use environment variables
- **Validate all inputs** - Use Zod schemas
- **Sanitize outputs** - Prevent XSS in React
- **Use parameterized queries** - Convex handles this natively
- **Follow least privilege** - Clerk roles for access control

## Quick Reference

### Commands
| Action | Command |
|--------|---------|
| Install dependencies | `bun install` |
| Run dev server | `bun run dev` |
| Run typecheck | `bun run typecheck` |
| Run lint | `bun run lint` |
| Run tests | `bun run test` |
| Convex dev | `npx convex dev` |
| Deploy | `bun run deploy` |

### Environment Variables Required
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CONVEX_DEPLOY_URL
OPENROUTER_API_KEY
NEXT_PUBLIC_APP_URL
```

## Remember

- Read `.agent/plan/current-plan.md` before every action
- Read `PRD.md` for authoritative project requirements
- Use web search for external tool documentation
- Update memory files after completing tasks
- Trust the filesystem over internal recollection
