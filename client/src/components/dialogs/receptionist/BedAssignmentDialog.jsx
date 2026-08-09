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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PatientSelect } from '@/components/reception/PatientSelect';
import { ReceptionDatePicker } from '@/components/reception/ReceptionDatePicker';
import { admissionTypeOptions } from '@/data/receptionistBeds';

function BedAssignmentForm({ bed, mode, onOpenChange, onSave }) {
  const [patient, setPatient] = useState(null);
  const [admissionType, setAdmissionType] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const nextErrors = {};
    if (!patient) nextErrors.patient = 'Select a patient';
    if (!admissionType) nextErrors.admissionType = 'Select an admission type';
    if (mode === 'reserve' && !expectedDate) nextErrors.expectedDate = 'Select an expected admission date';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(bed.id, {
      status: mode === 'reserve' ? 'Reserved' : 'Occupied',
      patientId: patient.id,
      patientName: patient.name,
      admissionType,
      admissionDate: mode === 'reserve' ? expectedDate : new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    onOpenChange(false);
    toast.success(mode === 'reserve' ? `Bed ${bed.bedNumber} reserved` : `Bed ${bed.bedNumber} assigned`);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-slate-500">Ward</p>
            <p className="font-medium text-slate-900">{bed.ward}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Room</p>
            <p className="font-medium text-slate-900">{bed.room}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Bed</p>
            <p className="font-medium text-slate-900">{bed.bedNumber}</p>
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Patient *</FieldLabel>
          <PatientSelect selectedPatient={patient} onChange={setPatient} />
          {errors.patient && <FieldError>{errors.patient}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Admission Type *</FieldLabel>
            <Select value={admissionType} onValueChange={setAdmissionType}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.admissionType}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {admissionTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.admissionType && <FieldError>{errors.admissionType}</FieldError>}
          </div>
          {mode === 'reserve' && (
            <div className="space-y-1">
              <FieldLabel>Expected Admission Date *</FieldLabel>
              <ReceptionDatePicker date={expectedDate} onSelect={setExpectedDate} />
              {errors.expectedDate && <FieldError>{errors.expectedDate}</FieldError>}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <FieldLabel>Notes</FieldLabel>
          <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-16 resize-none" placeholder="Optional coordination notes..." />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>{mode === 'reserve' ? 'Reserve Bed' : 'Assign Bed'}</Button>
      </DialogFooter>
    </>
  );
}

export function BedAssignmentDialog({ bed, mode = 'assign', open, onOpenChange, onSave }) {
  if (!bed) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === 'reserve' ? 'Reserve Bed' : 'Assign Bed'}</DialogTitle>
          <DialogDescription>Coordinate bed {bed.bedNumber} in {bed.ward}. Nursing observations are managed separately.</DialogDescription>
        </DialogHeader>

        <BedAssignmentForm key={`${bed.id}-${mode}`} bed={bed} mode={mode} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
