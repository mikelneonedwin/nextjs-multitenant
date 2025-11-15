"use client";

import { useGetProducts } from "@/hooks/use-get-products";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "./skeletons/product-grid-skeleton";

export function ProductGrid({
  domain,
  categorySlug,
}: {
  domain: string;
  categorySlug?: string;
}) {
  const { data: products, isLoading } = useGetProducts(domain, categorySlug);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
