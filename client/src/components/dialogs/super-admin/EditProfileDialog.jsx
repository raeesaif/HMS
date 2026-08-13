import { useState } from 'react';
import { toast } from 'sonner';
import { Image as ImageIcon, Trash2, Upload } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PHONE_REGEX = /^[+]?[\d\s-]{7,20}$/;

function EditProfileForm({ profile, onOpenChange, onSave }) {
  const [form, setForm] = useState({ firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone });
  const [preview, setPreview] = useState(profile.profileImage);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, or WEBP)');
      return;
    }
    setPreview(URL.createObjectURL(selected));
  };

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
      profileImage: preview,
    });
    onOpenChange(false);
    toast.success('Profile updated successfully');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar size="lg" className="size-24">
            {preview && <AvatarImage src={preview} alt={profile.name} />}
            <AvatarFallback className="bg-sky-100 text-2xl text-sky-600">{profile.avatarInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap justify-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
              <Upload className="size-4" />
              Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            {preview && (
              <Button type="button" variant="outline" onClick={() => setPreview(null)}>
                <Trash2 /> Remove
              </Button>
            )}
          </div>
          <p className="flex items-center gap-1 text-center text-xs text-slate-500">
            <ImageIcon className="size-3.5" />
            Supports PNG, JPG, or WEBP up to 5MB.
          </p>
        </div>

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
