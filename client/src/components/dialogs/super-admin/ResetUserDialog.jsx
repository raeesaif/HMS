import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function ResetUserDialog({ user, open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Send password reset link?"
      description={user ? `A password reset link will be emailed to ${user.email}.` : undefined}
      confirmLabel="Send Reset Link"
      onConfirm={onConfirm}
    />
  );
}
