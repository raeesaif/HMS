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
import { ReceptionistSchema } from '@/schema/StaffSchema';
import { STAFF_STATUSES } from '@/constants/staff';

const getDefaultValues = () => ({
  name: '',
  desk: '',
  employeeId: '',
  email: '',
  phone: '',
  shiftStart: '',
  shiftEnd: '',
  status: 'On duty',
});

const AddReceptionistDialog = ({ open, onOpenChange, onAdd }) => {
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
    onAdd?.(data);
    toast.success(`${data.name} was added to staff`);
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
          <DialogTitle>Add Receptionist</DialogTitle>
          <DialogDescription>
            Enter the receptionist's profile and shift details.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-receptionist-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Full Name</FieldLabel>
            <Input {...register('name')} placeholder="e.g. Efua Mensah" />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Desk / Location</FieldLabel>
            <Input {...register('desk')} placeholder="e.g. Front Desk" />
            {errors.desk && (
              <p className="text-destructive text-sm">{errors.desk.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Employee ID</FieldLabel>
            <Input {...register('employeeId')} placeholder="e.g. EMP-4471" />
            {errors.employeeId && (
              <p className="text-destructive text-sm">{errors.employeeId.message}</p>
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
          <Button type="submit" form="add-receptionist-form">
            Add Receptionist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReceptionistDialog;
