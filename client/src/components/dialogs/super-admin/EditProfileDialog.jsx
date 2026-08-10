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

function EditProfileForm({ profile, onOpenChange, onSave }) {
  const [form, setForm] = useState({ firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!PHONE_REGEX.test(form.phone.trim())) nextErrors.phone = 'Enter a valid phone number';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      phone: form.phone.trim(),
    });
    onOpenChange(false);
    toast.success('Profile updated successfully');
  };

  return (
    <>
      <div className="space-y-4">
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
        </div>
        <div className="space-y-1">
          <FieldLabel>Phone *</FieldLabel>
          <Input value={form.phone} onChange={updateField('phone')} aria-invalid={!!errors.phone} />
          {errors.phone && <FieldError>{errors.phone}</FieldError>}
        </div>
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Email address changes require a secure verification workflow and are not available here.
        </p>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your name and contact phone number.</DialogDescription>
        </DialogHeader>

        <EditProfileForm key={open ? 'open' : 'closed'} profile={profile} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
