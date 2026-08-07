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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reactionTypes = ['Rash', 'Nausea/Vomiting', 'Dizziness', 'Allergic Reaction', 'Difficulty Breathing', 'Other'];
const severityLevels = ['Mild', 'Moderate', 'Severe'];

function SideEffectForm({ medication, onOpenChange, onSubmit }) {
  const [form, setForm] = useState({
    reactionType: '',
    severity: '',
    description: '',
    actionTaken: '',
    notifyDoctor: false,
  });

  const canSubmit = form.reactionType && form.severity && form.description.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(medication.id, form);
    toast.success(`Side effect reported for ${medication.patientName}${form.notifyDoctor ? ' — doctor notified' : ''}`);
    onOpenChange(false);
  };

  return (
    <form id="report-side-effect-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <FieldLabel>Reaction Type</FieldLabel>
          <Select value={form.reactionType} onValueChange={(value) => setForm((prev) => ({ ...prev, reactionType: value }))}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select reaction type" /></SelectTrigger>
            <SelectContent>
              {reactionTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <FieldLabel>Severity</FieldLabel>
          <Select value={form.severity} onValueChange={(value) => setForm((prev) => ({ ...prev, severity: value }))}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select severity" /></SelectTrigger>
            <SelectContent>
              {severityLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <FieldLabel>Description</FieldLabel>
        <Textarea
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Describe the observed reaction..."
          className="min-h-20 resize-none"
        />
      </div>

      <div className="space-y-1">
        <FieldLabel>Action Taken</FieldLabel>
        <Textarea
          value={form.actionTaken}
          onChange={(event) => setForm((prev) => ({ ...prev, actionTaken: event.target.value }))}
          placeholder="e.g. Medication withheld, vitals monitored..."
          className="min-h-16 resize-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <Checkbox
          checked={form.notifyDoctor}
          onCheckedChange={(checked) => setForm((prev) => ({ ...prev, notifyDoctor: checked === true }))}
        />
        Notify Doctor
      </label>
    </form>
  );
}

export function ReportSideEffectDialog({ medication, open, onOpenChange, onSubmit }) {
  if (!medication) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report Side Effects</DialogTitle>
          <DialogDescription>
            {medication.patientName} · {medication.patientId} · {medication.medicineName}
          </DialogDescription>
        </DialogHeader>

        <SideEffectForm key={medication.id} medication={medication} onOpenChange={onOpenChange} onSubmit={onSubmit} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="report-side-effect-form">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
