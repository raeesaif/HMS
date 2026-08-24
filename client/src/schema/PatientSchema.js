import zod from 'zod';

export const PatientSchema = zod.object({
  name: zod.string().min(1, 'Full name is required'),
  age: zod.coerce
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(0, 'Age must be 0 or greater')
    .max(120, 'Age must be 120 or less'),
  gender: zod.string().min(1, 'Select a gender'),
  phone: zod.string().min(1, 'Phone number is required'),
  department: zod.string().min(1, 'Select a department'),
  bloodGroup: zod.string().min(1, 'Select a blood group'),
  doctor: zod.string().min(1, 'Doctor is required'),
  status: zod.string().min(1, 'Select a status'),
  admittedDate: zod.string().min(1, 'Admission date is required'),
});
