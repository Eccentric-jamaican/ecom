import { v } from "convex/values";
import { action, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import {
  ProductSearchResultSchema,
  type ProductListing,
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

export const getCachedProduct = internalQuery({
  args: {
    externalId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("products")
      .withIndex("by_external_id", (q) => q.eq("externalId", args.externalId))
      .first();
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
        const fallbackUrl = affiliateUrl ?? item.itemWebUrl;

        if (!affiliateUrl && item.itemWebUrl) {
          console.warn("Missing affiliate URL, falling back to itemWebUrl", {
            itemId: item.itemId,
          });
        }

        if (!fallbackUrl) return null;
        return parseEbayItemSummary(item, fallbackUrl);
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
  handler: async (ctx, args): Promise<ProductListing> => {
    const now = Date.now();
    const cached: Doc<"products"> | null = await ctx.runQuery(
      internal.products.getCachedProduct,
      {
        externalId: args.itemId,
      },
    );

    if (cached && cached.expiresAt > now) {
      return {
        id: cached.externalId,
        title: cached.title,
        price: { value: cached.price, currency: cached.currency },
        imageUrl: cached.imageUrl,
        condition: cached.condition,
        affiliateUrl: cached.affiliateUrl,
        itemUrl: cached.itemUrl,
        source: "ebay" as const,
        seller: cached.seller ?? undefined,
      };
    }

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

    const refreshedAt = Date.now();
    await ctx.runMutation(internal.products.upsertProducts, {
      products: [
        {
          externalId: parsed.id,
          title: parsed.title,
          description: undefined,
          imageUrl: parsed.imageUrl,
          images: undefined,
          price: parsed.price.value,
          currency: parsed.price.currency,
          condition: parsed.condition,
          category: undefined,
          brand: undefined,
          seller: parsed.seller,
          affiliateUrl: parsed.affiliateUrl,
          itemUrl: parsed.itemUrl,
          status: "active" as const,
          cachedAt: refreshedAt,
          expiresAt: refreshedAt + LISTING_TTL_MS,
        },
      ],
    });

    return parsed;
  },
});
