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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { appointmentTypeOptions } from '@/data/patientAppointments';
import { departmentOptions, doctors } from '@/data/patientDoctors';

function BookAppointmentForm({ onOpenChange, onSave }) {
  const [department, setDepartment] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [errors, setErrors] = useState({});

  const doctorsInDepartment = department
    ? doctors.filter((doctor) => doctor.department === department)
    : [];
  const selectedDoctor =
    doctors.find((doctor) => doctor.id === doctorId) ?? null;
  const availableDates = selectedDoctor
    ? Object.keys(selectedDoctor.availableSlots)
    : [];
  const availableTimes =
    selectedDoctor && date ? (selectedDoctor.availableSlots[date] ?? []) : [];

  const handleSave = () => {
    const nextErrors = {};
    if (!department) nextErrors.department = 'Select a department';
    if (!doctorId) nextErrors.doctorId = 'Select a doctor';
    if (!date) nextErrors.date = 'Select an available date';
    if (!time) nextErrors.time = 'Select an available time';
    if (!type) nextErrors.type = 'Select an appointment type';
    if (!reasonForVisit.trim())
      nextErrors.reasonForVisit = 'Reason for visit is required';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      doctorId,
      date,
      time,
      type,
      reasonForVisit: reasonForVisit.trim(),
    });
    onOpenChange(false);
    toast.success('Appointment request submitted');
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Department *</FieldLabel>
            <Select
              value={department}
              onValueChange={(value) => {
                setDepartment(value);
                setDoctorId('');
                setDate('');
                setTime('');
              }}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!!errors.department}
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && <FieldError>{errors.department}</FieldError>}
          </div>

          <div className="space-y-1">
            <FieldLabel>Doctor *</FieldLabel>
            <Select
              value={doctorId}
              onValueChange={(value) => {
                setDoctorId(value);
                setDate('');
                setTime('');
              }}
              disabled={!department}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!!errors.doctorId}
              >
                <SelectValue
                  placeholder={
                    department ? 'Select doctor' : 'Select a department first'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {doctorsInDepartment.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} — {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorId && <FieldError>{errors.doctorId}</FieldError>}
          </div>

          <div className="space-y-1">
            <FieldLabel>Available Date *</FieldLabel>
            <Select
              value={date}
              onValueChange={(value) => {
                setDate(value);
                setTime('');
              }}
              disabled={!doctorId}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.date}>
                <SelectValue
                  placeholder={
                    doctorId ? 'Select date' : 'Select a doctor first'
                  }
                />
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
            {doctorId && availableDates.length === 0 && (
              <p className="text-xs text-slate-400">
                No available dates for this doctor right now.
              </p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Available Time *</FieldLabel>
            <Select value={time} onValueChange={setTime} disabled={!date}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.time}>
                <SelectValue
                  placeholder={date ? 'Select time' : 'Select a date first'}
                />
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

          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Appointment Type *</FieldLabel>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.type}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <FieldError>{errors.type}</FieldError>}
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Reason for Visit *</FieldLabel>
          <Textarea
            value={reasonForVisit}
            onChange={(event) => setReasonForVisit(event.target.value)}
            className="min-h-16 resize-none"
            aria-invalid={!!errors.reasonForVisit}
          />
          {errors.reasonForVisit && (
            <FieldError>{errors.reasonForVisit}</FieldError>
          )}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button onClick={handleSave}>Book Appointment</Button>
      </DialogFooter>
    </>
  );
}

export function BookAppointmentDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Only currently available doctor slots can be selected.
          </DialogDescription>
        </DialogHeader>

        <BookAppointmentForm
          key={open ? 'open' : 'closed'}
          onOpenChange={onOpenChange}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}
