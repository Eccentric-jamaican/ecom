"use client";

import Image from "next/image";
import Link from "next/link";
import { useAction } from "convex/react";
import { useEffect, useMemo, useState } from "react";
import { api } from "@sendcat/convex";
import type { ProductListing } from "@sendcat/shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type DisplayProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency?: string;
  originalPrice?: number | null;
  image: string;
  desc: string;
  badge?: string | null;
  badgeColor?: string;
};

const FALLBACK_PRODUCTS: DisplayProduct[] = [
  {
    id: "fallback-1",
    slug: 'vintage-leather-backpack',
    name: 'Vintage Leather Backpack',
    price: 120.00,
    originalPrice: 150.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgc1FXDXWQ7ZOayixs7ukCsQCeKrRt1rV5H9P_NSniPqKBMpDT53oWIFx84q-fMkW5GFseDjoiK_5bSh5ZtxDQuIppIhfrC1XxUHaf5aKg-qE-KAEdPR4ZjMtO_YH-38YgfsikPi128znpYev-m7fjaXvhDYbTFIwlRRiHodK1MUR7hywmzSBDb-gqPPdJ6XYC1UrNZ5osZflggF5ayEqU1OwemvXlyFnNkEVFUuuEvlo3LluhG7ujc9AaIR3g1nHIxSFo_3QOu9M',
    desc: 'Durable, stylish, and perfect for your daily commute.',
    badge: '-20%',
    badgeColor: 'bg-red-500'
  },
  { 
    id: "fallback-2",
    slug: 'noise-cancelling-headphones',
    name: 'Noise Cancelling Headphones', 
    price: 299.00, 
    originalPrice: null, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJpshi0lHYedTDwdHN_PDQdv27nMjoy0FD9c0PnkwW7fKTEDo8xXL_Is97rWCqUvBzKfPsiF9l5t06roUM3d7obwi8nJn058EaLPEFX1yU8qXpIp0Exh_SK4pvqaCVHXATfwl_Nc8E8KDQIx3n_tWTbIKltjAZOOOIuDpl3blovImSVMop6rT4jFpme6xcGNgbJwc3J8Umve8h565zAbbQ5WJ1FHEHmLNnc9KwE65VDLe0w3-IX47cl3s3wGau3s4ajm40DlzAkQA',
    desc: 'Immersive sound quality with 30-hour battery life.',
    badge: 'New',
    badgeColor: 'bg-blue-500'
  },
  { 
    id: "fallback-3",
    slug: 'minimalist-white-sneakers',
    name: 'Minimalist White Sneakers',
    price: 89.99, 
    originalPrice: null, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTglLKGflT1fLgIhxgQW98DHpFJL2dloOmy99HVEsy2mY9EG0Ud0k0pVCryXXdY3uD9MVbynzZHgiz4HfHWqLs-nmWUW7_ze4Pf0SJYCOldOS2Fs6ISwf-BRu0OY0U4fNl-tQQZP7A4SkfyX6if9tmqeEtZW8islYG1b65gnGHrOr3jEdqZfW1QnRT1IYgUqBgzw4jluNEjGzRaG4bBIJSRXz0TI8pBBsNbSC0R9OpZ_FE5_eayKZ1D6Cjulhq1nx3N30r63suqXM',
    desc: 'Clean design, maximum comfort for everyday wear.',
    badge: null
  },
  {
    id: "fallback-4",
    slug: 'series-7-smart-watch',
    name: 'Series 7 Smart Watch',
    price: 399.00, 
    originalPrice: null, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZxbUJLugxEjpsWGlZERJPsZzU5GCXO4xuEaUOgdsZh1lHaTH_4W22kXuGpIYtqLosUJzsMJ9PRhSwymxjEsjBmzwCSLSV-paejPpHeueBhlKaEiPwTtoHiRD4IregJXZq06TkccEVnW-qfakiaMyz5feddAdXhblGm2L8GrgSdDzoQ5L9O5M9_UhdDCsafJH_r_ISJVEAvLfTFVdNhn2EcCTQf4KQyNRmAbJgeT4fLhOi5C1TTIZNBHQY-nvQXwl1synqKfrb2ds',
    desc: 'Stay connected and healthy with advanced tracking.',
    badge: null
  }
];

export function FeaturedProducts({ query }: { query?: string }) {
  const searchQuery = query?.trim() ? query.trim() : "electronics";
  const search = useAction(api.products.search);
  const [items, setItems] = useState<ProductListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    search({ query: searchQuery, limit: 8 })
      .then((result) => {
        if (!active) return;
        setItems(result.products);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load items");
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [search, searchQuery]);

  const displayProducts = useMemo<DisplayProduct[]>(() => {
    if (!items.length) return FALLBACK_PRODUCTS;
    return items.map((item) => ({
      id: item.id,
      slug: item.id,
      name: item.title,
      price: item.price.value,
      currency: item.price.currency,
      originalPrice: null,
      image: item.imageUrl,
      desc: item.condition ? `Condition: ${item.condition}` : "View details on eBay.",
      badge: "eBay",
      badgeColor: "bg-amber-500",
    }));
  }, [items]);

  const formatPrice = (value: number, currency?: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency ?? "USD",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <h2 className="text-h2 font-semibold leading-tight text-[#181411] dark:text-white">Featured Products</h2>
          <p className="text-body leading-relaxed text-muted-foreground mt-1">Handpicked items just for you</p>
        </div>

        {error ? (
          <span className="text-sm text-red-600 font-medium">Unable to load live items.</span>
        ) : isLoading ? (
          <span className="text-sm text-muted-foreground">Loading “{searchQuery}” results…</span>
        ) : null}
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold whitespace-nowrap">All Items</button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-[#333] text-gray-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-[#444] rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">Best Sellers</button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-[#333] text-gray-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-[#444] rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">New Arrivals</button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-[#333] text-gray-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-[#444] rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">On Sale</button>
        </div>
      </div>

      {/* Mobile Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full md:hidden"
      >
        <CarouselContent className="-ml-4">
          {displayProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-4 basis-1/2 sm:basis-1/3">
              <div className="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-[#333]">
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={80}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.badge && (
                        <span className={`${product.badgeColor || 'bg-blue-500'} text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/products/${product.slug}`} className="text-h3 font-medium text-[#181411] dark:text-white truncate hover:underline">
                    {product.name}
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice, product.currency)}</span>
                      )}
                      <span className="text-primary font-bold text-sm md:text-base">{formatPrice(product.price, product.currency)}</span>
                    </div>
                    <button className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-colors" type="button">
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {displayProducts.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-[#333]">
            <div className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-slate-100">
              <Link href={`/products/${product.slug}`} className="block h-full w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={80}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <button
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/60 rounded-full text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                type="button"
                aria-label="Save item"
              >
                <span className="material-symbols-outlined text-lg">favorite</span>
              </button>
              {product.badge && (
                <span className={`absolute top-3 left-3 ${product.badgeColor || 'bg-blue-500'} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <Link href={`/products/${product.slug}`} className="text-h3 font-medium text-[#181411] dark:text-white truncate hover:underline">
                {product.name}
              </Link>
              <p className="text-sm-fluid text-muted-foreground mt-1 mb-3 line-clamp-2">{product.desc}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  {product.originalPrice && (
                    <span className="text-sm-fluid text-muted-foreground line-through">{formatPrice(product.originalPrice, product.currency)}</span>
                  )}
                  <span className="text-primary font-bold text-fluid-price">{formatPrice(product.price, product.currency)}</span>
                </div>
                <button className="p-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-colors" type="button">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="border border-slate-300 dark:border-[#444] text-[#181411] dark:text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-100 dark:hover:bg-[#333] transition-colors">
          Load More Products
        </button>
      </div>
    </section>
  );
}
