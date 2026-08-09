import {
  ArrowRightLeft,
  BedDouble,
  CalendarClock,
  ClipboardEdit,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  History,
  LogOut,
  Pill,
  Stethoscope,
  UserPlus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';

const activityConfig = {
  registered: { icon: UserPlus, tone: 'bg-sky-100 text-sky-600' },
  consultation: { icon: Stethoscope, tone: 'bg-blue-100 text-blue-600' },
  diagnosis: { icon: ClipboardList, tone: 'bg-violet-100 text-violet-600' },
  prescription: { icon: Pill, tone: 'bg-amber-100 text-amber-600' },
  lab: { icon: FlaskConical, tone: 'bg-purple-100 text-purple-600' },
  vitals: { icon: HeartPulse, tone: 'bg-rose-100 text-rose-600' },
  note: { icon: ClipboardEdit, tone: 'bg-slate-200 text-slate-600' },
  'follow-up': { icon: CalendarClock, tone: 'bg-emerald-100 text-emerald-600' },
  admitted: { icon: BedDouble, tone: 'bg-orange-100 text-orange-600' },
  discharged: { icon: LogOut, tone: 'bg-emerald-100 text-emerald-600' },
  transfer: { icon: ArrowRightLeft, tone: 'bg-orange-100 text-orange-600' },
};

function TimelineRow({ item }) {
  const { icon: Icon, tone } = activityConfig[item.type] ?? { icon: History, tone: 'bg-slate-200 text-slate-600' };
  return (
    <div className="flex items-start gap-3">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tone}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-900">{item.description}</p>
        <p className="text-xs text-slate-500">
          {item.date} · {item.time} · {item.performedBy}
        </p>
      </div>
    </div>
  );
}

export function PatientTimeline({ items = [] }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {items.length === 0 ? (
          <EmptyState
            icon={History}
            title="No recent activity"
            description="Activity will appear here as it happens."
            className="py-8"
          />
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <TimelineRow key={index} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
