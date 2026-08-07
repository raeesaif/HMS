import { Badge } from '@/components/ui/badge';

const priorityStyles = {
  low: 'bg-emerald-50 text-emerald-700 [a]:hover:bg-emerald-50',
  medium: 'bg-sky-50 text-sky-700 [a]:hover:bg-sky-50',
  high: 'bg-orange-50 text-orange-700 [a]:hover:bg-orange-50',
  emergency: 'bg-red-50 text-red-700 [a]:hover:bg-red-50',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  emergency: 'Emergency',
};

export function TaskPriorityBadge({ priority, className = '' }) {
  return (
    <Badge variant="outline" className={`border-transparent font-medium ${priorityStyles[priority]} ${className}`}>
      {priorityLabels[priority] ?? priority}
    </Badge>
  );
}
