"use client";

import Image from "next/image";
import Link from "next/link";
import { useAction } from "convex/react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { api } from "@sendcat/convex";
import type { ProductListing } from "@sendcat/shared";
import { Skeleton } from "@/components/ui/skeleton";

type ListingFilter = "all" | "buyItNow" | "bestOffer" | "auction";

type CategoryResultsProps = {
  title: string;
  query: string;
  queryParam?: string;
  categoryId?: string;
  basePath: string;
  filterType: ListingFilter;
  filter?: string;
};

const pillBase = "px-3 py-1.5 rounded-full border text-xs font-semibold";
const pillActive = "bg-primary text-white border-primary";
const pillInactive =
  "border-slate-200 dark:border-[#333] text-muted-foreground hover:text-primary";
const pillDisabled =
  "border-amber-300 text-amber-600 bg-amber-50/40 dark:bg-amber-500/10 cursor-not-allowed";

export function CategoryResults({
  title,
  query,
  queryParam,
  categoryId,
  basePath,
  filterType,
  filter,
}: CategoryResultsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useAction(api.products.search);
  const [items, setItems] = useState<ProductListing[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slugFromPath = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length >= 2 ? segments[1] : undefined;
  }, [pathname]);

  const nodeFromPath = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length >= 3 ? segments[2] : undefined;
  }, [pathname]);

  const effectiveTitle = useMemo(() => {
    if (!slugFromPath) return title;
    return slugFromPath
      .split("-")
      .map((segment) =>
        segment ? `${segment[0].toUpperCase()}${segment.slice(1)}` : segment,
      )
      .join(" ");
  }, [slugFromPath, title]);

  const effectiveQueryParam =
    searchParams.get("q") ?? queryParam ?? "";
  const effectiveCategoryId =
    searchParams.get("categoryId") ?? categoryId;
  const effectiveQuery =
    effectiveQueryParam || (slugFromPath ? slugFromPath.replace(/-/g, " ") : query);
  const effectiveBasePath =
    slugFromPath && nodeFromPath ? `/b/${slugFromPath}/${nodeFromPath}` : basePath;

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    search({ query: effectiveQuery, limit: 24, filter, categoryId: effectiveCategoryId })
      .then((result) => {
        if (!active) return;
        setItems(result.products);
        setTotalCount(result.totalCount);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load listings");
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [search, effectiveQuery, filter, effectiveCategoryId]);

  const formatPrice = (value: number, currency?: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency ?? "USD",
      maximumFractionDigits: 2,
    }).format(value);

  const listingSubtitle = useMemo(() => {
    switch (filterType) {
      case "bestOffer":
        return "Best Offer";
      case "buyItNow":
        return "Buy It Now";
      case "auction":
        return "Auction (not available yet)";
      default:
        return "All Listings";
    }
  }, [filterType]);

  const baseParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (effectiveQueryParam) params.q = effectiveQueryParam;
    if (effectiveCategoryId) params.categoryId = effectiveCategoryId;
    return params;
  }, [effectiveQueryParam, effectiveCategoryId]);

  const buildFilterHref = (params: Record<string, string>) => {
    const urlSearchParams = new URLSearchParams({ ...baseParams, ...params });
    const queryString = urlSearchParams.toString();
    return queryString ? `${effectiveBasePath}?${queryString}` : effectiveBasePath;
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/?category=all" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-[#181411] dark:text-white font-medium">{effectiveTitle}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#181411] dark:text-white">
              {effectiveTitle}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {totalCount ? `${totalCount.toLocaleString()} results` : "Live listings"}
              {effectiveQuery ? ` for “${effectiveQuery}”` : ""}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{listingSubtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <Link
              href={buildFilterHref({ mag: "1" })}
              className={`${pillBase} ${filterType === "all" ? pillActive : pillInactive}`}
            >
              All Listings
            </Link>
            <Link
              href={buildFilterHref({ LH_BIN: "1", mag: "1", rt: "nc" })}
              className={`${pillBase} ${filterType === "buyItNow" ? pillActive : pillInactive}`}
            >
              Buy It Now
            </Link>
            <Link
              href={buildFilterHref({ LH_BO: "1", mag: "1", rt: "nc" })}
              className={`${pillBase} ${filterType === "bestOffer" ? pillActive : pillInactive}`}
            >
              Best Offer
            </Link>
            <span
              className={`${pillBase} ${filterType === "auction" ? pillActive : pillDisabled}`}
            >
              Auction
            </span>
          </div>
        </div>

        {filterType === "auction" ? (
          <p className="text-sm text-amber-600">
            Auctions aren’t supported yet. Showing fixed-price results instead.
          </p>
        ) : null}

        {error ? (
          <p className="text-sm text-red-600 font-medium">Unable to load live listings.</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex flex-col rounded-xl overflow-hidden border border-slate-100 dark:border-[#333] bg-white dark:bg-[#1a1a1a]"
            >
              <Skeleton className="aspect-square w-full rounded-none" />
              <div className="p-4 flex flex-col gap-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-[#333] bg-white/60 dark:bg-[#1a1a1a] px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-[#181411] dark:text-white">
              No results found
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try broadening your search or clearing filters.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
              <Link
                href={buildFilterHref({ mag: "1" })}
                className="rounded-full border border-slate-200 dark:border-[#333] px-4 py-2 text-muted-foreground hover:text-primary"
              >
                Clear filters
              </Link>
              <Link
                href={effectiveBasePath}
                className="rounded-full bg-primary px-4 py-2 text-white"
              >
                Browse all
              </Link>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-[#333]"
            >
              <Link
                href={`/products/${item.id}`}
                className="relative aspect-square overflow-hidden bg-slate-100"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <Link
                  href={`/products/${item.id}`}
                  className="text-base font-semibold text-[#181411] dark:text-white line-clamp-2 hover:underline"
                >
                  {item.title}
                </Link>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                  {item.condition ? <span>{item.condition}</span> : null}
                  {item.seller?.name ? <span>· {item.seller.name}</span> : null}
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-primary font-bold">
                    {formatPrice(item.price.value, item.price.currency)}
                  </span>
                  <span className="text-xs text-amber-600 font-semibold">eBay</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
