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
import { Button } from '@/components/ui/button';

const PHONE_REGEX = /^[+]?[\d\s-]{7,20}$/;

function validate(form) {
  const errors = {};
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!PHONE_REGEX.test(form.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (!form.address.trim()) errors.address = 'Address is required';
  if (!form.emergencyContactName.trim()) errors.emergencyContactName = 'Emergency contact name is required';
  if (!form.emergencyContactPhone.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required';
  else if (!PHONE_REGEX.test(form.emergencyContactPhone.trim())) errors.emergencyContactPhone = 'Enter a valid phone number';
  return errors;
}

function EditProfileForm({ profile, onOpenChange, onSave }) {
  const [form, setForm] = useState({
    phone: profile.phone,
    address: profile.address,
    emergencyContactName: profile.emergencyContact.name,
    emergencyContactRelationship: profile.emergencyContact.relationship,
    emergencyContactPhone: profile.emergencyContact.phone,
  });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      phone: form.phone.trim(),
      address: form.address.trim(),
      emergencyContact: {
        ...profile.emergencyContact,
        name: form.emergencyContactName.trim(),
        relationship: form.emergencyContactRelationship.trim(),
        phone: form.emergencyContactPhone.trim(),
      },
    });
    onOpenChange(false);
    toast.success('Profile updated successfully');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Phone Number *</FieldLabel>
          <Input value={form.phone} onChange={updateField('phone')} aria-invalid={!!errors.phone} placeholder="+92 300 1234567" />
          {errors.phone && <FieldError>{errors.phone}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Address *</FieldLabel>
          <Input value={form.address} onChange={updateField('address')} aria-invalid={!!errors.address} />
          {errors.address && <FieldError>{errors.address}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Emergency Contact Name *</FieldLabel>
            <Input value={form.emergencyContactName} onChange={updateField('emergencyContactName')} aria-invalid={!!errors.emergencyContactName} />
            {errors.emergencyContactName && <FieldError>{errors.emergencyContactName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Relationship *</FieldLabel>
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
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogFooter>
    </>
  );
}

export function EditProfileDialog({ profile, open, onOpenChange, onSave }) {
  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update the personal details you&apos;re permitted to manage. Employment details are controlled by Admin.</DialogDescription>
        </DialogHeader>

        <EditProfileForm key={open ? 'open' : 'closed'} profile={profile} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
