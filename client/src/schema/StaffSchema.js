import zod from 'zod';

const baseStaffFields = {
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
  phone: zod
    .string()
    .trim()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  shiftStart: zod.string().min(1, 'Shift start is required'),
  shiftEnd: zod.string().min(1, 'Shift end is required'),
};

export const DoctorSchema = zod.object({
  ...baseStaffFields,
  department: zod.string().min(1, 'Select a department'),
  specialty: zod.string().min(1, 'Select a specialty'),
  licenseNumber: zod.string().trim().min(1, 'License number is required'),
  qualification: zod.string().trim().min(1, 'Qualification is required'),
  experience: zod.coerce
    .number({ invalid_type_error: 'Experience must be a number' })
    .int('Experience must be a whole number')
    .min(0, 'Experience cannot be negative'),
});

export const NurseSchema = zod.object({
  ...baseStaffFields,
  department: zod.string().min(1, 'Select a department'),
  ward: zod.string().trim().min(1, 'Ward / unit is required'),
  licenseNumber: zod.string().trim().min(1, 'License number is required'),
});

export const ReceptionistSchema = zod.object({
  ...baseStaffFields,
  staffDepartment: zod.string().trim().min(1, 'Staff department is required'),
});
