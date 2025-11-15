"use client";

import { buttonVariants } from "@/components/ui/button";
import { useGetProductClasses } from "@/hooks/use-get-product-classes";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function OtherClasses({ domain }: { domain: string }) {
  const { data, isLoading } = useGetProductClasses(domain);
  const mainDomains = useMemo(() => {
    const domainParts = window.location.host.split(".");
    while (domainParts.length > 2) domainParts.shift();
    return domainParts.join(".");
  }, []);

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
    <div className="space-y-3 mt-4">
      <h2 className="font-semibold text-lg">Other Shops</h2>
      <div className="space-y-2">
        {data?.map((item) => (
          <a
            key={item.id}
            href={`${item.slug}.${mainDomains}`}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-full justify-start",
            )}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
