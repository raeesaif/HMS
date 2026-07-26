import { useState } from 'react';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select-field';
import { AppointmentSchema } from '@/schema/AppointmentSchema';
import { DEPARTMENTS } from '@/constants/patient';
import { APPOINTMENT_STATUSES } from '@/constants/appointment';
import { CALENDAR_MONTH } from '@/data/appointments';

const getDefaultValues = () => ({
  patient: '',
  doctor: '',
  department: '',
  date: `${CALENDAR_MONTH.year}-${String(CALENDAR_MONTH.month + 1).padStart(2, '0')}-14`,
  time: '',
  status: 'Confirmed',
});

const BookAppointmentDialog = ({ trigger, onAdd }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(AppointmentSchema),
  });

  const onSubmit = (data) => {
    onAdd?.(data);
    toast.success(`Appointment booked for ${data.patient}`);
    reset(getDefaultValues());
    setOpen(false);
  };

  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) reset(getDefaultValues());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule a new appointment for a patient.
          </DialogDescription>
        </DialogHeader>

        <form
          id="book-appointment-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Patient Name</FieldLabel>
            <Input {...register('patient')} placeholder="e.g. Ama Owusu" />
            {errors.patient && (
              <p className="text-destructive text-sm">{errors.patient.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Doctor</FieldLabel>
            <Input {...register('doctor')} placeholder="e.g. Dr. Boateng" />
            {errors.doctor && (
              <p className="text-destructive text-sm">{errors.doctor.message}</p>
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
            <FieldLabel>Date</FieldLabel>
            <Input {...register('date')} type="date" />
            {errors.date && (
              <p className="text-destructive text-sm">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Time</FieldLabel>
            <Input {...register('time')} type="time" />
            {errors.time && (
              <p className="text-destructive text-sm">{errors.time.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <SelectField label="Status" error={errors.status} {...register('status')}>
              {APPOINTMENT_STATUSES.map((status) => (
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
          <Button type="submit" form="book-appointment-form">
            Book Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentDialog;
