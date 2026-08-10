import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { activityStatusMap } from '@/components/super-admin/statusMaps';

export function RecentActivityList({ activity, onViewDetails }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <div className="divide-y divide-slate-100">
        {activity.map((log) => (
          <div key={log.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-slate-900">
                <span className="font-medium">{log.userName}</span> · {log.action} — {log.resource}
              </p>
              <p className="text-xs text-slate-500">{log.hospitalName} · {log.timestamp}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge status={log.status} map={activityStatusMap} />
              <Button variant="ghost" size="sm" onClick={() => onViewDetails(log)}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
