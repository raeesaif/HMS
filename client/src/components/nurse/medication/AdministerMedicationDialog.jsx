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

const nowTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

function AdministerForm({ medication, onOpenChange, onConfirm }) {
  const [form, setForm] = useState({
    actualTime: nowTime(),
    administeredBy: 'Nurse E. Owusu',
    doseGiven: medication.dosage ?? '',
    route: medication.route ?? '',
    patientResponse: '',
    notes: '',
  });

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm?.(medication.id, form);
    toast.success(`${medication.medicineName} administered to ${medication.patientName}`);
    onOpenChange(false);
  };

  return (
    <form id="administer-medication-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1">
        <FieldLabel>Medicine Name</FieldLabel>
        <Input value={medication.medicineName} readOnly disabled />
      </div>
      <div className="space-y-1">
        <FieldLabel>Scheduled Time</FieldLabel>
        <Input value={medication.scheduledTime} readOnly disabled />
      </div>
      <div className="space-y-1">
        <FieldLabel>Actual Administration Time</FieldLabel>
        <Input value={form.actualTime} onChange={updateField('actualTime')} placeholder="e.g. 09:35 AM" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Administered By</FieldLabel>
        <Input value={form.administeredBy} onChange={updateField('administeredBy')} placeholder="Nurse name" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Dose Given</FieldLabel>
        <Input value={form.doseGiven} onChange={updateField('doseGiven')} placeholder="e.g. 5mg" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Administration Route</FieldLabel>
        <Input value={form.route} onChange={updateField('route')} placeholder="e.g. Oral, IV" />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Patient Response</FieldLabel>
        <Input value={form.patientResponse} onChange={updateField('patientResponse')} placeholder="e.g. Tolerated well, no distress" />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          value={form.notes}
          onChange={updateField('notes')}
          placeholder="Any additional observations..."
          className="min-h-20 resize-none"
        />
      </div>
    </form>
  );
}

export function AdministerMedicationDialog({ medication, open, onOpenChange, onConfirm }) {
  if (!medication) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Administer Medication</DialogTitle>
          <DialogDescription>
            {medication.patientName} · {medication.patientId} · Bed {medication.bed}
          </DialogDescription>
        </DialogHeader>

        <AdministerForm key={medication.id} medication={medication} onOpenChange={onOpenChange} onConfirm={onConfirm} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="administer-medication-form">Confirm Administration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
