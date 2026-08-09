import { Badge } from '@/components/ui/badge';

const statusClass = {
  Scheduled: 'border-transparent bg-blue-100 text-blue-600',
  'Checked In': 'border-transparent bg-violet-100 text-violet-600',
  Waiting: 'border-transparent bg-amber-100 text-amber-600',
  'In Consultation': 'border-transparent bg-blue-600 text-white',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
  'No Show': 'border-transparent bg-slate-200 text-slate-600',
};

export function AppointmentStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`${statusClass[status] ?? ''} ${className}`}>
      {status}
    </Badge>
  );
}
