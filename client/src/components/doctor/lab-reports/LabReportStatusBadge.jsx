import { Badge } from '@/components/ui/badge';

const statusClass = {
  Requested: 'border-transparent bg-slate-200 text-slate-600',
  'Sample Collected': 'border-transparent bg-blue-100 text-blue-600',
  Processing: 'border-transparent bg-amber-100 text-amber-600',
  'Ready for Review': 'border-transparent bg-violet-100 text-violet-600',
  Reviewed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
};

export function LabReportStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`${statusClass[status] ?? ''} ${className}`}>
      {status}
    </Badge>
  );
}
