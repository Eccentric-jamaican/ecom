import {
  buildEpnTrackingUrl,
  type EpnTrackingParams,
  type EbayClientConfig,
} from "@sendcat/shared";

const EBAY_OAUTH_SCOPE = "https://api.ebay.com/oauth/api_scope";
const DEFAULT_MARKETPLACE_ID = "EBAY_US";
const DEFAULT_CONTEXT_COUNTRY = "JM";

const tokenCache: { token: string; expiresAt: number } = {
  token: "",
  expiresAt: 0,
};

const base64Encode = (value: string) => {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf-8").toString("base64");
  }
  throw new Error("No base64 encoder available in this runtime");
};

const requiredEnv = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

const getEbayEnv = () => (process.env.EBAY_ENV ?? "sandbox").toLowerCase();

const getEbayBaseUrl = () =>
  getEbayEnv() === "production"
    ? "https://api.ebay.com"
    : "https://api.sandbox.ebay.com";

const getEbayTokenUrl = () =>
  `${getEbayBaseUrl()}/identity/v1/oauth2/token`;

export const getEbayEndUserContext = () => {
  const affiliateCampaignId = requiredEnv("EBAY_AFFILIATE_CAMPAIGN_ID");
  const affiliateReferenceId =
    process.env.EBAY_AFFILIATE_REFERENCE_ID ?? "sendcat";
  const contextualCountry =
    process.env.EBAY_CONTEXTUAL_COUNTRY ?? DEFAULT_CONTEXT_COUNTRY;

  const contextualLocation = encodeURIComponent(
    `country=${contextualCountry}`,
  );
  const parts = [
    `affiliateCampaignId=${affiliateCampaignId}`,
    `affiliateReferenceId=${affiliateReferenceId}`,
    `contextualLocation=${contextualLocation}`,
  ];

  return parts.join(",");
};

export const getEbayAccessToken = async () => {
  const now = Date.now();
  if (tokenCache.token && tokenCache.expiresAt - now > 60_000) {
    return tokenCache.token;
  }

  const clientId = requiredEnv("EBAY_CLIENT_ID");
  const clientSecret = requiredEnv("EBAY_CLIENT_SECRET");
  const basicAuth = base64Encode(`${clientId}:${clientSecret}`);

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    scope: EBAY_OAUTH_SCOPE,
  });

  const response = await fetch(getEbayTokenUrl(), {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`eBay token request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  tokenCache.token = payload.access_token;
  tokenCache.expiresAt = now + payload.expires_in * 1000;

  return tokenCache.token;
};

export const getEbayClientConfig = (
  accessToken: string,
  overrides?: Partial<EbayClientConfig>,
): EbayClientConfig => {
  return {
    baseUrl: getEbayBaseUrl(),
    accessToken,
    marketplaceId: process.env.EBAY_MARKETPLACE_ID ?? DEFAULT_MARKETPLACE_ID,
    endUserContext: getEbayEndUserContext(),
    ...overrides,
  };
};

export const getEpnTrackingParams = (): EpnTrackingParams | null => {
  const campaignId = process.env.EBAY_AFFILIATE_CAMPAIGN_ID;
  const toolId = process.env.EBAY_EPN_TOOL_ID;
  const rotationId = process.env.EBAY_EPN_ROTATION_ID;

  if (!campaignId || !toolId || !rotationId) {
    return null;
  }

  return {
    campaignId,
    toolId,
    rotationId,
    customId: process.env.EBAY_EPN_CUSTOM_ID,
    eventId: process.env.EBAY_EPN_EVENT_ID,
    channelId: process.env.EBAY_EPN_CHANNEL_ID,
  };
};

export const buildFallbackAffiliateUrl = (
  itemWebUrl?: string,
): string | null => {
  if (!itemWebUrl) return null;
  const params = getEpnTrackingParams();
  if (!params) return itemWebUrl;
  return buildEpnTrackingUrl(itemWebUrl, params);
};
