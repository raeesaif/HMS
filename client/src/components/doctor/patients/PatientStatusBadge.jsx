import { Badge } from '@/components/ui/badge';

const statusClass = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Admitted: 'border-transparent bg-blue-100 text-blue-600',
  Critical: 'border-transparent bg-rose-100 text-rose-600',
  'Follow-up Required': 'border-transparent bg-amber-100 text-amber-600',
  Discharged: 'border-transparent bg-slate-200 text-slate-600',
};

export function PatientStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`${statusClass[status] ?? ''} ${className}`}>
      {status}
    </Badge>
  );
}
