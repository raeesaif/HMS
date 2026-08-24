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
import { DEPARTMENTS, GENDERS, PATIENT_STATUSES, BLOOD_GROUPS } from '@/constants/patient';

const todayISO = () => new Date().toISOString().slice(0, 10);

const getDefaultValues = () => ({
  name: '',
  age: '',
  gender: '',
  phone: '',
  department: '',
  bloodGroup: '',
  doctor: '',
  status: 'Stable',
  admittedDate: todayISO(),
});

const AddPatientDialog = ({ trigger, onAdd }) => {
  const [open, setOpen] = useState(false);

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
    onAdd?.(data);
    toast.success(`${data.name} was added to patient records`);
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
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's details to create a new record.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-patient-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Full Name</FieldLabel>
            <Input {...register('name')} placeholder="e.g. Ama Owusu" />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
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
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
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
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </SelectField>

          <SelectField label="Blood Group" error={errors.bloodGroup} {...register('bloodGroup')}>
            <option value="" disabled>
              Select blood group
            </option>
            {BLOOD_GROUPS.map((bloodGroup) => (
              <option key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>Doctor</FieldLabel>
            <Input {...register('doctor')} placeholder="e.g. Dr. Boateng" />
            {errors.doctor && (
              <p className="text-destructive text-sm">{errors.doctor.message}</p>
            )}
          </div>

          <SelectField label="Status" error={errors.status} {...register('status')}>
            {PATIENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectField>

          <div className="space-y-1">
            <FieldLabel>Admission Date</FieldLabel>
            <Input {...register('admittedDate')} type="date" />
            {errors.admittedDate && (
              <p className="text-destructive text-sm">{errors.admittedDate.message}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" form="add-patient-form">
            Add Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
