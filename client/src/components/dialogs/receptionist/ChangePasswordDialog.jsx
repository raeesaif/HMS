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
import { useUpdatePassword } from '@/hooks/useAuth';

function getPasswordStrength(password) {
  if (!password) return { label: '', className: '' };
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { label: 'Weak', className: 'text-rose-600' };
  if (score <= 3) return { label: 'Medium', className: 'text-amber-600' };
  return { label: 'Strong', className: 'text-emerald-600' };
}

function validate(form) {
  const errors = {};
  if (!form.currentPassword) errors.currentPassword = 'Current password is required';
  if (!form.newPassword) errors.newPassword = 'New password is required';
  else if (form.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
  else if (form.newPassword === form.currentPassword) errors.newPassword = 'New password must be different from the current password';
  if (!form.confirmPassword) errors.confirmPassword = 'Please confirm your new password';
  else if (form.confirmPassword !== form.newPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
}

function PasswordForm({ onOpenChange, onSave }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const strength = getPasswordStrength(form.newPassword);
  const updatePasswordMutation = useUpdatePassword();

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    updatePasswordMutation.mutate(
      { currentPassword: form.currentPassword, newPassword: form.newPassword },
      {
        onSuccess: () => {
          onSave?.();
          onOpenChange(false);
          toast.success('Password updated successfully');
        },
        onError: (error) => {
          setErrors({ currentPassword: error.response?.data?.message ?? 'Failed to update password' });
        },
      }
    );
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Current Password *</FieldLabel>
          <Input type="password" value={form.currentPassword} onChange={updateField('currentPassword')} aria-invalid={!!errors.currentPassword} />
          {errors.currentPassword && <FieldError>{errors.currentPassword}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>New Password *</FieldLabel>
          <Input type="password" value={form.newPassword} onChange={updateField('newPassword')} aria-invalid={!!errors.newPassword} />
          {form.newPassword && !errors.newPassword && (
            <p className={`text-xs font-medium ${strength.className}`}>Password strength: {strength.label}</p>
          )}
          {errors.newPassword && <FieldError>{errors.newPassword}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Confirm New Password *</FieldLabel>
          <Input type="password" value={form.confirmPassword} onChange={updateField('confirmPassword')} aria-invalid={!!errors.confirmPassword} />
          {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave} disabled={updatePasswordMutation.isPending}>
          {updatePasswordMutation.isPending ? 'Updating…' : 'Update Password'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function ChangePasswordDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Choose a strong password you haven&apos;t used before.</DialogDescription>
        </DialogHeader>

        <PasswordForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
