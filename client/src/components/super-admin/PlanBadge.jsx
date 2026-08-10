import { Badge } from '@/components/ui/badge';

const planClass = {
  Free: 'border-transparent bg-slate-100 text-slate-600',
  Basic: 'border-transparent bg-sky-100 text-sky-600',
  Professional: 'border-transparent bg-violet-100 text-violet-600',
  Enterprise: 'border-transparent bg-amber-100 text-amber-700',
};

export function PlanBadge({ plan, className = '' }) {
  return (
    <Badge variant="outline" className={`${planClass[plan] ?? 'border-transparent bg-slate-100 text-slate-600'} ${className}`}>
      {plan}
    </Badge>
  );
}
