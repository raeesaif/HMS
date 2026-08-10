import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function SessionDialog({ mode = 'single', session, open, onOpenChange, onConfirm }) {
  const isAll = mode === 'all';

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isAll ? 'Sign out all other sessions?' : 'Sign out this session?'}
      description={
        isAll
          ? 'This will sign you out of every other device except this one.'
          : session
            ? `This will end the session on ${session.device}.`
            : undefined
      }
      confirmLabel="Sign Out"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
