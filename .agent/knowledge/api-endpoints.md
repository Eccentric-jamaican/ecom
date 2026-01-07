# API Endpoints Reference

## eBay Browse API

### Search Items
```
GET https://api.ebay.com/buy/browse/v1/item_summary/search
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `limit` | number | No | Max results (default: 10, max: 100) |
| `offset` | number | No | Pagination offset |
| `filter` | string | No | Filters (price, condition, etc.) |
| `sort` | string | No | Sort order (price, relevance) |

**Example:**
```bash
curl -X GET "https://api.ebay.com/buy/browse/v1/item_summary/search?q=laptop&limit=20" \
  -H "Authorization: Bearer <access_token>"
```

**Rate Limit:** 50 requests/second

---

### Get Item Details
```
GET https://api.ebay.com/buy/browse/v1/items/{item_id}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `item_id` | string | Yes | eBay item ID |

---

## OpenRouter API

### Chat Completion
```
POST https://openrouter.ai/api/v1/chat/completions
```

**Headers:**
```
Authorization: Bearer <OPENROUTER_API_KEY>
Content-Type: application/json
HTTP-Referer: <NEXT_PUBLIC_APP_URL>
X-Title: Sendcat
```

**Body:**
```json
{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "..."},
    {"role": "user", "content": "..."}
  ],
  "max_tokens": 1000,
  "temperature": 0.7
}
```

---

## Convex Functions

### Queries (Read)

```typescript
// Get products by category
ctx.runQuery(api.products.getByCategory, { category, limit })

// Get product by ID
ctx.runQuery(api.products.getById, { id })

// Get chat history
ctx.runQuery(api.chat.getMessages, { sessionId })

// Get user profile
ctx.runQuery(api.users.getProfile)
```

### Mutations (Write)

```typescript
// Create chat session
ctx.runMutation(api.chat.createSession)

// Add message
ctx.runMutation(api.chat.addMessage, { sessionId, role, content })

// Create sourcing request
ctx.runMutation(api.sourcing.createRequest)

// Track analytics event
ctx.runMutation(api.analytics.trackEvent, { eventType, properties })
```

### Actions (Server-side logic)

```typescript
// AI chat completion
ctx.runAction(api.chat.complete, { messages })

// Search products
ctx.runAction(api.products.search, { query })

// Generate affiliate link
ctx.runAction(api.affiliate.generateLink, { productId })
```

---

## Clerk Authentication

### Sign In
```
POST https://api.clerk.com/v1/users/sign_in
```

### Get User
```
GET https://api.clerk.com/v1/users/{user_id}
```

**Headers:**
```
Authorization: Bearer <CLERK_SECRET_KEY>
```

---

## Inngest

### Send Event
```
POST https://api.inngest.com/e
```

**Headers:**
```
Authorization: Bearer <INNGEST_SIGNING_KEY>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "sourcing.request",
  "data": {
    "userId": "...",
    "query": "..."
  }
}
```

---

## Environment Variables

```bash
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CONVEX_DEPLOY_URL=https://...convex.cloud
OPENROUTER_API_KEY=sk-or-v1-...

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
SENTRY_DSN=https://...
AMPLITUDE_API_KEY=...
POSTHOG_API_KEY=...
FIRECRAWL_API_KEY=...
INNGEST_SIGNING_KEY=...
```

---

## Rate Limits

| Service | Limit | Window |
|---------|-------|--------|
| eBay Browse API | 50 | requests/second |
| OpenRouter | Varies by model | per minute |
| Convex | 100,000 | free tier/month |
| Clerk | 10,000 | requests/month (free) |
| Inngest | 100,000 | events/month (free) |

---

## External Documentation

**IMPORTANT:** Always use web search to get the most current API documentation:

- eBay: `eBay Browse API v1 documentation`
- OpenRouter: `OpenRouter API documentation`
- Convex: `Convex functions documentation`
- Clerk: `Clerk authentication documentation`
- Inngest: `Inngest Next.js documentation`
- Vercel AI SDK: `Vercel AI SDK chat completion documentation`

Search for official documentation before implementing any external API integration.
