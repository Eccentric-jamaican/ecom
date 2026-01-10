import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import {
  ProductSearchResultSchema,
  parseEbayItemSummary,
  searchEbayItems,
  getEbayItem,
} from "@sendcat/shared";
import {
  buildFallbackAffiliateUrl,
  getEbayAccessToken,
  getEbayClientConfig,
} from "./ebay";

const LISTING_TTL_MS = 6 * 60 * 60 * 1000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const upsertProducts = internalMutation({
  args: {
    products: v.array(
      v.object({
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
        seller: v.optional(
          v.object({
            id: v.string(),
            name: v.string(),
            rating: v.number(),
          }),
        ),
        affiliateUrl: v.string(),
        itemUrl: v.string(),
        status: v.union(
          v.literal("active"),
          v.literal("sold"),
          v.literal("ended"),
        ),
        cachedAt: v.number(),
        expiresAt: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    for (const product of args.products) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_external_id", (q) => q.eq("externalId", product.externalId))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, product);
      } else {
        await ctx.db.insert("products", product);
      }
    }
  },
});

export const search = action({
  args: {
    query: v.string(),
    category: v.optional(v.string()),
    categoryId: v.optional(v.string()),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    sort: v.optional(v.string()),
    filter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = clamp(args.limit ?? 20, 1, 100);
    const offset = clamp(args.offset ?? 0, 0, 10_000);
    const filter = args.filter ?? "buyingOptions:{FIXED_PRICE|BEST_OFFER}";

    const accessToken = await getEbayAccessToken();
    const config = getEbayClientConfig(accessToken);
    const response = await searchEbayItems(config, {
      query: args.query,
      limit,
      offset,
      sort: args.sort,
      filter,
      categoryIds: args.categoryId ? [args.categoryId] : undefined,
    });

    const now = Date.now();
    const expiresAt = now + LISTING_TTL_MS;

    const products = (response.itemSummaries ?? [])
      .map((item) => {
        const affiliateUrl =
          item.itemAffiliateWebUrl ?? buildFallbackAffiliateUrl(item.itemWebUrl);
        if (!affiliateUrl) return null;
        return parseEbayItemSummary(item, affiliateUrl);
      })
      .filter(
        (item): item is NonNullable<ReturnType<typeof parseEbayItemSummary>> =>
          Boolean(item),
      );

    const result = ProductSearchResultSchema.parse({
      category: args.category ?? "all",
      products,
      totalCount: response.total ?? products.length,
    });

    await ctx.runMutation(internal.products.upsertProducts, {
      products: result.products.map((product) => ({
        externalId: product.id,
        title: product.title,
        description: undefined,
        imageUrl: product.imageUrl,
        images: undefined,
        price: product.price.value,
        currency: product.price.currency,
        condition: product.condition,
        category: args.category,
        brand: undefined,
        seller: product.seller,
        affiliateUrl: product.affiliateUrl,
        itemUrl: product.itemUrl,
        status: "active" as const,
        cachedAt: now,
        expiresAt,
      })),
    });

    return result;
  },
});

export const getItem = action({
  args: {
    itemId: v.string(),
  },
  handler: async (_ctx, args) => {
    const accessToken = await getEbayAccessToken();
    const config = getEbayClientConfig(accessToken);
    const response = await getEbayItem(config, args.itemId);

    const affiliateUrl =
      response.itemAffiliateWebUrl ?? buildFallbackAffiliateUrl(response.itemWebUrl);
    if (!affiliateUrl) {
      throw new Error("Missing affiliate URL for item");
    }

    const parsed = parseEbayItemSummary(response, affiliateUrl);
    if (!parsed) {
      throw new Error("Unable to parse eBay item response");
    }

    return parsed;
  },
});
