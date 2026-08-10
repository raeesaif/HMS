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
import { hospitalStatusOptions } from '@/data/superAdmin/hospitals';

function EditHospitalForm({ hospital, onOpenChange, onSave }) {
  const [form, setForm] = useState({
    name: hospital.name,
    email: hospital.email,
    phone: hospital.phone,
    address: hospital.address,
    status: hospital.status,
  });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Hospital name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(hospital.id, { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), address: form.address.trim(), status: form.status });
    onOpenChange(false);
    toast.success('Hospital updated successfully');
  };

  return (
    <>
      <div className="space-y-4">
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Hospital code, admin identity, and subscription plan cannot be changed here to prevent accidental data-ownership changes.
        </p>

        <div className="space-y-1">
          <FieldLabel>Hospital Name *</FieldLabel>
          <Input value={form.name} onChange={updateField('name')} aria-invalid={!!errors.name} />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div>
        <div className="space-y-1">
          <FieldLabel>Address</FieldLabel>
          <Textarea value={form.address} onChange={updateField('address')} className="min-h-16 resize-none" />
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

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogFooter>
    </>
  );
}

export function EditHospitalDialog({ hospital, open, onOpenChange, onSave }) {
  if (!hospital) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Hospital</DialogTitle>
          <DialogDescription>Update {hospital.name}&apos;s contact details and status.</DialogDescription>
        </DialogHeader>

        <EditHospitalForm key={hospital.id} hospital={hospital} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
