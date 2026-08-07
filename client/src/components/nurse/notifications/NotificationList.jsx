import { BellOff } from 'lucide-react';
import { EmptyState } from '@/shared/EmptyState';
import { NotificationCard } from './NotificationCard';

export function NotificationList({
  notifications,
  onAction,
  emptyTitle = 'No notifications available.',
  emptyDescription = 'Adjust your search or filters to see more results.',
}) {
  if (notifications.length === 0) {
    return <EmptyState icon={BellOff} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-3 p-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} onAction={onAction} />
      ))}
    </div>
  );
}
