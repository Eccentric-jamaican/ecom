export interface EbayMoney {
  value: string;
  currency: string;
}

export interface EbayImage {
  imageUrl: string;
}

export interface EbaySeller {
  username?: string;
  feedbackPercentage?: number;
  feedbackScore?: number;
}

export interface EbayShippingOption {
  shippingCost?: EbayMoney;
  shippingCostType?: string;
}

export interface EbayItemLocation {
  country?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
}

export interface EbayItemSummary {
  itemId: string;
  title: string;
  price?: EbayMoney;
  image?: EbayImage;
  itemWebUrl?: string;
  itemAffiliateWebUrl?: string;
  condition?: string;
  conditionId?: string;
  seller?: EbaySeller;
  shippingOptions?: EbayShippingOption[];
  itemLocation?: EbayItemLocation;
}

export interface EbaySearchResponse {
  href?: string;
  total?: number;
  itemSummaries?: EbayItemSummary[];
}

export interface EbayGetItemResponse extends EbayItemSummary {
  description?: string;
  shortDescription?: string;
  additionalImages?: EbayImage[];
}
