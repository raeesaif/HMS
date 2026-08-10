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
import { userRoleOptions, userStatusOptions } from '@/data/superAdmin/users';

function EditUserForm({ user, onOpenChange, onSave }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, role: user.role, status: user.status });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(user.id, { name: form.name.trim(), email: form.email.trim(), role: form.role, status: form.status });
    onOpenChange(false);
    toast.success('User updated successfully');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Name *</FieldLabel>
          <Input value={form.name} onChange={updateField('name')} aria-invalid={!!errors.name} />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </div>
        <div className="space-y-1">
          <FieldLabel>Email *</FieldLabel>
          <Input type="email" value={form.email} onChange={updateField('email')} aria-invalid={!!errors.email} />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Role</FieldLabel>
            <Select value={form.role} onValueChange={(value) => setForm((prev) => ({ ...prev, role: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {userRoleOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <Select value={form.status} onValueChange={(value) => setForm((prev) => ({ ...prev, status: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {userStatusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export function EditUserDialog({ user, open, onOpenChange, onSave }) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update {user.name}&apos;s account details.</DialogDescription>
        </DialogHeader>

        <EditUserForm key={user.id} user={user} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
