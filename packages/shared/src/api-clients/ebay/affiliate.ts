export interface EpnTrackingParams {
  campaignId: string;
  toolId: string;
  rotationId: string;
  customId?: string;
  eventId?: string;
  channelId?: string;
}

export function buildEpnTrackingUrl(
  targetUrl: string,
  params: EpnTrackingParams,
): string {
  const url = new URL("https://rover.ebay.com/rover/1/711-53200-19255-0/1");
  url.searchParams.set("mkevt", params.eventId ?? "1");
  url.searchParams.set("mkcid", params.channelId ?? "1");
  url.searchParams.set("mkrid", params.rotationId);
  url.searchParams.set("campid", params.campaignId);
  url.searchParams.set("toolid", params.toolId);
  if (params.customId) {
    url.searchParams.set("customid", params.customId);
  }
  url.searchParams.set("mpre", targetUrl);
  return url.toString();
}
