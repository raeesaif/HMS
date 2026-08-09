import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PatientAvatar } from '@/components/reception/PatientAvatar';

function nextQueueNumber() {
  return `Q-${100 + Math.floor(Math.random() * 900)}`;
}

function CheckInForm({ checkIn, onOpenChange, onConfirm }) {
  const [queueNumber, setQueueNumber] = useState(checkIn.queueNumber ?? nextQueueNumber());
  const [note, setNote] = useState(checkIn.receptionNote ?? '');

  const handleConfirm = () => {
    onConfirm(checkIn.id, {
      queueNumber,
      receptionNote: note.trim(),
      checkInTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      arrivalTime: checkIn.arrivalTime ?? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    });
    onOpenChange(false);
    toast.success(`${checkIn.patientName} checked in`);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
          <PatientAvatar name={checkIn.patientName} />
          <div>
            <p className="text-sm font-medium text-slate-900">{checkIn.patientName}</p>
            <p className="text-xs text-slate-500">
              {checkIn.doctorName} · {checkIn.appointmentDate} · {checkIn.appointmentTime}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Queue Number</FieldLabel>
          <Input value={queueNumber} onChange={(event) => setQueueNumber(event.target.value)} />
        </div>

        <div className="space-y-1">
          <FieldLabel>Reception Note</FieldLabel>
          <Textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional note, e.g. wheelchair assistance requested"
            className="min-h-16 resize-none"
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleConfirm}>Confirm Check-in</Button>
      </DialogFooter>
    </>
  );
}

export function CheckInDialog({ checkIn, open, onOpenChange, onConfirm }) {
  if (!checkIn) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Check In Patient</DialogTitle>
          <DialogDescription>Confirm arrival and assign a queue number.</DialogDescription>
        </DialogHeader>

        <CheckInForm key={checkIn.id} checkIn={checkIn} onOpenChange={onOpenChange} onConfirm={onConfirm} />
      </DialogContent>
    </Dialog>
  );
}
