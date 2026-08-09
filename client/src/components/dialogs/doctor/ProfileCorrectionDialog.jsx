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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { profileCorrectionFields } from '@/data/doctor';

const fieldValueMap = {
  'Employee ID': (profile) => profile.employeeId,
  Role: (profile) => profile.role,
  Department: (profile) => profile.department,
  Specialization: (profile) => profile.specialization,
  'License Number': (profile) => profile.licenseNumber,
  'Joining Date': (profile) => profile.joiningDate,
  'Employment Status': (profile) => profile.employmentStatus,
  Qualification: (profile) => profile.qualification,
};

function CorrectionForm({ profile, defaultField, onOpenChange, onSubmit }) {
  const [field, setField] = useState(defaultField ?? profileCorrectionFields[0]);
  const [requestedValue, setRequestedValue] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  const currentValue = fieldValueMap[field]?.(profile) ?? '—';

  const handleSubmit = () => {
    const nextErrors = {};
    if (!requestedValue.trim()) nextErrors.requestedValue = 'Enter the corrected value';
    if (!reason.trim()) nextErrors.reason = 'Explain why this correction is needed';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({ field, currentValue, requestedValue: requestedValue.trim(), reason: reason.trim() });
    onOpenChange(false);
    toast.success('Correction request sent to the administrator');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Field to Correct</FieldLabel>
          <Select value={field} onValueChange={setField}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {profileCorrectionFields.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <FieldLabel>Current Value</FieldLabel>
          <Input value={currentValue} disabled />
        </div>

        <div className="space-y-1">
          <FieldLabel>Requested Value *</FieldLabel>
          <Input
            value={requestedValue}
            onChange={(event) => setRequestedValue(event.target.value)}
            aria-invalid={!!errors.requestedValue}
            placeholder="What should this field say instead?"
          />
          {errors.requestedValue && <FieldError>{errors.requestedValue}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Reason *</FieldLabel>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="min-h-20 resize-none"
            aria-invalid={!!errors.reason}
            placeholder="e.g. Department is incorrect, specialization needs updating..."
          />
          {errors.reason && <FieldError>{errors.reason}</FieldError>}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSubmit}>Submit Request</Button>
      </DialogFooter>
    </>
  );
}

export function ProfileCorrectionDialog({ profile, defaultField, open, onOpenChange, onSubmit }) {
  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request Profile Correction</DialogTitle>
          <DialogDescription>Your request will be sent to the hospital administrator for review.</DialogDescription>
        </DialogHeader>

        <CorrectionForm
          key={open ? 'open' : 'closed'}
          profile={profile}
          defaultField={defaultField}
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
