import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { NotificationItem } from './NotificationItem';

export function NotificationsList({ notifications, onAction, onClearFilters }) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="No notifications."
        description="You're all caught up — new notifications will appear here."
        action={
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
        className="py-16"
      />
    );
  }

  return (
    <div className="space-y-2.5 p-5">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onAction={onAction} />
      ))}
    </div>
  );
}
