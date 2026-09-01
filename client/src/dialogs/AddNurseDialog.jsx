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
import { NurseSchema } from '@/schema/StaffSchema';
import { useDepartments } from '@/hooks/useDepartments';
import { useRegister } from '@/hooks/useAuth';

const getDefaultValues = () => ({
  firstName: '',
  lastName: '',
  department: '',
  ward: '',
  licenseNumber: '',
  email: '',
  phone: '',
  shiftStart: '',
  shiftEnd: '',
});

const AddNurseDialog = ({ open, onOpenChange, onAdd }) => {
  const { data: departments = [] } = useDepartments();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(NurseSchema),
  });

  const onSubmit = (data) => {
    registerMutation.mutate(
      { ...data, role: 'nurse' },
      {
        onSuccess: (user) => {
          onAdd?.({ ...data, id: user.id, userId: user.userId });
          toast.success(`${data.firstName} ${data.lastName} was added to staff`);
          reset(getDefaultValues());
          onOpenChange?.(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message ?? 'Failed to add nurse');
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
          <DialogTitle>Add Nurse</DialogTitle>
          <DialogDescription>
            Enter the nurse's profile and shift details. Login credentials are emailed
            automatically.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-nurse-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1">
            <FieldLabel>First Name</FieldLabel>
            <Input {...register('firstName')} placeholder="e.g. Abena" />
            {errors.firstName && (
              <p className="text-destructive text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Last Name</FieldLabel>
            <Input {...register('lastName')} placeholder="e.g. Mensah" />
            {errors.lastName && (
              <p className="text-destructive text-sm">{errors.lastName.message}</p>
            )}
          </div>

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
            <FieldLabel>Ward / Unit</FieldLabel>
            <Input {...register('ward')} placeholder="e.g. ICU, Ward 3" />
            {errors.ward && (
              <p className="text-destructive text-sm">{errors.ward.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>License Number</FieldLabel>
            <Input {...register('licenseNumber')} placeholder="e.g. RN-2031" />
            {errors.licenseNumber && (
              <p className="text-destructive text-sm">{errors.licenseNumber.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <Input {...register('email')} type="email" placeholder="nurse@hms.com" />
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
          <Button type="submit" form="add-nurse-form" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Adding…' : 'Add Nurse'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNurseDialog;
