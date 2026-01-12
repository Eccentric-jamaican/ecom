import type { EbayGetItemResponse, EbaySearchResponse } from "./types";

export interface EbayClientConfig {
  baseUrl: string;
  accessToken: string;
  marketplaceId: string;
  endUserContext?: string;
}

export interface EbaySearchParams {
  query: string;
  limit?: number;
  offset?: number;
  sort?: string;
  filter?: string;
  categoryIds?: string[];
}

const buildHeaders = (config: EbayClientConfig) => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.accessToken}`,
    "X-EBAY-C-MARKETPLACE-ID": config.marketplaceId,
  };

  if (config.endUserContext) {
    headers["X-EBAY-C-ENDUSERCTX"] = config.endUserContext;
  }

  return headers;
};

const fetchWithRetry = async (
  url: string,
  init: RequestInit,
  attempts = 3,
) => {
  let delay = 250;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (
        response.ok ||
        (response.status < 500 && response.status !== 429)
      ) {
        return response;
      }
    } catch {
      // Network error, retry below.
    }

    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  return fetch(url, init);
};

export async function searchEbayItems(
  config: EbayClientConfig,
  params: EbaySearchParams,
): Promise<EbaySearchResponse> {
  const url = new URL("/buy/browse/v1/item_summary/search", config.baseUrl);
  url.searchParams.set("q", params.query);
  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.offset) url.searchParams.set("offset", String(params.offset));
  if (params.sort) url.searchParams.set("sort", params.sort);
  if (params.filter) url.searchParams.set("filter", params.filter);
  if (params.categoryIds?.length) {
    url.searchParams.set("category_ids", params.categoryIds.join(","));
  }

  const response = await fetchWithRetry(url.toString(), {
    headers: buildHeaders(config),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`eBay search failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function getEbayItem(
  config: EbayClientConfig,
  itemId: string,
): Promise<EbayGetItemResponse> {
  const encodedItemId = encodeURIComponent(itemId);
  const url = new URL(`/buy/browse/v1/item/${encodedItemId}`, config.baseUrl);
  const response = await fetchWithRetry(url.toString(), {
    headers: buildHeaders(config),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`eBay getItem failed: ${response.status} ${errorText}`);
  }

  return response.json();
}
