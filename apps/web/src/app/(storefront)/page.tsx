import {
  Hero,
  CategoryGrid,
  FeaturedProducts,
  PromoBanner,
  AIPromptHero,
} from "@/components/features/storefront";

export default function StorefrontPage() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-20">
      <AIPromptHero />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
    </main>
  );
}
