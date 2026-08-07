import { Badge } from '@/components/ui/badge';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 [a]:hover:bg-amber-50',
  administered: 'bg-emerald-50 text-emerald-700 [a]:hover:bg-emerald-50',
  missed: 'bg-red-50 text-red-700 [a]:hover:bg-red-50',
  delayed: 'bg-orange-50 text-orange-700 [a]:hover:bg-orange-50',
};

const statusLabels = {
  pending: 'Pending',
  administered: 'Administered',
  missed: 'Missed',
  delayed: 'Delayed',
};

export function MedicationStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`border-transparent font-medium ${statusStyles[status]} ${className}`}>
      {statusLabels[status] ?? status}
    </Badge>
  );
}
