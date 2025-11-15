import { Card } from "@/components/ui/card";

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-48 bg-muted animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-10 bg-muted animate-pulse rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}
