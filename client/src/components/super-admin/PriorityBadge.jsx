import { Badge } from '@/components/ui/badge';
import { ticketPriorityMap } from '@/components/super-admin/statusMaps';

export function PriorityBadge({ priority, className = '' }) {
  return (
    <Badge variant="outline" className={`${ticketPriorityMap[priority] ?? ''} ${className}`}>
      {priority}
    </Badge>
  );
}
