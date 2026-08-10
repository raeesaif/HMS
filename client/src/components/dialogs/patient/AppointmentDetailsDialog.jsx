import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { appointmentStatusMap } from '@/components/patient/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

const reschedulableStatuses = ['Scheduled', 'Confirmed'];

export function AppointmentDetailsDialog({ appointment, open, onOpenChange, onReschedule, onCancel }) {
  if (!appointment) return null;

  const canModify = reschedulableStatuses.includes(appointment.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={appointment.status} map={appointmentStatusMap} />
          <DialogTitle>{appointment.doctorName}</DialogTitle>
          <DialogDescription>{appointment.specialization} · {appointment.department}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Date" value={appointment.date} />
          <InfoField label="Time" value={appointment.time} />
          <InfoField label="Location" value={appointment.location} />
          <InfoField label="Appointment Type" value={appointment.type} />
          <InfoField label="Created Date" value={appointment.createdAt} />
        </div>

        <div>
          <p className="text-xs text-slate-500">Reason for Visit</p>
          <p className="mt-0.5 text-sm text-slate-900">{appointment.reasonForVisit || '—'}</p>
        </div>

        {appointment.instructions && (
          <div>
            <p className="text-xs text-slate-500">Instructions</p>
            <p className="mt-0.5 text-sm text-slate-900">{appointment.instructions}</p>
          </div>
        )}

        {canModify && (
          <DialogFooter className="justify-end gap-2">
            <Button variant="outline" onClick={() => onCancel(appointment)}>
              Cancel Appointment
            </Button>
            <Button onClick={() => onReschedule(appointment)}>Reschedule</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
