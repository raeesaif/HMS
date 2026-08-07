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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bedWards } from '@/data/nurseBeds';

function TransferForm({ bed, beds, onOpenChange, onTransfer }) {
  const [transferToWard, setTransferToWard] = useState('');
  const [transferToBed, setTransferToBed] = useState('');
  const [reason, setReason] = useState('');

  const availableTargetBeds = beds.filter(
    (candidate) => candidate.id !== bed.id && candidate.ward === transferToWard && candidate.status === 'available'
  );

  const handleWardChange = (value) => {
    setTransferToWard(value);
    setTransferToBed('');
  };

  const canSubmit = transferToWard && transferToBed && reason.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onTransfer?.(bed.id, { transferToWard, transferToBed, reason });
    toast.success(`${bed.patient.name} transferred to ${transferToBed} (${transferToWard})`);
    onOpenChange(false);
  };

  return (
    <form id="transfer-patient-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1">
        <FieldLabel>Current Ward</FieldLabel>
        <Input value={bed.ward} readOnly disabled />
      </div>
      <div className="space-y-1">
        <FieldLabel>Current Bed</FieldLabel>
        <Input value={bed.bedNumber} readOnly disabled />
      </div>
      <div className="space-y-1">
        <FieldLabel>Transfer To Ward</FieldLabel>
        <Select value={transferToWard} onValueChange={handleWardChange}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select ward" /></SelectTrigger>
          <SelectContent>
            {bedWards.map((ward) => (
              <SelectItem key={ward} value={ward}>{ward}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <FieldLabel>Transfer To Bed</FieldLabel>
        <Select value={transferToBed} onValueChange={setTransferToBed} disabled={!transferToWard}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={transferToWard ? 'Select bed' : 'Select a ward first'} />
          </SelectTrigger>
          <SelectContent>
            {availableTargetBeds.length > 0 ? (
              availableTargetBeds.map((candidate) => (
                <SelectItem key={candidate.id} value={candidate.bedNumber}>{candidate.bedNumber}</SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>No available beds</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Reason</FieldLabel>
        <Textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Reason for transfer..."
          className="min-h-20 resize-none"
        />
      </div>
    </form>
  );
}

export function TransferPatientDialog({ bed, beds, open, onOpenChange, onTransfer }) {
  if (!bed || !bed.patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Transfer Patient</DialogTitle>
          <DialogDescription>
            {bed.patient.name} · {bed.patient.id} · Bed {bed.bedNumber}
          </DialogDescription>
        </DialogHeader>

        <TransferForm key={bed.id} bed={bed} beds={beds} onOpenChange={onOpenChange} onTransfer={onTransfer} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="transfer-patient-form">Transfer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
