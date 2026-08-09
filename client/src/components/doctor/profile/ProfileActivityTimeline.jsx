import { History, ImageIcon, KeyRound, LogIn, Phone, UserCog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';

const actionConfig = {
  'Login Activity': { icon: LogIn, tone: 'bg-sky-100 text-sky-600' },
  'Contact Information Updated': { icon: Phone, tone: 'bg-emerald-100 text-emerald-600' },
  'Password Changed': { icon: KeyRound, tone: 'bg-amber-100 text-amber-600' },
  'Profile Picture Updated': { icon: ImageIcon, tone: 'bg-violet-100 text-violet-600' },
  'Profile Updated': { icon: UserCog, tone: 'bg-slate-200 text-slate-600' },
};

function ActivityRow({ activity }) {
  const { icon: Icon, tone } = actionConfig[activity.action] ?? { icon: History, tone: 'bg-slate-200 text-slate-600' };
  return (
    <div className="flex items-start gap-3">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tone}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
        <p className="text-xs text-slate-500">
          {activity.date} · {activity.time} · {activity.performedBy}
        </p>
      </div>
    </div>
  );
}

export function ProfileActivityTimeline({ activity = [] }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Profile Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {activity.length === 0 ? (
          <EmptyState icon={History} title="No recent activity" description="Profile activity will appear here as it happens." />
        ) : (
          <div className="space-y-4">
            {activity.map((entry) => (
              <ActivityRow key={entry.id} activity={entry} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
