export type MarketplaceSource = "ebay";

export interface Money {
  value: number;
  currency: string;
}

export interface SellerInfo {
  id: string;
  name: string;
  rating: number;
}

export interface ProductListing {
  id: string;
  title: string;
  price: Money;
  imageUrl: string;
  condition?: string;
  affiliateUrl: string;
  itemUrl: string;
  source: MarketplaceSource;
  seller?: SellerInfo;
}

export interface ProductSearchResult {
  category: string;
  products: ProductListing[];
  totalCount: number;
}
