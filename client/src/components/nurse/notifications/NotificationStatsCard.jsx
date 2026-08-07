import { Card, CardContent } from '@/components/ui/card';

const toneStyles = {
  blue: 'bg-sky-100 text-sky-600',
  green: 'bg-emerald-100 text-emerald-500',
  amber: 'bg-amber-100 text-amber-500',
  red: 'bg-rose-100 text-rose-500',
};

export function NotificationStatsCard({ icon: Icon, tone = 'blue', title, count, description }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-5 shadow-sm">
      <CardContent className="px-5">
        <div className={`mb-4 flex size-10 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
          <Icon className="size-5" />
        </div>
        <p className="text-2xl font-bold tracking-tight text-slate-900">{count}</p>
        <p className="mt-0.5 text-xs text-slate-500">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}
