"use client";

import { useEffect, useState } from "react";
import { getCategoriesByClass, getProductClassBySlug } from "@/actions";
import type { Category } from "@/generated/prisma";

export function useGetCategories(domain: string) {
  const [data, setData] = useState<Category[] | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchCategories() {
      try {
        setIsLoading(true);
        const productClass = await getProductClassBySlug(domain);
        if (!productClass) {
          throw new Error("Product class not found");
        }
        const categories = await getCategoriesByClass(productClass.id);
        if (mounted) {
          setData(categories);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setData(undefined);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCategories();
    return () => {
      mounted = false;
    };
  }, [domain]);

  return { data, error, isLoading };
}
