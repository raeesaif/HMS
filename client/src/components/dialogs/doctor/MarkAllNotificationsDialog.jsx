import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function MarkAllNotificationsDialog({ open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Mark all notifications as read?"
      description="All unread notifications will be marked as read."
      confirmLabel="Mark All as Read"
      onConfirm={onConfirm}
    />
  );
}
