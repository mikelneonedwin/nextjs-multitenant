"use client";

import { useEffect, useState } from "react";
import { getProductClassBySlug } from "@/actions";
import type { ProductClass } from "@/generated/prisma";

export function useGetProductClass(domain: string) {
  const [data, setData] = useState<ProductClass | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProductClass() {
      try {
        setIsLoading(true);

        const productClass = await getProductClassBySlug(domain);

        if (!productClass) {
          throw new Error("Product class not found");
        }

        if (mounted) {
          setData(productClass);
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

    fetchProductClass();

    return () => {
      mounted = false;
    };
  }, [domain]);

  return { data, error, isLoading };
}
