import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function StatsRowSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="gap-0 rounded-xl border-border py-5 shadow-sm">
          <CardContent className="px-5">
            <Skeleton className="mb-4 size-10 rounded-xl" />
            <Skeleton className="h-7 w-14" />
            <Skeleton className="mt-2 h-3 w-28" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Skeleton className="h-10 w-full sm:w-64" />
      <Skeleton className="h-10 w-full sm:w-40" />
      <Skeleton className="h-10 w-full sm:w-44" />
      <Skeleton className="h-10 w-full sm:w-44" />
    </div>
  );
}

export function TableSkeleton({ rows = 6, cols = 8 }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, col) => (
            <Skeleton key={col} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="rounded-xl border-border shadow-sm">
          <CardContent className="space-y-3 p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-4 p-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-1.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
