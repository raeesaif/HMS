import {
  ArrowRightLeft,
  ClipboardEdit,
  FlaskConical,
  HeartPulse,
  History,
  LogIn,
  Pill,
  UserPlus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';
import { TimelineSkeleton } from './LoadingSkeleton';

const activityConfig = {
  assigned: { icon: UserPlus, tone: 'bg-sky-100 text-sky-600' },
  'checked-in': { icon: LogIn, tone: 'bg-emerald-100 text-emerald-600' },
  lab: { icon: FlaskConical, tone: 'bg-violet-100 text-violet-600' },
  prescription: { icon: Pill, tone: 'bg-amber-100 text-amber-600' },
  vitals: { icon: HeartPulse, tone: 'bg-rose-100 text-rose-600' },
  note: { icon: ClipboardEdit, tone: 'bg-slate-200 text-slate-600' },
  transfer: { icon: ArrowRightLeft, tone: 'bg-orange-100 text-orange-600' },
};

function ActivityRow({ activity }) {
  const { icon: Icon, tone } = activityConfig[activity.type] ?? {
    icon: History,
    tone: 'bg-slate-200 text-slate-600',
  };
  return (
    <div className="flex items-start gap-3">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tone}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-900">
          {activity.description} — <span className="font-medium">{activity.patientName}</span>
        </p>
        <p className="text-xs text-slate-500">{activity.timestamp}</p>
      </div>
    </div>
  );
}

export function RecentPatientActivity({ activities = [], isLoading = false }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Recent Patient Activity</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Latest clinical activity across your patients</p>
      </CardHeader>
      <div className="px-5 py-5">
        {isLoading ? (
          <TimelineSkeleton count={5} />
        ) : activities.length === 0 ? (
          <EmptyState
            icon={History}
            title="No recent activity"
            description="Clinical activity will appear here as it happens."
          />
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
