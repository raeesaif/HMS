import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function ResetPreferencesDialog({ open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Reset preferences?"
      description="Your personal notification, appearance, and general preferences will be restored to their default values. Your password and security settings are not affected."
      confirmLabel="Reset Preferences"
      onConfirm={onConfirm}
    />
  );
}
