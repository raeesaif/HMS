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

    // 'admin' and 'superadmin' are deliberately excluded here — this schema
    // backs the public, unauthenticated /auth/register endpoint, so allowing
    // privileged roles here would let anyone self-assign platform admin
    // access. Those accounts must be provisioned separately by an already
    // authenticated superadmin.
    role: z.enum(['doctor', 'nurse', 'receptionist', 'patient']),

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

    dutyStatus: z.enum(['On Duty', 'Off Duty']).optional(),

    availabilityStatus: z.enum(['Available', 'Break', 'Busy']).optional(),

    gender: z.enum(['male', 'female']).optional(),

    patientStatus: z
      .enum(['stable', 'observation', 'critical', 'discharged'])
      .optional(),

    age: z
      .number()
      .int()
      .min(0, 'Age cannot be negative')
      .max(150, 'Age cannot exceed 150')
      .optional(),

    doctor: z.string().optional(),

    admissionDate: z.coerce.date().optional(),

    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  })
  .superRefine((data, ctx) => {
    // Phone is required for every self-registerable role.
    if (!data.phone) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Phone number is required',
      });
    }

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

      if (!data.shiftStart) {
        ctx.addIssue({
          code: 'custom',
          path: ['shiftStart'],
          message: 'Shift start time is required for doctors',
        });
      }

      if (!data.shiftEnd) {
        ctx.addIssue({
          code: 'custom',
          path: ['shiftEnd'],
          message: 'Shift end time is required for doctors',
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

      if (!data.shiftStart) {
        ctx.addIssue({
          code: 'custom',
          path: ['shiftStart'],
          message: 'Shift start time is required for nurses',
        });
      }

      if (!data.shiftEnd) {
        ctx.addIssue({
          code: 'custom',
          path: ['shiftEnd'],
          message: 'Shift end time is required for nurses',
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

      if (!data.shiftStart) {
        ctx.addIssue({
          code: 'custom',
          path: ['shiftStart'],
          message: 'Shift start time is required for receptionists',
        });
      }

      if (!data.shiftEnd) {
        ctx.addIssue({
          code: 'custom',
          path: ['shiftEnd'],
          message: 'Shift end time is required for receptionists',
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

      if (!data.doctor) {
        ctx.addIssue({
          code: 'custom',
          path: ['doctor'],
          message: 'Doctor is required for patients',
        });
      }

      if (!data.admissionDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['admissionDate'],
          message: 'Admission date is required for patients',
        });
      }

      if (data.age === undefined) {
        ctx.addIssue({
          code: 'custom',
          path: ['age'],
          message: 'Age is required for patients',
        });
      }

      if (!data.bloodGroup) {
        ctx.addIssue({
          code: 'custom',
          path: ['bloodGroup'],
          message: 'Blood group is required for patients',
        });
      }
    }
  });

export default userSchema;
export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email').toLowerCase(),

  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateDutyStatusSchema = z.object({
  dutyStatus: z.enum(['On Duty', 'Off Duty']),
});

export const updateAvailabilityStatusSchema = z.object({
  availabilityStatus: z.enum(['Available', 'Break', 'Busy']),
});
