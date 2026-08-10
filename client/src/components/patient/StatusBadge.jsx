import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status, map = {}, className = '' }) {
  return (
    <Badge variant="outline" className={`${map[status] ?? 'border-transparent bg-slate-100 text-slate-600'} ${className}`}>
      {status}
    </Badge>
  );
}
