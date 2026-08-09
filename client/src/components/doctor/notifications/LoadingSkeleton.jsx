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
      <Skeleton className="h-10 w-full sm:w-36" />
      <Skeleton className="h-10 w-full sm:w-36" />
      <Skeleton className="h-10 w-full sm:w-36" />
      <Skeleton className="h-10 w-full sm:w-40" />
    </div>
  );
}

export function NotificationListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
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
