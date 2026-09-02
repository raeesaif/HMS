import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
import { useDepartments } from '@/hooks/useDepartments';
import { useSpecialties } from '@/hooks/useSpecialties';
import { useRegister } from '@/hooks/useAuth';

const getDefaultValues = () => ({
  firstName: '',
  lastName: '',
  specialty: '',
  department: '',
  licenseNumber: '',
  qualification: '',
  experience: '',
  email: '',
  phone: '',
  shiftStart: '',
  shiftEnd: '',
});

const AddDoctorDialog = ({ open, onOpenChange, onAdd }) => {
  const { data: departments = [] } = useDepartments();
  const { data: specialties = [] } = useSpecialties();
  const registerMutation = useRegister();
  const queryClient = useQueryClient();

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
    registerMutation.mutate(
      { ...data, role: 'doctor' },
      {
        onSuccess: (user) => {
          onAdd?.({ ...data, id: user.id, userId: user.userId });
          queryClient.invalidateQueries({ queryKey: ['doctors'] });
          toast.success(`Dr. ${data.firstName} ${data.lastName} was added to staff`);
          reset(getDefaultValues());
          onOpenChange?.(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message ?? 'Failed to add doctor');
        },
      }
    );
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
          <DialogDescription>
            Enter the doctor's profile and shift details. Login credentials are emailed
            automatically.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-doctor-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1">
            <FieldLabel>First Name</FieldLabel>
            <Input {...register('firstName')} placeholder="e.g. Kwame" />
            {errors.firstName && (
              <p className="text-destructive text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Last Name</FieldLabel>
            <Input {...register('lastName')} placeholder="e.g. Boateng" />
            {errors.lastName && (
              <p className="text-destructive text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <SelectField label="Specialty" error={errors.specialty} {...register('specialty')}>
            <option value="" disabled>
              Select specialty
            </option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </SelectField>

          <SelectField label="Department" error={errors.department} {...register('department')}>
            <option value="" disabled>
              Select department
            </option>
            {departments.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>License Number</FieldLabel>
            <Input {...register('licenseNumber')} placeholder="e.g. GMC-4821" />
            {errors.licenseNumber && (
              <p className="text-destructive text-sm">{errors.licenseNumber.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Qualification</FieldLabel>
            <Input {...register('qualification')} placeholder="e.g. MBBS, MD" />
            {errors.qualification && (
              <p className="text-destructive text-sm">{errors.qualification.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Experience (years)</FieldLabel>
            <Input {...register('experience')} type="number" min="0" placeholder="e.g. 8" />
            {errors.experience && (
              <p className="text-destructive text-sm">{errors.experience.message}</p>
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
        </form>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" form="add-doctor-form" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Adding…' : 'Add Doctor'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;
