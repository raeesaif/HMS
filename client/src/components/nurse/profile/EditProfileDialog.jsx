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
import { ProfileAvatar } from './ProfileAvatar';

function EditProfileForm({ profile, onOpenChange, onSave, onChangePhoto }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const [form, setForm] = useState({
    phone: profile.phone,
    address: profile.address,
    emergencyContactName: profile.emergencyContact.name,
    emergencyContactRelationship: profile.emergencyContact.relationship,
    emergencyContactPhone: profile.emergencyContact.phone,
    emergencyContactAddress: profile.emergencyContact.address,
  });

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(form);
    toast.success('Profile updated successfully');
    onOpenChange(false);
  };

  return (
    <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <FieldLabel>Profile Picture</FieldLabel>
        <div className="flex items-center gap-3">
          <ProfileAvatar name={fullName} avatarUrl={profile.avatarUrl} sizeClassName="size-14" />
          <Button type="button" variant="outline" size="sm" onClick={onChangePhoto}>
            Change Photo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <FieldLabel>Phone Number</FieldLabel>
          <Input value={form.phone} onChange={updateField('phone')} placeholder="+233 20 111 2233" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <FieldLabel>Address</FieldLabel>
          <Textarea value={form.address} onChange={updateField('address')} className="min-h-16 resize-none" />
        </div>
      </div>

      <div className="space-y-3 border-t border-slate-200 pt-4">
        <p className="text-sm font-semibold text-slate-900">Emergency Contact</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Contact Name</FieldLabel>
            <Input value={form.emergencyContactName} onChange={updateField('emergencyContactName')} />
          </div>
          <div className="space-y-1">
            <FieldLabel>Relationship</FieldLabel>
            <Input value={form.emergencyContactRelationship} onChange={updateField('emergencyContactRelationship')} />
          </div>
          <div className="space-y-1">
            <FieldLabel>Phone Number</FieldLabel>
            <Input value={form.emergencyContactPhone} onChange={updateField('emergencyContactPhone')} />
          </div>
          <div className="space-y-1">
            <FieldLabel>Address</FieldLabel>
            <Input value={form.emergencyContactAddress} onChange={updateField('emergencyContactAddress')} />
          </div>
        </div>
      </div>
    </form>
  );
}

export function EditProfileDialog({ profile, open, onOpenChange, onSave, onChangePhoto }) {
  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your contact details and emergency contact information.</DialogDescription>
        </DialogHeader>

        <EditProfileForm
          key={profile.employeeId}
          profile={profile}
          onOpenChange={onOpenChange}
          onSave={onSave}
          onChangePhoto={onChangePhoto}
        />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="edit-profile-form">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
