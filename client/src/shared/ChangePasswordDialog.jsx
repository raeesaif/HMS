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
import { Button } from '@/components/ui/button';

const emptyForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

function ChangePasswordForm({ onOpenChange, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setError('');
    onSubmit?.();
    toast.success('Password updated successfully');
    onOpenChange(false);
  };

  return (
    <form id="change-password-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <FieldLabel>Current Password</FieldLabel>
        <Input type="password" value={form.currentPassword} onChange={updateField('currentPassword')} placeholder="••••••••" />
      </div>
      <div className="space-y-1">
        <FieldLabel>New Password</FieldLabel>
        <Input type="password" value={form.newPassword} onChange={updateField('newPassword')} placeholder="At least 8 characters" />
      </div>
      <div className="space-y-1">
        <FieldLabel>Confirm Password</FieldLabel>
        <Input type="password" value={form.confirmPassword} onChange={updateField('confirmPassword')} placeholder="Re-enter new password" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}

export function ChangePasswordDialog({ open, onOpenChange, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Choose a strong password you haven't used before.</DialogDescription>
        </DialogHeader>

        <ChangePasswordForm onOpenChange={onOpenChange} onSubmit={onSubmit} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="change-password-form">Update Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
