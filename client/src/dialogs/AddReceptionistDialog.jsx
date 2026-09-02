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
import { ReceptionistSchema } from '@/schema/StaffSchema';
import { useRegister } from '@/hooks/useAuth';

const getDefaultValues = () => ({
  firstName: '',
  lastName: '',
  staffDepartment: '',
  email: '',
  phone: '',
  shiftStart: '',
  shiftEnd: '',
});

const AddReceptionistDialog = ({ open, onOpenChange, onAdd }) => {
  const registerMutation = useRegister();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(ReceptionistSchema),
  });

  const onSubmit = (data) => {
    registerMutation.mutate(
      { ...data, role: 'receptionist' },
      {
        onSuccess: (user) => {
          onAdd?.({ ...data, id: user.id, userId: user.userId });
          queryClient.invalidateQueries({ queryKey: ['receptionists'] });
          toast.success(`${data.firstName} ${data.lastName} was added to staff`);
          reset(getDefaultValues());
          onOpenChange?.(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message ?? 'Failed to add receptionist');
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
          <DialogTitle>Add Receptionist</DialogTitle>
          <DialogDescription>
            Enter the receptionist's profile and shift details. Login credentials are emailed
            automatically.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-receptionist-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1">
            <FieldLabel>First Name</FieldLabel>
            <Input {...register('firstName')} placeholder="e.g. Efua" />
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

          <div className="space-y-1">
            <FieldLabel>Staff Department</FieldLabel>
            <Input {...register('staffDepartment')} placeholder="e.g. Front Desk" />
            {errors.staffDepartment && (
              <p className="text-destructive text-sm">{errors.staffDepartment.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <Input {...register('email')} type="email" placeholder="reception@hms.com" />
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
          <Button
            type="submit"
            form="add-receptionist-form"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Adding…' : 'Add Receptionist'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReceptionistDialog;
