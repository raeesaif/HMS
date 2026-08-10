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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDoctorById } from '@/data/patientDoctors';

function RescheduleForm({ appointment, onOpenChange, onSave }) {
  const doctor = getDoctorById(appointment.doctorId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});

  const availableDates = doctor ? Object.keys(doctor.availableSlots) : [];
  const availableTimes = doctor && date ? (doctor.availableSlots[date] ?? []) : [];

  const handleSave = () => {
    const nextErrors = {};
    if (!date) nextErrors.date = 'Select an available date';
    if (!time) nextErrors.time = 'Select an available time';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(appointment.id, { date, time, status: 'Scheduled' });
    onOpenChange(false);
    toast.success('Appointment reschedule requested');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-medium text-slate-900">{appointment.doctorName}</p>
          <p className="text-xs text-slate-500">
            Current: {appointment.date} at {appointment.time}
          </p>
        </div>

        <div className="space-y-1">
          <FieldLabel>New Available Date *</FieldLabel>
          <Select
            value={date}
            onValueChange={(value) => {
              setDate(value);
              setTime('');
            }}
          >
            <SelectTrigger className="w-full" aria-invalid={!!errors.date}>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.date && <FieldError>{errors.date}</FieldError>}
          {availableDates.length === 0 && <p className="text-xs text-slate-400">No available dates right now — please try again later.</p>}
        </div>

        <div className="space-y-1">
          <FieldLabel>New Available Time *</FieldLabel>
          <Select value={time} onValueChange={setTime} disabled={!date}>
            <SelectTrigger className="w-full" aria-invalid={!!errors.time}>
              <SelectValue placeholder={date ? 'Select time' : 'Select a date first'} />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <FieldError>{errors.time}</FieldError>}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Request Reschedule</Button>
      </DialogFooter>
    </>
  );
}

export function RescheduleAppointmentDialog({ appointment, open, onOpenChange, onSave }) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>Choose a new available date and time. Only open slots can be selected.</DialogDescription>
        </DialogHeader>

        <RescheduleForm key={appointment.id} appointment={appointment} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
