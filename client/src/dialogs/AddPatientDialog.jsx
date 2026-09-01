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
import { PatientSchema } from '@/schema/PatientSchema';
import { useDepartments } from '@/hooks/useDepartments';
import { useRegister } from '@/hooks/useAuth';
import {
  REGISTER_GENDERS,
  REGISTER_BLOOD_GROUPS,
  REGISTER_PATIENT_STATUSES,
} from '@/constants/registration';

const todayISO = () => new Date().toISOString().slice(0, 10);

const getDefaultValues = () => ({
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  gender: '',
  phone: '',
  department: '',
  bloodGroup: '',
  doctor: '',
  patientStatus: 'stable',
  admissionDate: todayISO(),
});

const AddPatientDialog = ({ trigger, onAdd }) => {
  const [open, setOpen] = useState(false);
  const { data: departments = [] } = useDepartments();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(PatientSchema),
  });

  const onSubmit = (data) => {
    registerMutation.mutate(
      { ...data, role: 'patient' },
      {
        onSuccess: (user) => {
          onAdd?.({ ...data, id: user.id, userId: user.userId });
          toast.success(`${data.firstName} ${data.lastName} was added to patient records`);
          reset(getDefaultValues());
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message ?? 'Failed to add patient');
        },
      }
    );
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
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's details to create a new record. Login credentials are emailed
            automatically.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-patient-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1">
            <FieldLabel>First Name</FieldLabel>
            <Input {...register('firstName')} placeholder="e.g. Ama" />
            {errors.firstName && (
              <p className="text-destructive text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Last Name</FieldLabel>
            <Input {...register('lastName')} placeholder="e.g. Owusu" />
            {errors.lastName && (
              <p className="text-destructive text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Email</FieldLabel>
            <Input {...register('email')} type="email" placeholder="patient@hms.com" />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Age</FieldLabel>
            <Input {...register('age')} type="number" min="0" placeholder="e.g. 34" />
            {errors.age && (
              <p className="text-destructive text-sm">{errors.age.message}</p>
            )}
          </div>

          <SelectField label="Gender" error={errors.gender} {...register('gender')}>
            <option value="" disabled>
              Select gender
            </option>
            {REGISTER_GENDERS.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>Phone</FieldLabel>
            <Input {...register('phone')} placeholder="+233 20 111 2233" />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
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

          <SelectField label="Blood Group" error={errors.bloodGroup} {...register('bloodGroup')}>
            <option value="" disabled>
              Select blood group
            </option>
            {REGISTER_BLOOD_GROUPS.map((bloodGroup) => (
              <option key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>Doctor</FieldLabel>
            <Input {...register('doctor')} placeholder="Staff ID or email" />
            {errors.doctor && (
              <p className="text-destructive text-sm">{errors.doctor.message}</p>
            )}
          </div>

          <SelectField
            label="Status"
            error={errors.patientStatus}
            {...register('patientStatus')}
          >
            {REGISTER_PATIENT_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>Admission Date</FieldLabel>
            <Input {...register('admissionDate')} type="date" />
            {errors.admissionDate && (
              <p className="text-destructive text-sm">{errors.admissionDate.message}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" form="add-patient-form" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Adding…' : 'Add Patient'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
