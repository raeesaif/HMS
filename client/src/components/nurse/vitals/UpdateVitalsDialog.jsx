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

function VitalsForm({ patient, onOpenChange, onSave }) {
  const [form, setForm] = useState({
    bp: patient.vitals.bp ?? '',
    hr: patient.vitals.hr ?? '',
    temp: patient.vitals.temp ?? '',
    rr: patient.vitals.rr ?? '',
    spo2: patient.vitals.spo2 ?? '',
    bloodSugar: patient.vitals.bloodSugar ?? '',
    weight: patient.vitals.weight ?? '',
    height: patient.vitals.height ?? '',
    painLevel: patient.vitals.painLevel ?? '',
    notes: '',
  });

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(patient.id, form);
    toast.success(`Vitals updated for ${patient.name}`);
    onOpenChange(false);
  };

  return (
    <form id="update-vitals-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1">
        <FieldLabel>Blood Pressure</FieldLabel>
        <Input value={form.bp} onChange={updateField('bp')} placeholder="e.g. 120/80" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Heart Rate</FieldLabel>
        <Input value={form.hr} onChange={updateField('hr')} placeholder="e.g. 78 bpm" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Temperature</FieldLabel>
        <Input value={form.temp} onChange={updateField('temp')} placeholder="e.g. 98.6°F" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Respiratory Rate</FieldLabel>
        <Input value={form.rr} onChange={updateField('rr')} placeholder="e.g. 16/min" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Oxygen Saturation (SpO2)</FieldLabel>
        <Input value={form.spo2} onChange={updateField('spo2')} placeholder="e.g. 98%" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Blood Sugar (Optional)</FieldLabel>
        <Input value={form.bloodSugar} onChange={updateField('bloodSugar')} placeholder="e.g. 96 mg/dL" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Weight</FieldLabel>
        <Input value={form.weight} onChange={updateField('weight')} placeholder="e.g. 62 kg" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Height</FieldLabel>
        <Input value={form.height} onChange={updateField('height')} placeholder="e.g. 165 cm" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Pain Level (1-10)</FieldLabel>
        <Input type="number" min="1" max="10" value={form.painLevel} onChange={updateField('painLevel')} placeholder="e.g. 3" />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          value={form.notes}
          onChange={updateField('notes')}
          placeholder="Any observations to record with these vitals..."
          className="min-h-20 resize-none"
        />
      </div>
    </form>
  );
}

export function UpdateVitalsDialog({ patient, open, onOpenChange, onSave }) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Vitals</DialogTitle>
          <DialogDescription>
            {patient.name} · {patient.id} · Bed {patient.bed}
          </DialogDescription>
        </DialogHeader>

        <VitalsForm key={patient.id} patient={patient} onOpenChange={onOpenChange} onSave={onSave} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="update-vitals-form">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
