"use client";

import { useEffect, useState } from "react";
import {
  getProductsByClass,
  getProductsByCategory,
  getProductClassBySlug,
} from "@/actions";
import type { AppProduct } from "@/types";

export function useGetProducts(domain: string, categoryId?: string) {
  const [data, setData] = useState<AppProduct[] | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        const productClass = await getProductClassBySlug(domain);
        if (!productClass) {
          throw new Error("Product class not found");
        }

        let products;
        if (categoryId) {
          products = await getProductsByCategory(categoryId);
        } else {
          products = await getProductsByClass(productClass.id);
        }

        if (mounted) {
          setData(products);
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

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [domain, categoryId]);

  return { data, error, isLoading };
}
