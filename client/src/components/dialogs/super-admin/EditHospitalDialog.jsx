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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hospitalStatusOptions } from '@/data/superAdmin/hospitals';

function EditHospitalForm({ hospital, onSave, isSubmitting }) {
  const [form, setForm] = useState({
    name: hospital.name ?? '',
    email: hospital.email ?? '',
    phone: hospital.phone ?? '',
    addressLine1: hospital.addressLine1 ?? '',
    addressLine2: hospital.addressLine2 ?? '',
    city: hospital.city ?? '',
    state: hospital.state ?? '',
    country: hospital.country ?? '',
    postalCode: hospital.postalCode ?? '',
    status: hospital.status,
    adminFirstName: hospital.adminFirstName ?? '',
    adminLastName: hospital.adminLastName ?? '',
    adminEmail: hospital.adminEmail ?? '',
    adminPhone: hospital.adminPhone ?? '',
  });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    if (isSubmitting) return;

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Hospital name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
    if (!form.city.trim()) nextErrors.city = 'City is required';
    if (!form.country.trim()) nextErrors.country = 'Country is required';
    if (!form.adminFirstName.trim()) nextErrors.adminFirstName = 'Admin first name is required';
    if (!form.adminLastName.trim()) nextErrors.adminLastName = 'Admin last name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.adminEmail.trim())) nextErrors.adminEmail = 'Enter a valid admin email address';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      hospitalName: form.name.trim(),
      hospitalEmail: form.email.trim(),
      hospitalPhone: form.phone.trim(),
      address: {
        addressLine1: form.addressLine1.trim() || undefined,
        addressLine2: form.addressLine2.trim() || undefined,
        city: form.city.trim(),
        state: form.state.trim() || undefined,
        country: form.country.trim(),
        postalCode: form.postalCode.trim() || undefined,
      },
      status: form.status.toLowerCase(),
      admin: {
        firstName: form.adminFirstName.trim(),
        lastName: form.adminLastName.trim(),
        email: form.adminEmail.trim(),
        phone: form.adminPhone.trim() || undefined,
      },
    });
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Hospital code and subscription plan cannot be changed here to prevent accidental data-ownership changes.
        </p>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Hospital Information</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Hospital Name *</FieldLabel>
              <Input value={form.name} onChange={updateField('name')} aria-invalid={!!errors.name} />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Email *</FieldLabel>
              <Input type="email" value={form.email} onChange={updateField('email')} aria-invalid={!!errors.email} />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Phone *</FieldLabel>
              <Input value={form.phone} onChange={updateField('phone')} aria-invalid={!!errors.phone} />
              {errors.phone && <FieldError>{errors.phone}</FieldError>}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Address Line 1</FieldLabel>
              <Input value={form.addressLine1} onChange={updateField('addressLine1')} />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Address Line 2</FieldLabel>
              <Input value={form.addressLine2} onChange={updateField('addressLine2')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>City *</FieldLabel>
              <Input value={form.city} onChange={updateField('city')} aria-invalid={!!errors.city} />
              {errors.city && <FieldError>{errors.city}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>State / Province</FieldLabel>
              <Input value={form.state} onChange={updateField('state')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Country *</FieldLabel>
              <Input value={form.country} onChange={updateField('country')} aria-invalid={!!errors.country} />
              {errors.country && <FieldError>{errors.country}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Postal Code</FieldLabel>
              <Input value={form.postalCode} onChange={updateField('postalCode')} />
            </div>
            <div className="space-y-1 sm:w-48">
              <FieldLabel>Status</FieldLabel>
              <Select value={form.status} onValueChange={(value) => setForm((prev) => ({ ...prev, status: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hospitalStatusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Hospital Admin</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <FieldLabel>Admin First Name *</FieldLabel>
              <Input value={form.adminFirstName} onChange={updateField('adminFirstName')} aria-invalid={!!errors.adminFirstName} />
              {errors.adminFirstName && <FieldError>{errors.adminFirstName}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Admin Last Name *</FieldLabel>
              <Input value={form.adminLastName} onChange={updateField('adminLastName')} aria-invalid={!!errors.adminLastName} />
              {errors.adminLastName && <FieldError>{errors.adminLastName}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Admin Email *</FieldLabel>
              <Input type="email" value={form.adminEmail} onChange={updateField('adminEmail')} aria-invalid={!!errors.adminEmail} />
              {errors.adminEmail && <FieldError>{errors.adminEmail}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Admin Phone</FieldLabel>
              <Input value={form.adminPhone} onChange={updateField('adminPhone')} />
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" disabled={isSubmitting} />}>Cancel</DialogClose>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function EditHospitalDialog({ hospital, open, onOpenChange, onSave, isSubmitting = false }) {
  if (!hospital) return null;

  const handleSave = async (payload) => {
    try {
      await onSave(hospital.id, payload);
      onOpenChange(false);
      toast.success('Hospital updated successfully');
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update hospital. Please try again.';
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (isSubmitting ? null : onOpenChange(next))}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Hospital</DialogTitle>
          <DialogDescription>Update {hospital.name}&apos;s contact, status, and admin details.</DialogDescription>
        </DialogHeader>

        <EditHospitalForm key={hospital.id} hospital={hospital} onSave={handleSave} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
