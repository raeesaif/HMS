import type { HydratedDocument } from 'mongoose';
import { Role, type UserType } from '@src/models/UserModel';

type SafeUser = Record<string, unknown>;

const COMMON_FIELDS = [
  'userId',
  'firstName',
  'lastName',
  'email',
  'phone',
  'role',
  'isVerified',
  'isFirstLogin',
  'isActive',
] as const;

const ROLE_FIELDS: Record<Role, readonly string[]> = {
  [Role.SuperAdmin]: [],
  [Role.Admin]: [],
  [Role.Doctor]: [
    'department',
    'specialty',
    'licenseNumber',
    'qualification',
    'experience',
    'shiftStart',
    'shiftEnd',
    'isOnDuty',
    'startDate',
    'endDate',
  ],
  [Role.Nurse]: [
    'department',
    'licenseNumber',
    'shiftStart',
    'shiftEnd',
    'isOnDuty',
    'startDate',
    'endDate',
  ],
  [Role.Receptionist]: [
    'department',
    'shiftStart',
    'shiftEnd',
    'isOnDuty',
    'startDate',
    'endDate',
  ],
  [Role.Patient]: [
    'gender',
    'department',
    'patientStatus',
    'doctor',
    'age',
    'admissionDate',
  ],
};

/**
 * Returns only the fields relevant to a user's role — a patient's login/me
 * response shouldn't carry staff-only fields like licenseNumber/shiftStart,
 * and a doctor's shouldn't carry patient-only fields like patientStatus.
 */
const sanitizeUser = (user: HydratedDocument<UserType>): SafeUser => {
  const role = user.role as Role;
  const fields = [...COMMON_FIELDS, ...(ROLE_FIELDS[role] ?? [])];

  const safeUser: SafeUser = { id: user._id };
  const source = user as unknown as Record<string, unknown>;

  for (const field of fields) {
    if (source[field] !== undefined) {
      safeUser[field] = source[field];
    }
  }

  return safeUser;
};

export default sanitizeUser;
