import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const vUserPreferences = v.object({
  preferredBrands: v.optional(v.array(v.string())),
  sizeRanges: v.optional(v.array(v.string())),
  priceMin: v.optional(v.number()),
  priceMax: v.optional(v.number()),
});

const vSeller = v.object({
  id: v.string(),
  name: v.string(),
  rating: v.number(),
});

const vProductCore = v.object({
  externalId: v.string(),
  title: v.string(),
  description: v.optional(v.string()),
  imageUrl: v.string(),
  images: v.optional(v.array(v.string())),
  price: v.number(),
  currency: v.string(),
  condition: v.optional(v.string()),
  category: v.optional(v.string()),
  brand: v.optional(v.string()),
  seller: v.optional(vSeller),
  affiliateUrl: v.string(),
  itemUrl: v.string(),
  status: v.union(v.literal("active"), v.literal("sold"), v.literal("ended")),
});

const vResultBlock = v.object({
  category: v.string(),
  products: v.array(vProductCore),
  totalCount: v.number(),
});

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    subscriptionTier: v.union(v.literal("free"), v.literal("premium")),
    preferences: v.optional(vUserPreferences),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  }).index("by_clerk", ["clerkId"]),

  savedItems: defineTable({
    userId: v.id("users"),
    productId: v.string(),
    productData: v.object({
      externalId: v.string(),
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
    agentType: v.optional(
      v.union(
        v.literal("supervisor"),
        v.literal("search"),
        v.literal("price"),
        v.literal("sourcing"),
        v.literal("recommendation"),
      ),
    ),
    tokensUsed: v.optional(v.number()),
    timestamp: v.number(),
    results: v.optional(v.array(vResultBlock)),
  }).index("by_session", ["sessionId"]),

  sourcingRequests: defineTable({
    userId: v.id("users"),
    sessionId: v.optional(v.id("chatSessions")),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    originalRequest: v.string(),
    parsedQuery: v.optional(
      v.object({
        categories: v.array(
          v.object({
            name: v.string(),
            filters: v.optional(v.record(v.string(), v.any())),
          }),
        ),
      }),
    ),
    results: v.optional(v.array(vResultBlock)),
    progress: v.optional(v.number()),
    createdAt: v.number(),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    error: v.optional(v.string()),
    inngestRunId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"]),

  products: defineTable({
    externalId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    images: v.optional(v.array(v.string())),
    price: v.number(),
    currency: v.string(),
    condition: v.optional(v.string()),
    category: v.optional(v.string()),
    brand: v.optional(v.string()),
    seller: v.optional(vSeller),
    affiliateUrl: v.string(),
    itemUrl: v.string(),
    status: v.union(v.literal("active"), v.literal("sold"), v.literal("ended")),
    cachedAt: v.number(),
    expiresAt: v.number(),
  })
    .index("by_external_id", ["externalId"])
    .index("by_category", ["category"])
    .index("by_status", ["status"]),

  affiliateClicks: defineTable({
    userId: v.optional(v.id("users")),
    productId: v.string(),
    affiliateUrl: v.string(),
    source: v.union(v.literal("search"), v.literal("chat"), v.literal("saved")),
    clickedAt: v.number(),
    sessionId: v.optional(v.string()),
    metadata: v.optional(
      v.object({
        query: v.optional(v.string()),
        category: v.optional(v.string()),
      }),
    ),
  })
    .index("by_user", ["userId"])
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
      v.literal("rejected"),
    ),
    clickTimestamp: v.number(),
    saleTimestamp: v.number(),
    commissionTimestamp: v.optional(v.number()),
    ebayOrderId: v.optional(v.string()),
  })
    .index("by_click_id", ["clickId"])
    .index("by_status", ["status"])
    .index("by_user", ["userId"]),

  priceHistory: defineTable({
    productId: v.string(),
    price: v.number(),
    timestamp: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_product_timestamp", ["productId", "timestamp"]),

  analyticsEvents: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.optional(v.string()),
    eventType: v.string(),
    properties: v.optional(v.record(v.string(), v.any())),
    timestamp: v.number(),
    platform: v.union(v.literal("web"), v.literal("mobile")),
  })
    .index("by_user", ["userId"])
    .index("by_event_type", ["eventType"])
    .index("by_timestamp", ["timestamp"]),
});
