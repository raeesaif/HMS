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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bedStatusUpdateOptions } from '@/data/nurseBeds';

function UpdateStatusForm({ bed, onOpenChange, onSave }) {
  const [status, setStatus] = useState(bed.status === 'reserved' ? '' : bed.status);
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!status) return;
    onSave?.(bed.id, { status, notes });
    toast.success(`Bed ${bed.bedNumber} status updated`);
    onOpenChange(false);
  };

  return (
    <form id="update-bed-status-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <FieldLabel>Bed Status</FieldLabel>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent>
            {bedStatusUpdateOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Any relevant notes about this status change..."
          className="min-h-20 resize-none"
        />
      </div>
    </form>
  );
}

export function UpdateBedStatusDialog({ bed, open, onOpenChange, onSave }) {
  if (!bed) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Bed Status</DialogTitle>
          <DialogDescription>
            Bed {bed.bedNumber} · {bed.ward}
          </DialogDescription>
        </DialogHeader>

        <UpdateStatusForm key={bed.id} bed={bed} onOpenChange={onOpenChange} onSave={onSave} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="update-bed-status-form">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
