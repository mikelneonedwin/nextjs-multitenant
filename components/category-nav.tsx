"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/hooks/use-get-categories";

export function CategoryNav({
  domain,
  selectedCategory,
}: {
  domain: string;
  selectedCategory?: string;
}) {
  const { data: categories, isLoading } = useGetCategories(domain);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      startTransition(() => {
        router.push(`/?category=${categoryId}`);
      });
    },
    [router],
  );

  const handleClearFilter = useCallback(() => {
    startTransition(() => {
      router.push(`/`);
    });
  }, [router]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Categories</h2>
      <div className="space-y-2">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          className="w-full justify-start"
          onClick={handleClearFilter}
          disabled={isPending}
        >
          All Products
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleCategoryClick(category.id)}
            disabled={isPending}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
