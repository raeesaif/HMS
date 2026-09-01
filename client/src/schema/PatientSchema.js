import zod from 'zod';

export const PatientSchema = zod.object({
  firstName: zod
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),
  lastName: zod
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),
  email: zod.string().trim().min(1, 'Email is required').email('Invalid email address'),
  age: zod.coerce
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(0, 'Age must be 0 or greater')
    .max(150, 'Age must be 150 or less'),
  gender: zod.string().min(1, 'Select a gender'),
  phone: zod
    .string()
    .trim()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  department: zod.string().min(1, 'Select a department'),
  bloodGroup: zod.string().min(1, 'Select a blood group'),
  doctor: zod.string().trim().min(1, "Doctor's staff ID or email is required"),
  patientStatus: zod.string().min(1, 'Select a status'),
  admissionDate: zod.string().min(1, 'Admission date is required'),
});
