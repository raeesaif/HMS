import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

export function CancelAppointmentDialog({ appointment, open, onOpenChange, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel this appointment?"
      description={
        appointment
          ? `Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} will be cancelled.`
          : undefined
      }
      confirmLabel="Cancel Appointment"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}
