import { CategoryResults } from "@/components/features/storefront/CategoryResults";

type PageParams = { slug?: string; node?: string };
type PageSearchParams = {
  q?: string;
  LH_BIN?: string;
  LH_BO?: string;
  LH_Auction?: string;
  categoryId?: string;
};

type PageProps = {
  params?: Promise<PageParams>;
  searchParams?: Promise<PageSearchParams>;
};

type ListingFilter = "all" | "buyItNow" | "bestOffer" | "auction";

type FilterConfig = {
  filterType: ListingFilter;
  filter?: string;
};

const toTitleCase = (value: string) =>
  value
    .split("-")
    .map((segment) =>
      segment ? `${segment[0].toUpperCase()}${segment.slice(1)}` : segment,
    )
    .join(" ");

const getFilterConfig = (searchParams?: PageSearchParams): FilterConfig => {
  if (searchParams?.LH_Auction === "1") {
    return { filterType: "auction" };
  }

  if (searchParams?.LH_BO === "1") {
    return { filterType: "bestOffer", filter: "buyingOptions:{BEST_OFFER}" };
  }

  if (searchParams?.LH_BIN === "1") {
    return { filterType: "buyItNow", filter: "buyingOptions:{FIXED_PRICE}" };
  }

  return { filterType: "all" };
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams?.slug ?? "category";
  const title = toTitleCase(slug);
  const queryParam =
    typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim() : "";
  const query = queryParam || slug.replace(/-/g, " ");
  const categoryId =
    typeof resolvedSearchParams?.categoryId === "string"
      ? resolvedSearchParams.categoryId
      : undefined;
  const { filterType, filter } = getFilterConfig(resolvedSearchParams);
  const node = resolvedParams?.node ?? "bn";
  const basePath = `/b/${slug}/${node}`;

  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-20">
      <CategoryResults
        title={title}
        query={query}
        queryParam={queryParam || undefined}
        categoryId={categoryId}
        basePath={basePath}
        filterType={filterType}
        filter={filter}
      />
    </main>
  );
}
