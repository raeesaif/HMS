import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { emergencyStatusMap } from '@/components/reception/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function EmergencyDetailsDialog({ entry, open, onOpenChange }) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={entry.status} map={emergencyStatusMap} />
            <PriorityBadge priority={entry.priority} />
          </div>
          <DialogTitle>{entry.id} — {entry.patientName}</DialogTitle>
          <DialogDescription>Administrative arrival record. Clinical treatment details are managed by medical staff.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Emergency Type" value={entry.emergencyType} />
          <InfoField label="Arrival Time" value={entry.arrivalTime} />
          <InfoField label="Assigned Doctor" value={entry.assignedDoctorName ?? 'Unassigned'} />
          <InfoField label="Location" value={entry.location} />
          <InfoField label="Contact Person" value={entry.contactPerson} />
          <InfoField label="Contact Phone" value={entry.contactPhone} />
          <InfoField label="Registered By" value={entry.registeredBy} />
        </div>

        {entry.receptionNote && (
          <div>
            <p className="text-xs text-slate-500">Reception Note</p>
            <p className="mt-0.5 text-sm text-slate-900">{entry.receptionNote}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
