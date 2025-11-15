"use client";

import { useEffect, useState } from "react";
import { getAllProductClasses } from "@/actions";
import type { ProductClass } from "@/generated/prisma";

export function useGetProductClasses(domain: string) {
  const [data, setData] = useState<ProductClass[] | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProductClasses() {
      try {
        setIsLoading(true);

        const classes = await getAllProductClasses(domain);

        if (mounted) {
          setData(classes);
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

    fetchProductClasses();

    return () => {
      mounted = false;
    };
  }, [domain]);

  return { data, error, isLoading };
}
