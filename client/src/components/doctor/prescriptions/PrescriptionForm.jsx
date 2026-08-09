import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Save, Stethoscope } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { getPatientById } from '@/data/doctorPatients';
import { doctorProfile } from '@/data/doctor';
import { PatientSearch } from './PatientSearch';
import { AllergyWarning } from './AllergyWarning';
import { MedicineForm } from './MedicineForm';
import { PrescriptionSummary } from './PrescriptionSummary';

const createEmptyMedicine = () => ({
  id: `new-${Math.random().toString(36).slice(2, 9)}`,
  name: '',
  genericName: '',
  dosage: '',
  strength: '',
  form: '',
  route: '',
  frequency: '',
  duration: '',
  startDate: '',
  endDate: '',
  quantity: '',
  specialInstructions: '',
  beforeAfterFood: '',
  notes: '',
});

const todayLabel = () =>
  new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

const todayISODate = () => new Date().toISOString().slice(0, 10);

const nowStamp = () =>
  new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export function PrescriptionForm({ initialPrescription, onOpenChange, onSaveDraft, onFinalize }) {
  const initialPatient = initialPrescription ? getPatientById(initialPrescription.patientId) : null;

  const [selectedPatient, setSelectedPatient] = useState(initialPatient);
  const [chiefComplaint, setChiefComplaint] = useState(initialPrescription?.chiefComplaint ?? '');
  const [diagnosis, setDiagnosis] = useState(initialPrescription?.diagnosis ?? '');
  const [clinicalNotes, setClinicalNotes] = useState(initialPrescription?.clinicalNotes ?? '');
  const [treatmentPlan, setTreatmentPlan] = useState(initialPrescription?.treatmentPlan ?? '');
  const [medicines, setMedicines] = useState(
    initialPrescription?.medicines?.length ? initialPrescription.medicines : [createEmptyMedicine()]
  );
  const [followUpRequired, setFollowUpRequired] = useState(initialPrescription?.followUpRequired ?? false);
  const [followUpDate, setFollowUpDate] = useState(initialPrescription?.followUpDate ?? '');
  const [followUpInstructions, setFollowUpInstructions] = useState(initialPrescription?.followUpInstructions ?? '');
  const [medicineErrors, setMedicineErrors] = useState([]);
  const [attemptedFinalize, setAttemptedFinalize] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const addMedicine = () => setMedicines((current) => [...current, createEmptyMedicine()]);

  const removeMedicine = (index) =>
    setMedicines((current) => (current.length > 1 ? current.filter((_, i) => i !== index) : current));

  const updateMedicine = (index, field, value) =>
    setMedicines((current) => current.map((med, i) => (i === index ? { ...med, [field]: value } : med)));

  const validate = () => {
    const errors = medicines.map((med) => ({
      name: !med.name.trim(),
      dosage: !med.dosage.trim(),
      frequency: !med.frequency,
      duration: !med.duration.trim(),
    }));
    setMedicineErrors(errors);

    const medicinesValid = errors.every((err) => !err.name && !err.dosage && !err.frequency && !err.duration);
    return Boolean(selectedPatient) && diagnosis.trim().length > 0 && medicines.length > 0 && medicinesValid;
  };

  const buildPrescriptionData = () => ({
    id: initialPrescription?.id,
    patientId: selectedPatient.id,
    chiefComplaint,
    diagnosis,
    clinicalNotes,
    treatmentPlan,
    medicines,
    followUpRequired,
    followUpDate: followUpRequired ? followUpDate : '',
    followUpInstructions: followUpRequired ? followUpInstructions : '',
  });

  const handleSaveDraft = () => {
    if (!selectedPatient) {
      toast.error('Select a patient before saving a draft');
      return;
    }
    onSaveDraft?.({
      ...buildPrescriptionData(),
      date: initialPrescription?.date ?? todayLabel(),
      isoDate: initialPrescription?.isoDate ?? todayISODate(),
      status: 'Draft',
      isDraft: true,
      createdBy: initialPrescription?.createdBy ?? `Dr. ${doctorProfile.name}`,
      createdAt: initialPrescription?.createdAt ?? nowStamp(),
      lastUpdated: nowStamp(),
      finalizedAt: null,
      finalizedBy: null,
    });
    toast.success('Prescription draft saved');
  };

  const handleRequestFinalize = () => {
    setAttemptedFinalize(true);
    if (!validate()) {
      toast.error('Complete the patient, diagnosis, and all required medicine fields before finalizing');
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmFinalize = () => {
    const now = nowStamp();
    onFinalize?.({
      ...buildPrescriptionData(),
      date: initialPrescription?.date ?? todayLabel(),
      isoDate: initialPrescription?.isoDate ?? todayISODate(),
      status: followUpRequired ? 'Follow-up Required' : 'Active',
      isDraft: false,
      createdBy: initialPrescription?.createdBy ?? `Dr. ${doctorProfile.name}`,
      createdAt: initialPrescription?.createdAt ?? now,
      lastUpdated: now,
      finalizedAt: now,
      finalizedBy: `Dr. ${doctorProfile.name}`,
    });
    setConfirmOpen(false);
    onOpenChange(false);
    toast.success(`Prescription finalized for ${selectedPatient.name}`);
  };

  return (
    <>
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Patient Selection *</h3>
          <div className="mt-2">
            <PatientSearch selectedPatient={selectedPatient} onChange={setSelectedPatient} />
          </div>
        </div>

        {selectedPatient && <AllergyWarning allergies={selectedPatient.allergies} />}

        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-sm font-semibold text-slate-900">Clinical Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Chief Complaint</FieldLabel>
              <Input
                value={chiefComplaint}
                onChange={(event) => setChiefComplaint(event.target.value)}
                placeholder="e.g. Chest tightness during exercise"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Diagnosis *</FieldLabel>
              <Input
                value={diagnosis}
                onChange={(event) => setDiagnosis(event.target.value)}
                aria-invalid={attemptedFinalize && !diagnosis.trim()}
                placeholder="e.g. Essential hypertension"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Clinical Notes</FieldLabel>
              <Textarea
                value={clinicalNotes}
                onChange={(event) => setClinicalNotes(event.target.value)}
                className="min-h-20 resize-none"
                placeholder="Examination findings and observations..."
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Treatment Plan</FieldLabel>
              <Textarea
                value={treatmentPlan}
                onChange={(event) => setTreatmentPlan(event.target.value)}
                className="min-h-16 resize-none"
                placeholder="Overall treatment approach..."
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Medications</h3>
            <Button type="button" variant="outline" size="sm" onClick={addMedicine}>
              <Plus /> Add Medicine
            </Button>
          </div>
          <div className="mt-3 space-y-3">
            {medicines.map((medicine, index) => (
              <MedicineForm
                key={medicine.id}
                medicine={medicine}
                index={index}
                onChange={updateMedicine}
                onRemove={removeMedicine}
                canRemove={medicines.length > 1}
                errors={medicineErrors[index] ?? {}}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Follow-up Required</h3>
              <p className="text-xs text-slate-500">Schedule a follow-up visit for this patient</p>
            </div>
            <Switch checked={followUpRequired} onCheckedChange={setFollowUpRequired} />
          </div>
          {followUpRequired && (
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <FieldLabel>Follow-up Date</FieldLabel>
                <Input type="date" value={followUpDate} onChange={(event) => setFollowUpDate(event.target.value)} />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel>Follow-up Instructions</FieldLabel>
                <Textarea
                  value={followUpInstructions}
                  onChange={(event) => setFollowUpInstructions(event.target.value)}
                  className="min-h-16 resize-none"
                  placeholder="Instructions for the patient's next visit..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-4">
          <PrescriptionSummary
            patient={selectedPatient}
            doctorName={doctorProfile.name}
            department={doctorProfile.department}
            date={initialPrescription?.date ?? todayLabel()}
            diagnosis={diagnosis}
            medicines={medicines}
            followUpRequired={followUpRequired}
            followUpDate={followUpDate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={handleSaveDraft}>
          <Save /> Save Draft
        </Button>
        <Button type="button" onClick={handleRequestFinalize}>
          <Stethoscope /> Finalize Prescription
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalize this prescription?</DialogTitle>
            <DialogDescription>
              Are you sure you want to finalize this prescription? Once finalized it will be marked active and made
              available to authorized nursing staff for {selectedPatient?.name}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <Button onClick={handleConfirmFinalize}>Confirm &amp; Finalize</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
