import { Badge } from '@/components/ui/badge';

const statusClass = {
  Normal: 'border-transparent bg-emerald-100 text-emerald-600',
  Abnormal: 'border-transparent bg-orange-100 text-orange-600',
  Critical: 'border-transparent bg-rose-100 text-rose-600',
  Pending: 'border-transparent bg-amber-100 text-amber-600',
  High: 'border-transparent bg-orange-100 text-orange-600',
  Low: 'border-transparent bg-orange-100 text-orange-600',
};

export function LabResultStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`${statusClass[status] ?? ''} ${className}`}>
      {status}
    </Badge>
  );
}
