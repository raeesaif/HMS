import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function ResetPreferencesDialog({ open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Reset Preferences?"
      description="Your personal application preferences will be restored to their default values. Your password, security settings, and hospital permissions are not affected."
      confirmLabel="Reset Preferences"
      onConfirm={onConfirm}
    />
  );
}
