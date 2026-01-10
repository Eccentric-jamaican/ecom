# Current Plan - Sendcat Development

## Status: eBay Integration (Browse API first)

### Locked Decisions

- Marketplace: EBAY_US (launch target = Jamaica/Caribbean).
- No auctions (fixed-price only).
- Always use `itemAffiliateWebUrl` when available (EPN campaign ID confirmed).
- Use `X-EBAY-C-ENDUSERCTX` with `affiliateCampaignId` and `contextualLocation=country=JM`; test shipping estimates behavior.

### Phase 2 - eBay Integration (Browse API)

1. Shared contracts (packages/shared)
   - Define Product + SearchResult types and Zod schemas.
   - Add `api-clients/ebay/{client.ts,types.ts,parser.ts}` and export from `packages/shared`.
2. OAuth token service (server-only)
   - Client-credentials grant flow.
   - Token cache with expiry handling.
   - Env validation for eBay keys + EPN settings.
3. Browse API search + detail
   - `item_summary/search` for search results.
   - `getItem` for detail refresh / affiliate fallback.
   - Headers: `X-EBAY-C-MARKETPLACE-ID` + `X-EBAY-C-ENDUSERCTX` (affiliate + contextualLocation).
4. Affiliate link handling
   - Prefer `itemAffiliateWebUrl`.
   - Fallback to EPN tracking link builder for non-Browse sources.
5. Convex actions + caching
   - `products.search` action (returns validated results).
   - `products.getBySourceId` action.
   - Cache policy (ToS-aligned): item listing info ≤ 6 hours old; other eBay content ≤ 24 hours old; disclose staleness if older.
   - Search results cache: 10 minutes (UX-driven, within freshness limits).
6. UI wiring (web + mobile)
   - Search -> carousels -> product detail.
   - Affiliate badge + disclosure on product pages (per PRD).
7. Background processing split
   - Inngest: AI agent calls only.
   - Convex: eBay API calls (actions) + scheduled refresh (scheduled functions / cron).
   - Workpool deferred; add only if throughput/concurrency demands it.
8. Observability
   - Structured logs for eBay calls + rate limits.
   - Error tracking around eBay API failures.

### Open Items

- Confirm production access timeline (Browse API + EPN).
- Verify contextualLocation shipping estimate accuracy for `country=JM`.
