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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function NoShowForm({ appointment, onOpenChange, onConfirm }) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm?.(appointment.id, reason.trim());
    onOpenChange(false);
    toast.success(`${appointment.patientName} marked as No Show`);
  };

  return (
    <>
      <div className="space-y-1">
        <FieldLabel>Reason / note (optional)</FieldLabel>
        <Textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="e.g. Patient called to report a transport delay..."
          className="min-h-20 resize-none"
        />
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button variant="destructive" onClick={handleConfirm}>
          Confirm No Show
        </Button>
      </DialogFooter>
    </>
  );
}

export function NoShowDialog({ appointment, open, onOpenChange, onConfirm }) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Mark as No Show</DialogTitle>
          <DialogDescription>
            {appointment.patientName} · {appointment.id} did not arrive for their {appointment.time} appointment.
          </DialogDescription>
        </DialogHeader>

        <NoShowForm key={appointment.id} appointment={appointment} onOpenChange={onOpenChange} onConfirm={onConfirm} />
      </DialogContent>
    </Dialog>
  );
}
