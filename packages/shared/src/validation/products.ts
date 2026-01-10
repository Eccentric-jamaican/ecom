import { z } from "zod";

export const MoneySchema = z.object({
  value: z.number().positive(),
  currency: z.string().min(3).max(3),
});

export const SellerInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.coerce.number(),
});

export const ProductListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: MoneySchema,
  imageUrl: z.string().url(),
  condition: z.string().optional(),
  affiliateUrl: z.string().url(),
  itemUrl: z.string().url(),
  source: z.literal("ebay"),
  seller: SellerInfoSchema.optional(),
});

export const ProductSearchResultSchema = z.object({
  category: z.string(),
  products: z.array(ProductListingSchema),
  totalCount: z.number().int().nonnegative(),
});
