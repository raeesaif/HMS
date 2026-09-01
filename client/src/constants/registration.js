// Values here must match the backend's userSchema enums exactly
// (server/src/validations/userValidation.ts) since they're sent straight
// through to POST /auth/register.

export const REGISTER_GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const REGISTER_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const REGISTER_PATIENT_STATUSES = [
  { value: 'stable', label: 'Stable' },
  { value: 'observation', label: 'Observation' },
  { value: 'critical', label: 'Critical' },
  { value: 'discharged', label: 'Discharged' },
];
