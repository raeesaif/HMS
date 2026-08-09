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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PatientSelect } from '@/components/reception/PatientSelect';
import { emergencyPriorityOptions, emergencyTypeOptions } from '@/data/receptionistEmergency';

function EmergencyForm({ onOpenChange, onSave }) {
  const [patient, setPatient] = useState(null);
  const [unidentifiedLabel, setUnidentifiedLabel] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [priority, setPriority] = useState('High');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [receptionNote, setReceptionNote] = useState('');
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const nextErrors = {};
    if (!patient && !unidentifiedLabel.trim()) nextErrors.patient = 'Select a patient or describe an unidentified arrival';
    if (!emergencyType) nextErrors.emergencyType = 'Select an emergency type';
    if (!contactPerson.trim()) nextErrors.contactPerson = 'Contact person is required';
    if (!contactPhone.trim()) nextErrors.contactPhone = 'Contact phone is required';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      patientId: patient?.id ?? null,
      patientName: patient?.name ?? unidentifiedLabel.trim(),
      arrivalTime: new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      emergencyType,
      priority,
      contactPerson: contactPerson.trim(),
      contactPhone: contactPhone.trim(),
      receptionNote: receptionNote.trim(),
      location: 'Triage — Awaiting Assignment',
      assignedDoctorId: null,
      assignedDoctorName: null,
    });
    onOpenChange(false);
    toast.success('Emergency patient registered');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Patient</FieldLabel>
          <PatientSelect selectedPatient={patient} onChange={setPatient} placeholder="Search existing patient (optional)..." />
          {!patient && (
            <Input
              value={unidentifiedLabel}
              onChange={(event) => setUnidentifiedLabel(event.target.value)}
              placeholder="Or describe an unidentified patient, e.g. Unidentified Male, approx. 40"
              className="mt-2"
            />
          )}
          {errors.patient && <FieldError>{errors.patient}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Emergency Type *</FieldLabel>
            <Select value={emergencyType} onValueChange={setEmergencyType}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.emergencyType}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {emergencyTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.emergencyType && <FieldError>{errors.emergencyType}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Priority</FieldLabel>
            <RadioGroup value={priority} onValueChange={setPriority} className="flex flex-wrap gap-3 pt-2">
              {emergencyPriorityOptions.map((option) => (
                <Label key={option} className="flex items-center gap-2 text-sm font-normal">
                  <RadioGroupItem value={option} />
                  {option}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Contact Person *</FieldLabel>
            <Input value={contactPerson} onChange={(event) => setContactPerson(event.target.value)} aria-invalid={!!errors.contactPerson} />
            {errors.contactPerson && <FieldError>{errors.contactPerson}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Contact Phone *</FieldLabel>
            <Input value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} aria-invalid={!!errors.contactPhone} />
            {errors.contactPhone && <FieldError>{errors.contactPhone}</FieldError>}
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Brief Reception Note</FieldLabel>
          <Textarea
            value={receptionNote}
            onChange={(event) => setReceptionNote(event.target.value)}
            className="min-h-16 resize-none"
            placeholder="Administrative arrival details only — no diagnosis or treatment notes."
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button variant="destructive" onClick={handleSave}>
          Register Emergency Patient
        </Button>
      </DialogFooter>
    </>
  );
}

export function EmergencyPatientDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Register Emergency Patient</DialogTitle>
          <DialogDescription>Record administrative arrival details. Diagnosis and treatment are entered by clinical staff.</DialogDescription>
        </DialogHeader>

        <EmergencyForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
