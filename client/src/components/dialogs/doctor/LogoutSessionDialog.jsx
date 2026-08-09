import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function LogoutSessionDialog({ session, open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out this session?"
      description={session ? `This will end the session on ${session.device}.` : undefined}
      confirmLabel="Sign Out"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
