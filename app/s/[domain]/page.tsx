import { Suspense } from "react";
import { ProductGrid } from "@/components/product-grid";
import { CategoryNav } from "@/components/category-nav";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";
import { OtherClasses } from "@/components/other-classes";

type Props = {
  params: Promise<{
    domain: string;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function StorePage({ params, searchParams }: Props) {
  const { domain } = await params;
  const { category } = await searchParams;
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Shop</h1>
        <p className="text-muted-foreground">Browse our collection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Suspense
            fallback={
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-muted rounded animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <CategoryNav domain={domain} selectedCategory={category} />
          </Suspense>
          <OtherClasses domain={domain} />
        </aside>

        {/* Products */}
        <div className="lg:col-span-3">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid domain={domain} categorySlug={category} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
