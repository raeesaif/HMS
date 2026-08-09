import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { bedStatusMap } from '@/components/reception/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function BedDetailsDialog({ bed, open, onOpenChange }) {
  if (!bed) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <StatusBadge status={bed.status} map={bedStatusMap} />
          <DialogTitle>Bed {bed.bedNumber}</DialogTitle>
          <DialogDescription>{bed.ward} · {bed.room} · {bed.floor}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Type" value={bed.type} />
          <InfoField label="Status" value={bed.status} />
          <InfoField label="Patient" value={bed.patientName} />
          <InfoField label="Admission Type" value={bed.admissionType} />
          <InfoField label="Admission Date" value={bed.admissionDate} />
          <InfoField label="Assigned By" value={bed.assignedBy} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
