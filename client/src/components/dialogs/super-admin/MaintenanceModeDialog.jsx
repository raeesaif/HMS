import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function MaintenanceModeDialog({ enabling, open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={enabling ? 'Enable maintenance mode?' : 'Disable maintenance mode?'}
      description={
        enabling
          ? 'All hospital users will be temporarily blocked from accessing the platform until maintenance mode is disabled.'
          : 'Hospital users will regain normal access to the platform.'
      }
      confirmLabel={enabling ? 'Enable Maintenance Mode' : 'Disable Maintenance Mode'}
      variant={enabling ? 'destructive' : 'default'}
      onConfirm={onConfirm}
    />
  );
}
