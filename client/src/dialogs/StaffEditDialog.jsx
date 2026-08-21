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
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select-field';
import { STAFF_STATUSES } from '@/constants/staff';

const TYPE_LABEL = {
  doctor: 'Doctor',
  nurse: 'Nurse',
  receptionist: 'Receptionist',
};

const StaffEditForm = ({ member, onOpenChange, onSave }) => {
  const [form, setForm] = useState(member);
  const isProfessional = member.type === 'doctor' || member.type === 'nurse';

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(form);
    toast.success(`${form.name}'s profile was updated`);
    onOpenChange?.(false);
  };

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Edit {TYPE_LABEL[member.type] ?? 'Staff'} Profile</DialogTitle>
        <DialogDescription>Update {member.name}'s profile and shift details.</DialogDescription>
      </DialogHeader>

      <form id="staff-edit-form" onSubmit={handleSubmit} className="max-h-[65vh] space-y-5 overflow-y-auto pr-1">
        <section className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Basic Information
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <FieldLabel>Full Name</FieldLabel>
              <Input value={form.name} onChange={handleChange('name')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Role / Specialty</FieldLabel>
              <Input value={form.role} onChange={handleChange('role')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Department</FieldLabel>
              <Input value={form.department} onChange={handleChange('department')} />
            </div>
          </div>
        </section>

        {isProfessional && (
          <section className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Professional Details
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <FieldLabel>Qualification</FieldLabel>
                <Input
                  value={form.qualification ?? ''}
                  onChange={handleChange('qualification')}
                  placeholder="e.g. MBBS, FCPS"
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Experience</FieldLabel>
                <Input
                  value={form.experience ?? ''}
                  onChange={handleChange('experience')}
                  placeholder="e.g. 8 years"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel>License Number</FieldLabel>
                <Input
                  value={form.licenseNumber ?? ''}
                  onChange={handleChange('licenseNumber')}
                  placeholder="e.g. GMC-48213"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel>Bio</FieldLabel>
                <Textarea
                  value={form.bio ?? ''}
                  onChange={handleChange('bio')}
                  placeholder="Short professional summary"
                  rows={3}
                />
              </div>
            </div>
          </section>
        )}

        <section className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Duty & Contact
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <FieldLabel>Working Hours</FieldLabel>
              <Input
                value={form.shift}
                onChange={handleChange('shift')}
                placeholder="e.g. 08:00 – 16:00"
              />
            </div>
            <SelectField label="Status" value={form.status} onChange={handleChange('status')}>
              {STAFF_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </SelectField>
            <div className="space-y-1">
              <FieldLabel>Email</FieldLabel>
              <Input type="email" value={form.email} onChange={handleChange('email')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Phone</FieldLabel>
              <Input value={form.phone} onChange={handleChange('phone')} />
            </div>
          </div>
        </section>
      </form>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button type="submit" form="staff-edit-form">
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const StaffEditDialog = ({ open, onOpenChange, member, onSave }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {member && (
        <StaffEditForm key={member.id} member={member} onOpenChange={onOpenChange} onSave={onSave} />
      )}
    </Dialog>
  );
};

export default StaffEditDialog;
