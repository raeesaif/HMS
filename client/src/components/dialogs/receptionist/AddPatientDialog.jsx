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
import { ReceptionDatePicker } from '@/components/reception/ReceptionDatePicker';
import { bloodGroupOptions, genderOptions } from '@/data/receptionistPatients';

const PHONE_REGEX = /^[+]?[\d\s-]{7,20}$/;

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!form.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
  if (!form.gender) errors.gender = 'Gender is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!PHONE_REGEX.test(form.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (!form.address.trim()) errors.address = 'Address is required';
  if (!form.bloodGroup) errors.bloodGroup = 'Blood group is required';
  if (!form.identification.trim()) errors.identification = 'Identification (CNIC/Passport) is required';
  if (!form.emergencyContactName.trim()) errors.emergencyContactName = 'Emergency contact name is required';
  if (!form.emergencyContactPhone.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required';
  return errors;
}

function AddPatientForm({ onOpenChange, onSave }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
    identification: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
  });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      bloodGroup: form.bloodGroup,
      identification: form.identification.trim(),
      emergencyContact: {
        name: form.emergencyContactName.trim(),
        relationship: form.emergencyContactRelationship.trim(),
        phone: form.emergencyContactPhone.trim(),
      },
    });
    onOpenChange(false);
    toast.success('Patient registered successfully');
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>First Name *</FieldLabel>
            <Input value={form.firstName} onChange={updateField('firstName')} aria-invalid={!!errors.firstName} />
            {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Last Name *</FieldLabel>
            <Input value={form.lastName} onChange={updateField('lastName')} aria-invalid={!!errors.lastName} />
            {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Date of Birth *</FieldLabel>
            <ReceptionDatePicker date={form.dateOfBirth} onSelect={(date) => setForm((prev) => ({ ...prev, dateOfBirth: date }))} />
            {errors.dateOfBirth && <FieldError>{errors.dateOfBirth}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Gender *</FieldLabel>
            <Select value={form.gender} onValueChange={(value) => setForm((prev) => ({ ...prev, gender: value }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.gender}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && <FieldError>{errors.gender}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Phone *</FieldLabel>
            <Input value={form.phone} onChange={updateField('phone')} aria-invalid={!!errors.phone} placeholder="+92 300 1234567" />
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" value={form.email} onChange={updateField('email')} placeholder="patient@example.com" />
          </div>
          <div className="space-y-1">
            <FieldLabel>Blood Group *</FieldLabel>
            <Select value={form.bloodGroup} onValueChange={(value) => setForm((prev) => ({ ...prev, bloodGroup: value }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.bloodGroup}>
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
          <div className="space-y-1">
            <FieldLabel>Identification (CNIC/Passport) *</FieldLabel>
            <Input value={form.identification} onChange={updateField('identification')} aria-invalid={!!errors.identification} />
            {errors.identification && <FieldError>{errors.identification}</FieldError>}
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Address *</FieldLabel>
          <Textarea value={form.address} onChange={updateField('address')} aria-invalid={!!errors.address} className="min-h-16 resize-none" />
          {errors.address && <FieldError>{errors.address}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1 sm:col-span-1">
            <FieldLabel>Emergency Contact Name *</FieldLabel>
            <Input value={form.emergencyContactName} onChange={updateField('emergencyContactName')} aria-invalid={!!errors.emergencyContactName} />
            {errors.emergencyContactName && <FieldError>{errors.emergencyContactName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Relationship</FieldLabel>
            <Input value={form.emergencyContactRelationship} onChange={updateField('emergencyContactRelationship')} placeholder="e.g. Spouse" />
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
        <Button onClick={handleSave}>Register Patient</Button>
      </DialogFooter>
    </>
  );
}

export function AddPatientDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Register New Patient</DialogTitle>
          <DialogDescription>
            Enter demographic and contact details. Clinical information is recorded separately by medical staff.
          </DialogDescription>
        </DialogHeader>

        <AddPatientForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
