import { Badge } from '@/components/ui/badge';

const statusClass = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Completed: 'border-transparent bg-blue-100 text-blue-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
  'Follow-up Required': 'border-transparent bg-amber-100 text-amber-600',
  Draft: 'border-transparent bg-slate-200 text-slate-600',
};

export function PrescriptionStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`${statusClass[status] ?? ''} ${className}`}>
      {status}
    </Badge>
  );
}
