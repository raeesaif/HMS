import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function DeleteConfirmDialog({ open, onOpenChange, title, description, confirmLabel = 'Remove', onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
