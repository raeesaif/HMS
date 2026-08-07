import { Badge } from '@/components/ui/badge';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 [a]:hover:bg-amber-50',
  'in-progress': 'bg-sky-50 text-sky-700 [a]:hover:bg-sky-50',
  completed: 'bg-emerald-50 text-emerald-700 [a]:hover:bg-emerald-50',
  overdue: 'bg-red-50 text-red-700 [a]:hover:bg-red-50',
};

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
  overdue: 'Overdue',
};

export function TaskStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`border-transparent font-medium ${statusStyles[status]} ${className}`}>
      {statusLabels[status] ?? status}
    </Badge>
  );
}
