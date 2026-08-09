import { Badge } from '@/components/ui/badge';

const defaultPriorityClass = {
  Normal: 'border-transparent bg-slate-100 text-slate-600',
  Low: 'border-transparent bg-slate-100 text-slate-600',
  Medium: 'border-transparent bg-amber-100 text-amber-600',
  Urgent: 'border-transparent bg-orange-100 text-orange-600',
  High: 'border-transparent bg-orange-100 text-orange-600',
  Critical: 'border-transparent bg-rose-100 text-rose-600',
  Emergency: 'border-transparent bg-rose-600 text-white',
};

export function PriorityBadge({ priority, className = '' }) {
  return (
    <Badge variant="outline" className={`${defaultPriorityClass[priority] ?? ''} ${className}`}>
      {priority}
    </Badge>
  );
}
