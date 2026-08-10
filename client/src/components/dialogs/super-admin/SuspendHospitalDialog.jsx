import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function SuspendHospitalDialog({ hospital, open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend this hospital?"
      description={
        hospital
          ? `Suspending ${hospital.name} will prevent its users from accessing the HMS according to platform rules. This can be reversed by activating the hospital again.`
          : undefined
      }
      confirmLabel="Suspend Hospital"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
