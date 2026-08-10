import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function SuspendUserDialog({ user, open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend this user?"
      description={user ? `${user.name} will lose access to the platform until reactivated.` : undefined}
      confirmLabel="Suspend User"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
