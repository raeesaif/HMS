import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function ArchiveNotificationDialog({ open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Archive Notification?"
      description="This notification will be removed from your active notification list."
      confirmLabel="Archive"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
