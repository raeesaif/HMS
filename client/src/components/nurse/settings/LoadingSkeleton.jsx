import { Skeleton } from '@/components/ui/skeleton';

function CardSkeleton({ rows = 3 }) {
  return (
    <div className="rounded-xl border border-border p-5 shadow-sm">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-2 h-3.5 w-64" />
      <div className="mt-5 space-y-4">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
