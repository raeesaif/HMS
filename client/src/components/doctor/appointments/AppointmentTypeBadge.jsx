import { Badge } from '@/components/ui/badge';

const typeClass = {
  'New Consultation': 'border-sky-200 text-sky-600',
  'Follow-up': 'border-violet-200 text-violet-600',
  Emergency: 'border-rose-200 text-rose-600',
  'Routine Checkup': 'border-emerald-200 text-emerald-600',
};

export function AppointmentTypeBadge({ type, className = '' }) {
  return (
    <Badge variant="outline" className={`${typeClass[type] ?? ''} ${className}`}>
      {type}
    </Badge>
  );
}
