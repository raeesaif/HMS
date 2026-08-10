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
import { plans } from '@/data/superAdmin/subscriptionPlans';

function CreateHospitalForm({ onOpenChange, onSave, isSubmitting }) {
  const [form, setForm] = useState({
    name: '',
    code: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    plan: '',
    trialDays: '14',
    status: 'Trial',
  });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Hospital name is required';
    if (!form.code.trim()) nextErrors.code = 'Hospital code is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
    if (!form.city.trim()) nextErrors.city = 'City is required';
    if (!form.country.trim()) nextErrors.country = 'Country is required';
    if (!form.adminFirstName.trim()) nextErrors.adminFirstName = 'Admin first name is required';
    if (!form.adminLastName.trim()) nextErrors.adminLastName = 'Admin last name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.adminEmail.trim())) nextErrors.adminEmail = 'Enter a valid admin email address';
    if (!form.plan) nextErrors.plan = 'Select a subscription plan';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      ...form,
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      email: form.email.trim(),
      users: { admins: 1, doctors: 0, nurses: 0, receptionists: 0, patients: 0 },
      registrationDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastActivity: '—',
    });
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Hospital Name *</FieldLabel>
            <Input value={form.name} onChange={updateField('name')} aria-invalid={!!errors.name} />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Hospital Code *</FieldLabel>
            <Input value={form.code} onChange={updateField('code')} placeholder="e.g. MCGH" aria-invalid={!!errors.code} />
            {errors.code && <FieldError>{errors.code}</FieldError>}
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
            <FieldLabel>Address</FieldLabel>
            <Input value={form.address} onChange={updateField('address')} />
          </div>
          <div className="space-y-1">
            <FieldLabel>City *</FieldLabel>
            <Input value={form.city} onChange={updateField('city')} aria-invalid={!!errors.city} />
            {errors.city && <FieldError>{errors.city}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Country *</FieldLabel>
            <Input value={form.country} onChange={updateField('country')} aria-invalid={!!errors.country} />
            {errors.country && <FieldError>{errors.country}</FieldError>}
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
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Admin Email *</FieldLabel>
              <Input type="email" value={form.adminEmail} onChange={updateField('adminEmail')} aria-invalid={!!errors.adminEmail} />
              {errors.adminEmail && <FieldError>{errors.adminEmail}</FieldError>}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <FieldLabel>Subscription Plan *</FieldLabel>
              <Select value={form.plan} onValueChange={(value) => setForm((prev) => ({ ...prev, plan: value }))}>
                <SelectTrigger className="w-full" aria-invalid={!!errors.plan}>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.name}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.plan && <FieldError>{errors.plan}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Trial Period (days)</FieldLabel>
              <Input type="number" min="0" value={form.trialDays} onChange={updateField('trialDays')} />
            </div>
            <div className="space-y-1">
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
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Hospital'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function CreateHospitalDialog({ open, onOpenChange, onSave, isSubmitting = false }) {
  const handleSave = (payload) => {
    onSave(payload);
    onOpenChange(false);
    toast.success('Hospital created successfully');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Hospital</DialogTitle>
          <DialogDescription>Register a new hospital on the platform.</DialogDescription>
        </DialogHeader>

        <CreateHospitalForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={handleSave} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
