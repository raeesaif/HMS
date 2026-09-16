import { useMemo, useState } from 'react';
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
import { useDoctorsList } from '@/hooks/useAuth';
import { useDepartments } from '@/hooks/useDepartments';
import { useAvailableSlots } from '@/hooks/useAppointmentsApi';
import { getPatientById } from '@/data/receptionistPatients';

const appointmentTypeOptions = [
  { value: 'newPaitent', label: 'New Patient' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'check-up', label: 'Check-up' },
  { value: 'procedure', label: 'Procedure' },
];

const appointmentPriorityOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'emergency', label: 'Emergency' },
];

const doctorName = (doctor) => `${doctor.firstName ?? ''} ${doctor.lastName ?? ''}`.trim();

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
  const [departmentId, setDepartmentId] = useState(
    appointment?.departmentId ?? ''
  );
  const [date, setDate] = useState(appointment?.date ?? '');
  const [time, setTime] = useState(appointment?.time ?? '');
  const [type, setType] = useState(appointment?.type ?? '');
  const [priority, setPriority] = useState(appointment?.priority ?? 'normal');
  const [errors, setErrors] = useState({});

  const { data: doctors = [] } = useDoctorsList();
  const { data: departments = [] } = useDepartments();
  const { data: availableSlots = [], isFetching: isLoadingSlots } = useAvailableSlots(
    doctorId,
    date
  );

  const timeOptions = useMemo(() => {
    const options = [...availableSlots];
    if (time && !options.includes(time)) options.unshift(time);
    return options;
  }, [availableSlots, time]);

  const timeSlotPlaceholder = !doctorId || !date
    ? 'Select doctor & date first'
    : isLoadingSlots
      ? 'Loading available times...'
      : timeOptions.length === 0
        ? 'No slots available'
        : 'Select time';

  const handleDoctorChange = (value) => {
    setDoctorId(value);
    setTime('');
  };

  const handleDateChange = (value) => {
    setDate(value);
    setTime('');
  };

  const handleSave = () => {
    const nextErrors = {};
    if (!isReschedule && !patient) nextErrors.patient = 'Select a patient';
    if (!doctorId) nextErrors.doctorId = 'Select a doctor';
    if (!isReschedule && !departmentId)
      nextErrors.departmentId = 'Select a department';
    if (!date) nextErrors.date = 'Select a date';
    if (!time.trim()) nextErrors.time = 'Enter an appointment time';
    if (!isReschedule && !type) nextErrors.type = 'Select an appointment type';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (isReschedule) {
      onSave(appointment.id, { date, time });
      toast.success('Appointment rescheduled');
      onOpenChange(false);
    } else {
      onSave({
        patientId: patient.id,
        doctorId,
        departmentId,
        date,
        time: time.trim(),
        type,
        priority,
      });
      onOpenChange(false);
    }
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
              onValueChange={handleDoctorChange}
              disabled={isReschedule}
              items={doctors.map((doctor) => ({ value: doctor._id, label: doctorName(doctor) }))}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!!errors.doctorId}
              >
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor._id} value={doctor._id}>
                    {doctorName(doctor)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorId && <FieldError>{errors.doctorId}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Department *</FieldLabel>
            <Select
              value={departmentId}
              onValueChange={setDepartmentId}
              disabled={isReschedule}
              items={departments.map((department) => ({ value: department.id, label: department.name }))}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!!errors.departmentId}
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.departmentId && (
              <FieldError>{errors.departmentId}</FieldError>
            )}
          </div>
          <div className="space-y-1">
            <FieldLabel>Appointment Date *</FieldLabel>
            <ReceptionDatePicker date={date} onSelect={handleDateChange} />
            {errors.date && <FieldError>{errors.date}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Appointment Time *</FieldLabel>
            <Select
              value={time}
              onValueChange={setTime}
              disabled={!doctorId || !date || isLoadingSlots || timeOptions.length === 0}
              items={timeOptions.map((slot) => ({ value: slot, label: slot }))}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.time}>
                <SelectValue placeholder={timeSlotPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && <FieldError>{errors.time}</FieldError>}
          </div>
          {!isReschedule && (
            <div className="space-y-1">
              <FieldLabel>Appointment Type *</FieldLabel>
              <Select value={type} onValueChange={setType} items={appointmentTypeOptions}>
                <SelectTrigger className="w-full" aria-invalid={!!errors.type}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <FieldError>{errors.type}</FieldError>}
            </div>
          )}
        </div>

        {!isReschedule && (
          <div className="space-y-1">
            <FieldLabel>Priority</FieldLabel>
            <RadioGroup
              value={priority}
              onValueChange={setPriority}
              className="flex flex-wrap gap-4"
            >
              {appointmentPriorityOptions.map((option) => (
                <Label
                  key={option.value}
                  className="flex items-center gap-2 text-sm font-normal"
                >
                  <RadioGroupItem value={option.value} />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
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
