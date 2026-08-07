import { Skeleton } from '@/components/ui/skeleton';

function InfoCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-5 shadow-sm">
      <Skeleton className="h-5 w-40" />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Skeleton className="size-20 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InfoCardSkeleton />
        <InfoCardSkeleton />
      </div>
      <InfoCardSkeleton />
    </div>
  );
}
