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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PatientSelect } from '@/components/reception/PatientSelect';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { ReceptionDatePicker } from '@/components/reception/ReceptionDatePicker';
import {
  appointmentPriorityOptions,
  appointmentTypeOptions,
} from '@/data/receptionistAppointments';
import { doctorsOnDuty, getDoctorById } from '@/data/receptionistDoctors';
import { getPatientById } from '@/data/receptionistPatients';

function AppointmentForm({
  appointment,
  initialPatient,
  onOpenChange,
  onSave,
}) {
  const isReschedule = !!appointment;
  const existingPatient = isReschedule
    ? getPatientById(appointment.patientId)
    : null;

  const [patient, setPatient] = useState(
    existingPatient ?? initialPatient ?? null
  );
  const [doctorId, setDoctorId] = useState(appointment?.doctorId ?? '');
  const [date, setDate] = useState(appointment?.date ?? '');
  const [time, setTime] = useState(appointment?.time ?? '');
  const [type, setType] = useState(appointment?.type ?? '');
  const [priority, setPriority] = useState(appointment?.priority ?? 'Normal');
  const [reasonForVisit, setReasonForVisit] = useState(
    appointment?.reasonForVisit ?? ''
  );
  const [errors, setErrors] = useState({});

  const selectedDoctor = getDoctorById(doctorId);

  const handleSave = () => {
    const nextErrors = {};
    if (!isReschedule && !patient) nextErrors.patient = 'Select a patient';
    if (!doctorId) nextErrors.doctorId = 'Select a doctor';
    if (!date) nextErrors.date = 'Select a date';
    if (!time.trim()) nextErrors.time = 'Enter an appointment time';
    if (!isReschedule && !type) nextErrors.type = 'Select an appointment type';
    if (!isReschedule && !reasonForVisit.trim())
      nextErrors.reasonForVisit = 'Reason for visit is required';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (isReschedule) {
      onSave(appointment.id, { date, time });
      toast.success('Appointment rescheduled');
    } else {
      onSave({
        patientId: patient.id,
        doctorId,
        date,
        time: time.trim(),
        type,
        priority,
        reasonForVisit: reasonForVisit.trim(),
      });
      toast.success('Appointment created');
    }
    onOpenChange(false);
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="space-y-1">
          <FieldLabel>Patient *</FieldLabel>
          {isReschedule ? (
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <PatientAvatar name={existingPatient?.name ?? ''} />
              <p className="text-sm font-medium text-slate-900">
                {existingPatient?.name ?? appointment.patientName}
              </p>
            </div>
          ) : (
            <PatientSelect selectedPatient={patient} onChange={setPatient} />
          )}
          {errors.patient && <FieldError>{errors.patient}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Doctor *</FieldLabel>
            <Select
              value={doctorId}
              onValueChange={setDoctorId}
              disabled={isReschedule}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!!errors.doctorId}
              >
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctorsOnDuty.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} — {doctor.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorId && <FieldError>{errors.doctorId}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Department</FieldLabel>
            <Input
              value={selectedDoctor?.department ?? ''}
              disabled
              placeholder="Auto-filled from doctor"
            />
          </div>
          <div className="space-y-1">
            <FieldLabel>Appointment Date *</FieldLabel>
            <ReceptionDatePicker date={date} onSelect={setDate} />
            {errors.date && <FieldError>{errors.date}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Appointment Time *</FieldLabel>
            <Input
              value={time}
              onChange={(event) => setTime(event.target.value)}
              placeholder="e.g. 10:30 AM"
              aria-invalid={!!errors.time}
            />
            {errors.time && <FieldError>{errors.time}</FieldError>}
          </div>
          {!isReschedule && (
            <div className="space-y-1">
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
          )}
        </div>

        {!isReschedule && (
          <>
            <div className="space-y-1">
              <FieldLabel>Priority</FieldLabel>
              <RadioGroup
                value={priority}
                onValueChange={setPriority}
                className="flex flex-wrap gap-4"
              >
                {appointmentPriorityOptions.map((option) => (
                  <Label
                    key={option}
                    className="flex items-center gap-2 text-sm font-normal"
                  >
                    <RadioGroupItem value={option} />
                    {option}
                  </Label>
                ))}
              </RadioGroup>
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
          </>
        )}
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button onClick={handleSave}>
          {isReschedule ? 'Save New Time' : 'Create Appointment'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function AppointmentDialog({
  appointment = null,
  initialPatient = null,
  open,
  onOpenChange,
  onSave,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {appointment ? 'Reschedule Appointment' : 'Create Appointment'}
          </DialogTitle>
          <DialogDescription>
            {appointment
              ? `Choose a new date and time for ${appointment.patientName}.`
              : 'Schedule a new appointment. Diagnosis and clinical notes are not entered here.'}
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          key={
            appointment
              ? appointment.id
              : open
                ? `new-open-${initialPatient?.id ?? ''}`
                : 'new-closed'
          }
          appointment={appointment}
          initialPatient={initialPatient}
          onOpenChange={onOpenChange}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}
