import { History } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';

export function ProfileActivityTimeline({ activity }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      {activity.length === 0 ? (
        <EmptyState icon={History} title="No activity yet" description="Profile activity will appear here." />
      ) : (
        <div className="divide-y divide-slate-100">
          {activity.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between px-5 py-3.5">
              <p className="text-sm text-slate-900">{entry.action}</p>
              <p className="text-xs text-slate-500">
                {entry.date} · {entry.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
