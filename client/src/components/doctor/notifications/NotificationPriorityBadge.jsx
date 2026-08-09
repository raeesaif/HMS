import { Badge } from '@/components/ui/badge';

const priorityClass = {
  Low: 'border-transparent bg-slate-200 text-slate-600',
  Medium: 'border-transparent bg-amber-100 text-amber-600',
  High: 'border-transparent bg-orange-100 text-orange-600',
  Critical: 'border-transparent bg-rose-100 text-rose-600',
};

export function NotificationPriorityBadge({ priority, className = '' }) {
  return (
    <Badge variant="outline" className={`${priorityClass[priority] ?? ''} ${className}`}>
      {priority}
    </Badge>
  );
}
