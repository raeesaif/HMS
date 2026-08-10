import { Printer } from 'lucide-react';
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
import { prescriptionStatusMap } from '@/components/patient/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function PrescriptionDetailsDialog({ prescription, open, onOpenChange, onPrint }) {
  if (!prescription) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={prescription.status} map={prescriptionStatusMap} />
          <DialogTitle>{prescription.medicine} {prescription.strength}</DialogTitle>
          <DialogDescription>Prescribed by {prescription.doctorName}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Dosage" value={prescription.dosage} />
          <InfoField label="Frequency" value={prescription.frequency} />
          <InfoField label="Duration" value={prescription.duration} />
          <InfoField label="Issued Date" value={prescription.issuedDate} />
          <InfoField label="Start Date" value={prescription.startDate} />
          <InfoField label="End Date" value={prescription.endDate} />
          <InfoField label="Refills Remaining" value={prescription.refillsRemaining} />
        </div>

        <div>
          <p className="text-xs text-slate-500">Instructions</p>
          <p className="mt-0.5 text-sm text-slate-900">{prescription.instructions || 'None'}</p>
        </div>

        <DialogFooter className="justify-end">
          <Button variant="outline" onClick={() => onPrint(prescription)}>
            <Printer /> Print Prescription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
