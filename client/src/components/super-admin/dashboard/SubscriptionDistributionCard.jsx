import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanBadge } from '@/components/super-admin/PlanBadge';

export function SubscriptionDistributionCard({ distribution }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Subscription Distribution</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Hospitals and revenue contribution by plan</p>
      </CardHeader>
      <div className="space-y-4 p-5">
        {distribution.map((entry) => (
          <div key={entry.plan}>
            <div className="mb-1.5 flex items-center justify-between">
              <PlanBadge plan={entry.plan} />
              <span className="text-xs text-slate-500">
                {entry.subscriberCount} hospitals · ${entry.revenue.toLocaleString()}/mo
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-sky-500" style={{ width: `${entry.percentage}%` }} />
            </div>
            <p className="mt-1 text-right text-xs text-slate-400">{entry.percentage}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
