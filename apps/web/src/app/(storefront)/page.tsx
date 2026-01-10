import {
  Hero,
  CategoryGrid,
  FeaturedProducts,
  PromoBanner,
  AIPromptHero,
} from "@/components/features/storefront";

export default function StorefrontPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  const queryParam =
    typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const categoryParam =
    typeof searchParams?.category === "string" ? searchParams.category : undefined;
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
