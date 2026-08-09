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
import { bloodGroupOptions } from '@/data/receptionistPatients';

const PHONE_REGEX = /^[+]?[\d\s-]{7,20}$/;

function validate(form) {
  const errors = {};
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!PHONE_REGEX.test(form.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (!form.address.trim()) errors.address = 'Address is required';
  if (!form.bloodGroup) errors.bloodGroup = 'Blood group is required';
  if (!form.emergencyContactName.trim()) errors.emergencyContactName = 'Emergency contact name is required';
  if (!form.emergencyContactPhone.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required';
  return errors;
}

function EditPatientForm({ patient, onOpenChange, onSave }) {
  const [form, setForm] = useState({
    phone: patient.phone,
    email: patient.email ?? '',
    address: patient.address,
    bloodGroup: patient.bloodGroup,
    emergencyContactName: patient.emergencyContact?.name ?? '',
    emergencyContactRelationship: patient.emergencyContact?.relationship ?? '',
    emergencyContactPhone: patient.emergencyContact?.phone ?? '',
  });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(patient.id, {
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      bloodGroup: form.bloodGroup,
      emergencyContact: {
        name: form.emergencyContactName.trim(),
        relationship: form.emergencyContactRelationship.trim(),
        phone: form.emergencyContactPhone.trim(),
      },
    });
    onOpenChange(false);
    toast.success('Patient details updated');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Phone *</FieldLabel>
            <Input value={form.phone} onChange={updateField('phone')} aria-invalid={!!errors.phone} />
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" value={form.email} onChange={updateField('email')} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Blood Group *</FieldLabel>
            <Select value={form.bloodGroup} onValueChange={(value) => setForm((prev) => ({ ...prev, bloodGroup: value }))}>
              <SelectTrigger className="w-full sm:w-48" aria-invalid={!!errors.bloodGroup}>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroupOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bloodGroup && <FieldError>{errors.bloodGroup}</FieldError>}
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Address *</FieldLabel>
          <Textarea value={form.address} onChange={updateField('address')} aria-invalid={!!errors.address} className="min-h-16 resize-none" />
          {errors.address && <FieldError>{errors.address}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <FieldLabel>Emergency Contact Name *</FieldLabel>
            <Input value={form.emergencyContactName} onChange={updateField('emergencyContactName')} aria-invalid={!!errors.emergencyContactName} />
            {errors.emergencyContactName && <FieldError>{errors.emergencyContactName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Relationship</FieldLabel>
            <Input value={form.emergencyContactRelationship} onChange={updateField('emergencyContactRelationship')} />
          </div>
          <div className="space-y-1">
            <FieldLabel>Emergency Contact Phone *</FieldLabel>
            <Input value={form.emergencyContactPhone} onChange={updateField('emergencyContactPhone')} aria-invalid={!!errors.emergencyContactPhone} />
            {errors.emergencyContactPhone && <FieldError>{errors.emergencyContactPhone}</FieldError>}
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogFooter>
    </>
  );
}

export function EditPatientDialog({ patient, open, onOpenChange, onSave }) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Patient Details</DialogTitle>
          <DialogDescription>
            Update {patient.name}&apos;s contact and demographic information. Clinical records cannot be edited here.
          </DialogDescription>
        </DialogHeader>

        <EditPatientForm key={patient.id} patient={patient} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
