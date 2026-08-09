import { Badge } from '@/components/ui/badge';

const typeClass = {
  Patient: 'border-sky-200 text-sky-600',
  Appointment: 'border-violet-200 text-violet-600',
  Laboratory: 'border-purple-200 text-purple-600',
  Prescription: 'border-amber-200 text-amber-600',
  Emergency: 'border-rose-200 text-rose-600',
  Task: 'border-emerald-200 text-emerald-600',
  System: 'border-slate-300 text-slate-600',
};

export function NotificationTypeBadge({ type, className = '' }) {
  return (
    <Badge variant="outline" className={`${typeClass[type] ?? ''} ${className}`}>
      {type}
    </Badge>
  );
}
