import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { SelectField } from '@/components/ui/select-field';
import { DoctorSchema } from '@/schema/StaffSchema';
import { DEPARTMENTS } from '@/constants/patient';
import { STAFF_STATUSES } from '@/constants/staff';

const getDefaultValues = () => ({
  name: '',
  specialty: '',
  department: '',
  license: '',
  email: '',
  phone: '',
  shiftStart: '',
  shiftEnd: '',
  status: 'On duty',
});

const AddDoctorDialog = ({ open, onOpenChange, onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(DoctorSchema),
  });

  const onSubmit = (data) => {
    onAdd?.(data);
    toast.success(`Dr. ${data.name} was added to staff`);
    reset(getDefaultValues());
    onOpenChange?.(false);
  };

  const handleOpenChange = (next) => {
    onOpenChange?.(next);
    if (!next) reset(getDefaultValues());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Doctor</DialogTitle>
          <DialogDescription>Enter the doctor's profile and shift details.</DialogDescription>
        </DialogHeader>

        <form
          id="add-doctor-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Full Name</FieldLabel>
            <Input {...register('name')} placeholder="e.g. Kwame Boateng" />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Specialty</FieldLabel>
            <Input {...register('specialty')} placeholder="e.g. Cardiologist" />
            {errors.specialty && (
              <p className="text-destructive text-sm">{errors.specialty.message}</p>
            )}
          </div>

          <SelectField label="Department" error={errors.department} {...register('department')}>
            <option value="" disabled>
              Select department
            </option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>License Number</FieldLabel>
            <Input {...register('license')} placeholder="e.g. GMC-4821" />
            {errors.license && (
              <p className="text-destructive text-sm">{errors.license.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <Input {...register('email')} type="email" placeholder="doctor@hms.com" />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Phone</FieldLabel>
            <Input {...register('phone')} placeholder="+233 20 111 2233" />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Shift Start</FieldLabel>
            <Input {...register('shiftStart')} type="time" />
            {errors.shiftStart && (
              <p className="text-destructive text-sm">{errors.shiftStart.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Shift End</FieldLabel>
            <Input {...register('shiftEnd')} type="time" />
            {errors.shiftEnd && (
              <p className="text-destructive text-sm">{errors.shiftEnd.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <SelectField label="Status" error={errors.status} {...register('status')}>
              {STAFF_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </SelectField>
          </div>
        </form>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" form="add-doctor-form">
            Add Doctor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;
