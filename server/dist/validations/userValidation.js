"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAvailabilityStatusSchema = exports.updateDutyStatusSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z
    .object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters'),
    lastName: zod_1.z
        .string()
        .trim()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be at most 50 characters'),
    email: zod_1.z.string().trim().email('Please enter a valid email').toLowerCase(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .optional(),
    // 'admin' and 'superadmin' are deliberately excluded here — this schema
    // backs the public, unauthenticated /auth/register endpoint, so allowing
    // privileged roles here would let anyone self-assign platform admin
    // access. Those accounts must be provisioned separately by an already
    // authenticated superadmin.
    role: zod_1.z.enum(['doctor', 'nurse', 'receptionist', 'patient']),
    phone: zod_1.z
        .string()
        .trim()
        .min(7, 'Phone number is too short')
        .max(20, 'Phone number is too long')
        .optional(),
    department: zod_1.z.string().optional(),
    specialty: zod_1.z.string().optional(),
    licenseNumber: zod_1.z.string().trim().optional(),
    qualification: zod_1.z.string().trim().optional(),
    experience: zod_1.z
        .number()
        .int()
        .min(0, 'Experience cannot be negative')
        .optional(),
    shiftStart: zod_1.z.string().optional(),
    shiftEnd: zod_1.z.string().optional(),
    staffDepartment: zod_1.z.string().trim().optional(),
    ward: zod_1.z.string().trim().optional(),
    dutyStatus: zod_1.z.enum(['On Duty', 'Off Duty']).optional(),
    availabilityStatus: zod_1.z.enum(['Available', 'Break', 'Busy']).optional(),
    gender: zod_1.z.enum(['male', 'female']).optional(),
    patientStatus: zod_1.z
        .enum(['stable', 'observation', 'critical', 'discharged'])
        .optional(),
    age: zod_1.z
        .number()
        .int()
        .min(0, 'Age cannot be negative')
        .max(150, 'Age cannot exceed 150')
        .optional(),
    doctor: zod_1.z.string().optional(),
    admissionDate: zod_1.z.coerce.date().optional(),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
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
        if (!data.ward) {
            ctx.addIssue({
                code: 'custom',
                path: ['ward'],
                message: 'Ward / unit is required for nurses',
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
        if (!data.staffDepartment) {
            ctx.addIssue({
                code: 'custom',
                path: ['staffDepartment'],
                message: 'Staff department is required for receptionists',
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
exports.default = userSchema;
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email('Please enter a valid email').toLowerCase(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.updateDutyStatusSchema = zod_1.z.object({
    dutyStatus: zod_1.z.enum(['On Duty', 'Off Duty']),
});
exports.updateAvailabilityStatusSchema = zod_1.z.object({
    availabilityStatus: zod_1.z.enum(['Available', 'Break', 'Busy']),
});
