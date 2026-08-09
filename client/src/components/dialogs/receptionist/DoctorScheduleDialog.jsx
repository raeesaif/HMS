import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { doctorStatusMap } from '@/components/reception/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function DoctorScheduleDialog({ doctor, open, onOpenChange }) {
  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <StatusBadge status={doctor.status} map={doctorStatusMap} />
          <DialogTitle>{doctor.name}</DialogTitle>
          <DialogDescription>{doctor.department} · {doctor.specialization}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Shift" value={doctor.shift} />
          <InfoField label="Current Patients" value={doctor.currentPatients} />
          <InfoField label="Next Available Slot" value={doctor.nextAvailableSlot} />
          <InfoField label="Status" value={doctor.status} />
        </div>

        <p className="text-xs text-slate-400">
          Doctor status is set by clinical staff. Use appointment scheduling to book against availability shown here.
        </p>
      </DialogContent>
    </Dialog>
  );
}
