import { useState } from 'react';
import { toast } from 'sonner';
import { Pill } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const statusStyles = {
  administered: 'bg-emerald-50 text-emerald-600',
  pending: 'bg-amber-50 text-amber-600',
  skipped: 'bg-slate-100 text-slate-500',
};

export function MedicationDialog({ patient, open, onOpenChange, onUpdateMedication }) {
  const [skippingName, setSkippingName] = useState(null);
  const [reason, setReason] = useState('');

  const handleOpenChange = (next) => {
    onOpenChange(next);
    if (!next) {
      setSkippingName(null);
      setReason('');
    }
  };

  const markAdministered = (medicationName) => {
    onUpdateMedication?.(patient.id, medicationName, { status: 'administered' });
    toast.success(`${medicationName} marked as administered`);
  };

  const confirmSkip = (medicationName) => {
    onUpdateMedication?.(patient.id, medicationName, { status: 'skipped', skipReason: reason });
    toast.success(`${medicationName} skipped`);
    setSkippingName(null);
    setReason('');
  };

  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Today's Medications</DialogTitle>
          <DialogDescription>
            {patient.name} · {patient.id} · Bed {patient.bed}
          </DialogDescription>
        </DialogHeader>

        {patient.medications.length > 0 ? (
          <ul className="space-y-2">
            {patient.medications.map((med) => (
              <li key={med.name} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                      <Pill className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.dosage} · {med.time}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[med.status]}`}>
                    {med.status}
                  </span>
                </div>

                {med.status === 'pending' && (
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={() => markAdministered(med.name)}>
                      Mark as Administered
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSkippingName(med.name)}>
                      Skip
                    </Button>
                  </div>
                )}

                {skippingName === med.name && (
                  <div className="mt-3 flex items-center gap-2">
                    <Input
                      autoFocus
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Reason for skipping..."
                      className="h-9"
                    />
                    <Button size="sm" variant="destructive" disabled={!reason.trim()} onClick={() => confirmSkip(med.name)}>
                      Confirm
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSkippingName(null)}>
                      Cancel
                    </Button>
                  </div>
                )}

                {med.status === 'skipped' && med.skipReason && (
                  <p className="mt-2 text-xs text-slate-500">Skipped: {med.skipReason}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No medications scheduled for today.</p>
        )}

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
