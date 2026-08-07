import { Badge } from '@/components/ui/badge';

const statusStyles = {
  occupied: 'bg-emerald-50 text-emerald-700 [a]:hover:bg-emerald-50',
  available: 'bg-sky-50 text-sky-700 [a]:hover:bg-sky-50',
  cleaning: 'bg-orange-50 text-orange-700 [a]:hover:bg-orange-50',
  reserved: 'bg-yellow-50 text-yellow-700 [a]:hover:bg-yellow-50',
  isolation: 'bg-violet-50 text-violet-700 [a]:hover:bg-violet-50',
};

const statusLabels = {
  occupied: 'Occupied',
  available: 'Available',
  cleaning: 'Cleaning',
  reserved: 'Reserved',
  isolation: 'Isolation',
};

export function BedStatusBadge({ status, className = '' }) {
  return (
    <Badge variant="outline" className={`border-transparent font-medium ${statusStyles[status]} ${className}`}>
      {statusLabels[status] ?? status}
    </Badge>
  );
}
