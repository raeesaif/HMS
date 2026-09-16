import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function CancelAppointmentDialog({ appointment, open, onOpenChange, onConfirm, isSubmitting }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleOpenChange = (next) => {
    if (!next) {
      setReason('');
      setError('');
    }
    onOpenChange(next);
  };

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('Cancellation reason is required');
      return;
    }
    onConfirm(reason.trim());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this appointment?</DialogTitle>
          <DialogDescription>
            {appointment ? `This will cancel the appointment for ${appointment.patientName}.` : undefined}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <FieldLabel>Cancellation Reason *</FieldLabel>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="min-h-16 resize-none"
            aria-invalid={!!error}
            placeholder="Why is this appointment being cancelled?"
          />
          {error && <FieldError>{error}</FieldError>}
        </div>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Keep Appointment
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirm} disabled={isSubmitting}>
            Cancel Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
