import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function MetricCard({ label, value, trend, tone = 'neutral' }) {
  const isDown = trend?.direction === 'down';
  const toneClass = tone === 'good' ? 'text-emerald-600' : tone === 'bad' ? 'text-rose-600' : 'text-slate-900';

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className={`mt-1.5 text-xl font-bold tracking-tight ${toneClass}`}>{value}</p>
        {trend && (
          <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${isDown ? 'text-rose-600' : 'text-emerald-600'}`}>
            {isDown ? <TrendingDown className="size-3.5" /> : <TrendingUp className="size-3.5" />}
            {trend.value}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
