import type { ProductListing } from "../../types/product";
import type { EbayItemSummary } from "./types";

const toNumber = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export function parseEbayItemSummary(
  item: EbayItemSummary,
  affiliateUrl: string,
): ProductListing | null {
  const priceValue = toNumber(item.price?.value);
  const currency = item.price?.currency ?? "USD";
  const imageUrl = item.image?.imageUrl;

  if (priceValue === null || priceValue === undefined || !imageUrl) {
    return null;
  }

  const sellerName = item.seller?.username;
  const sellerRating = toNumber(item.seller?.feedbackPercentage);

  return {
    id: item.itemId,
    title: item.title,
    price: { value: priceValue, currency },
    imageUrl,
    condition: item.condition,
    affiliateUrl,
    itemUrl: item.itemWebUrl ?? affiliateUrl,
    source: "ebay",
    seller:
      sellerName && sellerRating !== null
        ? {
            id: sellerName,
            name: sellerName,
            rating: sellerRating,
          }
        : undefined,
  };
}
