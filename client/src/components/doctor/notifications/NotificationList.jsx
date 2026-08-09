import { BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { NotificationItem } from './NotificationItem';
import { NotificationListSkeleton } from './LoadingSkeleton';

export function NotificationList({ notifications, isLoading = false, onAction, onClearFilters }) {
  if (isLoading) {
    return <NotificationListSkeleton />;
  }

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={BellOff}
        title="You're all caught up."
        description="There are no new notifications at the moment."
        action={
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-3 p-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onAction={onAction} />
      ))}
    </div>
  );
}
