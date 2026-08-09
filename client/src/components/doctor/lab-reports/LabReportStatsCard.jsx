import { Card, CardContent } from '@/components/ui/card';

const toneStyles = {
  blue: 'bg-sky-100 text-sky-600',
  violet: 'bg-violet-100 text-violet-600',
  orange: 'bg-orange-100 text-orange-500',
  green: 'bg-emerald-100 text-emerald-500',
};

export function LabReportStatsCard({ icon: Icon, tone = 'blue', title, value, description }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-5 shadow-sm">
      <CardContent className="px-5">
        <div className={`mb-4 flex size-10 items-center justify-center rounded-xl ${toneStyles[tone] ?? toneStyles.blue}`}>
          <Icon className="size-5" />
        </div>
        <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        <p className="mt-1 text-sm font-medium text-slate-700">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}
