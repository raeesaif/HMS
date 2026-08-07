import { CalendarClock, KeyRound, LogIn, UserPen } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';

const eventIcons = {
  login: LogIn,
  shift: CalendarClock,
  profile: UserPen,
  password: KeyRound,
};

function ActivityItem({ activity, isLast }) {
  const Icon = eventIcons[activity.icon] ?? UserPen;

  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && <span className="absolute top-8 left-4 h-full w-px bg-slate-200" aria-hidden="true" />}
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{activity.event}</p>
        <p className="text-xs text-slate-500">{activity.timestamp}</p>
        {activity.detail && <p className="mt-0.5 text-sm text-slate-600">{activity.detail}</p>}
      </div>
    </li>
  );
}

export function ActivityTimeline({ activity }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Activity Timeline</CardTitle>
      </CardHeader>
      <div className="px-5 py-5">
        {activity.length === 0 ? (
          <EmptyState icon={CalendarClock} title="No recent activity." />
        ) : (
          <ol className="space-y-0">
            {activity.map((item, index) => (
              <ActivityItem key={item.id} activity={item} isLast={index === activity.length - 1} />
            ))}
          </ol>
        )}
      </div>
    </Card>
  );
}
