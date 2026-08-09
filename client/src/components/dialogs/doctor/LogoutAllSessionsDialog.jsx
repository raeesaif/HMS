import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function LogoutAllSessionsDialog({ open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out all other active sessions?"
      description="You'll remain signed in on this device, but every other session will be signed out immediately."
      confirmLabel="Sign Out All"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
