import { Activity, CalendarCheck2, FileText, FlaskConical, Pill, Receipt } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';

const typeIconMap = {
  appointment: CalendarCheck2,
  prescription: Pill,
  lab: FlaskConical,
  record: FileText,
  payment: Receipt,
};

export function ActivityTimeline({ activity = [] }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Health Activity Timeline</CardTitle>
      </CardHeader>
      {activity.length === 0 ? (
        <EmptyState icon={Activity} title="No recent activity" />
      ) : (
        <div className="divide-y divide-slate-100">
          {activity.map((entry) => {
            const Icon = typeIconMap[entry.type] ?? Activity;
            return (
              <div key={entry.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Icon className="size-4" />
                </span>
                <p className="min-w-0 flex-1 text-sm text-slate-900">{entry.description}</p>
                <p className="shrink-0 text-xs text-slate-400">{entry.timestamp}</p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
