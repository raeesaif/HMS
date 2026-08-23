import { z } from 'zod';
const userSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be at most 50 characters'),

    lastName: z
      .string()
      .trim()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be at most 50 characters'),

    email: z.string().trim().email('Please enter a valid email').toLowerCase(),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),

    role: z.enum([
      'superadmin',
      'admin',
      'doctor',
      'nurse',
      'receptionist',
      'patient',
    ]),

    phone: z
      .string()
      .trim()
      .min(7, 'Phone number is too short')
      .max(20, 'Phone number is too long')
      .optional(),

    department: z.string().optional(),

    specialty: z.string().optional(),

    licenseNumber: z.string().trim().optional(),

    qualification: z.string().trim().optional(),

    experience: z
      .number()
      .int()
      .min(0, 'Experience cannot be negative')
      .optional(),

    shiftStart: z.string().optional(),

    shiftEnd: z.string().optional(),

    isOnDuty: z.boolean().optional(),

    gender: z.enum(['male', 'female']).optional(),

    patientStatus: z
      .enum(['stable', 'observation', 'critical', 'discharged'])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === 'doctor') {
      if (!data.department) {
        ctx.addIssue({
          code: 'custom',
          path: ['department'],
          message: 'Department is required for doctors',
        });
      }

      if (!data.specialty) {
        ctx.addIssue({
          code: 'custom',
          path: ['specialty'],
          message: 'Specialty is required for doctors',
        });
      }

      if (!data.licenseNumber) {
        ctx.addIssue({
          code: 'custom',
          path: ['licenseNumber'],
          message: 'License number is required for doctors',
        });
      }

      if (!data.qualification) {
        ctx.addIssue({
          code: 'custom',
          path: ['qualification'],
          message: 'Qualification is required for doctors',
        });
      }

      if (data.experience === undefined) {
        ctx.addIssue({
          code: 'custom',
          path: ['experience'],
          message: 'Experience is required for doctors',
        });
      }
    }

    if (data.role === 'nurse') {
      if (!data.department) {
        ctx.addIssue({
          code: 'custom',
          path: ['department'],
          message: 'Department is required for nurses',
        });
      }

      if (!data.licenseNumber) {
        ctx.addIssue({
          code: 'custom',
          path: ['licenseNumber'],
          message: 'License number is required for nurses',
        });
      }
    }

    if (data.role === 'receptionist') {
      if (!data.department) {
        ctx.addIssue({
          code: 'custom',
          path: ['department'],
          message: 'Department is required for receptionists',
        });
      }
    }

    if (data.role === 'patient') {
      if (!data.gender) {
        ctx.addIssue({
          code: 'custom',
          path: ['gender'],
          message: 'Gender is required for patients',
        });
      }

      if (!data.department) {
        ctx.addIssue({
          code: 'custom',
          path: ['department'],
          message: 'Department is required for patients',
        });
      }

      if (!data.patientStatus) {
        ctx.addIssue({
          code: 'custom',
          path: ['patientStatus'],
          message: 'Patient status is required',
        });
      }
    }
  });

export default userSchema;
export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email').toLowerCase(),

  password: z.string().min(6, 'Password must be at least 6 characters'),
});
