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
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { deactivationReasons } from '@/data/doctorSettings';

function DeactivationForm({ onOpenChange, onSubmit }) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      setError('Select a reason for this request');
      return;
    }
    setError('');
    onSubmit({ reason, notes: notes.trim() });
    onOpenChange(false);
    toast.success('Deactivation request sent to your administrator');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Reason *</FieldLabel>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger className="w-full" aria-invalid={!!error}>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {deactivationReasons.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <FieldError>{error}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Additional Notes</FieldLabel>
          <Textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-h-20 resize-none"
            placeholder="Optional context for the administrator..."
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSubmit}>Submit Request</Button>
      </DialogFooter>
    </>
  );
}

export function AccountDeactivationDialog({ open, onOpenChange, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Account Deactivation</DialogTitle>
          <DialogDescription>Your request will be reviewed by the hospital administrator.</DialogDescription>
        </DialogHeader>

        <DeactivationForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
