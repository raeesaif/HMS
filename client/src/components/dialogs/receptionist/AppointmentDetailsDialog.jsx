import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { appointmentStatusMap } from '@/components/reception/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function AppointmentDetailsDialog({ appointment, open, onOpenChange }) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={appointment.status} map={appointmentStatusMap} />
            <PriorityBadge priority={appointment.priority} />
          </div>
          <DialogTitle>{appointment.id}</DialogTitle>
          <DialogDescription>{appointment.reasonForVisit}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Patient" value={appointment.patientName} />
          <InfoField label="Doctor" value={appointment.doctorName} />
          <InfoField label="Department" value={appointment.department} />
          <InfoField label="Type" value={appointment.type} />
          <InfoField label="Date" value={appointment.date} />
          <InfoField label="Time" value={appointment.time} />
          <InfoField label="Created By" value={appointment.createdBy} />
          <InfoField label="Created At" value={appointment.createdAt} />
        </div>

        {appointment.notes && (
          <div>
            <p className="text-xs text-slate-500">Notes</p>
            <p className="mt-0.5 text-sm text-slate-900">{appointment.notes}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
