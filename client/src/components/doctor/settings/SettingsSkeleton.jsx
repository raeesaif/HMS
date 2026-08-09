import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

function CardSkeleton({ rows = 3 }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="px-5 py-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-60" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-52" />
              </div>
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function NotificationSettingsSkeleton() {
  return <CardSkeleton rows={5} />;
}

export function SecuritySettingsSkeleton() {
  return (
    <div className="space-y-4">
      <CardSkeleton rows={2} />
      <CardSkeleton rows={2} />
    </div>
  );
}

export function ActiveSessionsSkeleton() {
  return <CardSkeleton rows={3} />;
}

export function LoginActivitySkeleton() {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="space-y-3 px-5 py-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

export function AppearanceSettingsSkeleton() {
  return <CardSkeleton rows={4} />;
}

export function GeneralPreferencesSkeleton() {
  return <CardSkeleton rows={5} />;
}
