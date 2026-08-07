import { Badge } from '@/components/ui/badge';
import { notificationTypeMeta } from './notificationTypeMeta';

export function NotificationTypeBadge({ type, className = '' }) {
  const meta = notificationTypeMeta[type];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <Badge variant="outline" className={`gap-1 border-transparent font-medium ${meta.tone} ${className}`}>
      <Icon className="size-3" />
      {meta.label}
    </Badge>
  );
}
