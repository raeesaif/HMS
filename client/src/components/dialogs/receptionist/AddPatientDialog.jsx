import { useState } from 'react';
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
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReceptionDatePicker } from '@/components/reception/ReceptionDatePicker';
import { useDepartments } from '@/hooks/useDepartments';
import { useRegister, useDoctors } from '@/hooks/useAuth';
import { REGISTER_PATIENT_STATUSES, REGISTER_GENDERS, REGISTER_BLOOD_GROUPS } from '@/constants/registration';

const PHONE_REGEX = /^[+]?[\d\s-]{7,20}$/;
const todayISO = () => new Date().toISOString().slice(0, 10);

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!PHONE_REGEX.test(form.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (!form.gender) errors.gender = 'Gender is required';
  if (!form.age || isNaN(form.age) || Number(form.age) <= 0) errors.age = 'Age is required';
  if (!form.bloodGroup) errors.bloodGroup = 'Blood group is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.doctor.trim()) errors.doctor = "Doctor's staff ID or email is required";
  if (!form.patientStatus) errors.patientStatus = 'Patient status is required';
  if (!form.admissionDate) errors.admissionDate = 'Admission date is required';
  return errors;
}

function AddPatientForm({ onOpenChange, onSave }) {
  const { data: departments = [] } = useDepartments();
  const registerMutation = useRegister();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    bloodGroup: '',
    department: '',
    patientStatus: 'stable',
    doctor: '',
    admissionDate: todayISO(),
  });
  const [errors, setErrors] = useState({});
  const { data: doctors = [] } = useDoctors(form.department);

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    registerMutation.mutate(
      {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: 'patient',
        gender: form.gender,
        age: Number(form.age),
        bloodGroup: form.bloodGroup,
        department: form.department,
        doctor: form.doctor.trim(),
        patientStatus: form.patientStatus,
        admissionDate: form.admissionDate,
      },
      {
        onSuccess: (user) => {
          onSave({
            id: user.id,
            userId: user.userId,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            name: `${form.firstName.trim()} ${form.lastName.trim()}`,
            age: Number(form.age),
            gender: form.gender,
            phone: form.phone.trim(),
            email: form.email.trim(),
            bloodGroup: form.bloodGroup,
            department: form.department,
            patientStatus: form.patientStatus,
            doctor: form.doctor.trim(),
            admissionDate: form.admissionDate,
            status: 'Active',
          });
          queryClient.invalidateQueries({ queryKey: ['patients'] });
          onOpenChange(false);
          toast.success('Patient registered successfully');
        },
        onError: (error) => {
          toast.error(error.response?.data?.message ?? 'Failed to register patient');
        },
      }
    );
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>First Name *</FieldLabel>
            <Input value={form.firstName} onChange={updateField('firstName')} aria-invalid={!!errors.firstName} />
            {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Last Name *</FieldLabel>
            <Input value={form.lastName} onChange={updateField('lastName')} aria-invalid={!!errors.lastName} />
            {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Email *</FieldLabel>
            <Input type="email" value={form.email} onChange={updateField('email')} aria-invalid={!!errors.email} placeholder="patient@example.com" />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Phone *</FieldLabel>
            <Input value={form.phone} onChange={updateField('phone')} aria-invalid={!!errors.phone} placeholder="+92 300 1234567" />
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Gender *</FieldLabel>
            <Select value={form.gender} onValueChange={(value) => setForm((prev) => ({ ...prev, gender: value }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.gender}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {REGISTER_GENDERS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && <FieldError>{errors.gender}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Age *</FieldLabel>
            <Input type="number" min="0" max="150" value={form.age} onChange={updateField('age')} aria-invalid={!!errors.age} placeholder="e.g. 30" />
            {errors.age && <FieldError>{errors.age}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Blood Group *</FieldLabel>
            <Select value={form.bloodGroup} onValueChange={(value) => setForm((prev) => ({ ...prev, bloodGroup: value }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.bloodGroup}>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {REGISTER_BLOOD_GROUPS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bloodGroup && <FieldError>{errors.bloodGroup}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Department *</FieldLabel>
            <Select value={form.department} onValueChange={(value) => setForm((prev) => ({ ...prev, department: value, doctor: '' }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.department}>
                <SelectValue>
                  {(value) =>
                    departments.find((department) => department.id === value)?.name ??
                    'Select department'
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && <FieldError>{errors.department}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Attending Doctor *</FieldLabel>
            <Select value={form.doctor} onValueChange={(value) => setForm((prev) => ({ ...prev, doctor: value }))} disabled={!form.department}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.doctor}>
                <SelectValue>
                  {(value) => {
                    const doctor = doctors.find((candidate) => candidate._id === value);
                    if (doctor) return `${doctor.firstName} ${doctor.lastName} (${doctor.userId})`;
                    return form.department ? 'Select doctor' : 'Select department first';
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor._id} value={doctor._id}>
                    {doctor.firstName} {doctor.lastName} ({doctor.userId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctor && <FieldError>{errors.doctor}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Patient Status *</FieldLabel>
            <Select value={form.patientStatus} onValueChange={(value) => setForm((prev) => ({ ...prev, patientStatus: value }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.patientStatus}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {REGISTER_PATIENT_STATUSES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.patientStatus && <FieldError>{errors.patientStatus}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Admission Date *</FieldLabel>
            <ReceptionDatePicker date={form.admissionDate} onSelect={(date) => setForm((prev) => ({ ...prev, admissionDate: date }))} />
            {errors.admissionDate && <FieldError>{errors.admissionDate}</FieldError>}
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave} disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Registering…' : 'Register Patient'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function AddPatientDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Register New Patient</DialogTitle>
          <DialogDescription>
            Enter patient details. Login credentials are emailed automatically.
          </DialogDescription>
        </DialogHeader>

        <AddPatientForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
