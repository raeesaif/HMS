import zod from 'zod';

export const DoctorSchema = zod.object({
  name: zod.string().min(1, 'Full name is required'),
  specialty: zod.string().min(1, 'Specialty is required'),
  department: zod.string().min(1, 'Select a department'),
  license: zod.string().min(1, 'License number is required'),
  email: zod.string().min(1, 'Email is required').email('Invalid email address'),
  phone: zod.string().min(1, 'Phone number is required'),
  shiftStart: zod.string().min(1, 'Shift start is required'),
  shiftEnd: zod.string().min(1, 'Shift end is required'),
  status: zod.string().min(1, 'Select a status'),
});

export const NurseSchema = zod.object({
  name: zod.string().min(1, 'Full name is required'),
  department: zod.string().min(1, 'Select a department'),
  ward: zod.string().min(1, 'Ward / unit is required'),
  nurseId: zod.string().min(1, 'Nurse ID is required'),
  email: zod.string().min(1, 'Email is required').email('Invalid email address'),
  phone: zod.string().min(1, 'Phone number is required'),
  shiftStart: zod.string().min(1, 'Shift start is required'),
  shiftEnd: zod.string().min(1, 'Shift end is required'),
  status: zod.string().min(1, 'Select a status'),
});

export const ReceptionistSchema = zod.object({
  name: zod.string().min(1, 'Full name is required'),
  desk: zod.string().min(1, 'Desk / location is required'),
  employeeId: zod.string().min(1, 'Employee ID is required'),
  email: zod.string().min(1, 'Email is required').email('Invalid email address'),
  phone: zod.string().min(1, 'Phone number is required'),
  shiftStart: zod.string().min(1, 'Shift start is required'),
  shiftEnd: zod.string().min(1, 'Shift end is required'),
  status: zod.string().min(1, 'Select a status'),
});
