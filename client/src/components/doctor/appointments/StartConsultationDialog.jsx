import { useState } from 'react';
import { toast } from 'sonner';
import { NotebookPen, Pill, Save, TestTube, UserRound } from 'lucide-react';
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
import { ConsultationNotes } from './ConsultationNotes';

const EMPTY_NOTES = {
  chiefComplaint: '',
  symptoms: '',
  clinicalNotes: '',
  diagnosis: '',
  treatmentPlan: '',
  followUpInstructions: '',
};

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

function ConsultationForm({ appointment, onOpenChange, onSaveDraft, onComplete, onAction }) {
  const [notes, setNotes] = useState({ ...EMPTY_NOTES, ...(appointment.consultation ?? {}) });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const updateField = (field, value) => setNotes((prev) => ({ ...prev, [field]: value }));

  const handleSaveDraft = () => {
    onSaveDraft?.(appointment.id, notes);
    toast.success('Consultation draft saved');
  };

  const handleRequestComplete = () => {
    if (!notes.diagnosis.trim() || !notes.treatmentPlan.trim()) {
      toast.error('Diagnosis and treatment plan are required to complete this consultation');
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmComplete = () => {
    onComplete?.(appointment.id, notes);
    setConfirmOpen(false);
    onOpenChange(false);
    toast.success(`Consultation completed for ${appointment.patientName}`);
  };

  return (
    <>
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Patient information</h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            <InfoField label="Name" value={appointment.patientName} />
            <InfoField label="Age" value={appointment.age} />
            <InfoField label="Gender" value={appointment.gender} />
            <InfoField label="Patient ID" value={appointment.patientId} />
            <InfoField label="Blood group" value={appointment.bloodGroup} />
            <InfoField
              label="Allergies"
              value={appointment.allergies.length > 0 ? appointment.allergies.join(', ') : 'None known'}
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-sm font-semibold text-slate-900">Current visit</h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            <InfoField label="Appointment date" value={appointment.date} />
            <InfoField label="Appointment type" value={appointment.type} />
            <InfoField label="Reason for visit" value={appointment.reasonForVisit} />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-sm font-semibold text-slate-900">Clinical assessment</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Fields marked * are required to complete the consultation.
          </p>
          <div className="mt-3">
            <ConsultationNotes values={notes} onChange={updateField} />
          </div>
        </div>
      </div>

      <DialogFooter className="flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onAction?.('create-prescription', appointment)}>
            <Pill /> Create Prescription
          </Button>
          <Button variant="outline" size="sm" onClick={() => onAction?.('request-lab-test', appointment)}>
            <TestTube /> Request Lab Test
          </Button>
          <Button variant="outline" size="sm" onClick={() => onAction?.('schedule-follow-up', appointment)}>
            <UserRound /> Schedule Follow-up
          </Button>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save /> Save Draft
          </Button>
          <Button onClick={handleRequestComplete}>
            <NotebookPen /> Complete Consultation
          </Button>
        </div>
      </DialogFooter>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete this consultation?</DialogTitle>
            <DialogDescription>
              Are you sure you want to complete this consultation? This will mark the appointment as completed and
              save the clinical notes for {appointment.patientName}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <Button onClick={handleConfirmComplete}>Confirm &amp; Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function StartConsultationDialog({ appointment, open, onOpenChange, onSaveDraft, onComplete, onAction }) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Consultation — {appointment.patientName}</DialogTitle>
          <DialogDescription>
            {appointment.id} · {appointment.date} · {appointment.time}
          </DialogDescription>
        </DialogHeader>

        <ConsultationForm
          key={appointment.id}
          appointment={appointment}
          onOpenChange={onOpenChange}
          onSaveDraft={onSaveDraft}
          onComplete={onComplete}
          onAction={onAction}
        />
      </DialogContent>
    </Dialog>
  );
}
