import {
  Hero,
  CategoryGrid,
  FeaturedProducts,
  PromoBanner,
  AIPromptHero,
} from "@/components/features/storefront";

export default async function StorefrontPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const queryParam =
    typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : undefined;
  const categoryParam =
    typeof resolvedSearchParams?.category === "string"
      ? resolvedSearchParams.category
      : undefined;
  const normalizedCategory =
    categoryParam && categoryParam !== "all"
      ? categoryParam.replace(/-/g, " ")
      : undefined;
  const featuredQuery = queryParam?.trim() || normalizedCategory || "electronics";

  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-20">
      <AIPromptHero />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts query={featuredQuery} />
      <PromoBanner />
    </main>
  );
}
