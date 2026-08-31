"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
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
];
const ROLE_FIELDS = {
    [UserModel_1.Role.SuperAdmin]: [],
    [UserModel_1.Role.Admin]: ['hospitalId'],
    [UserModel_1.Role.Doctor]: [
        'department',
        'specialty',
        'licenseNumber',
        'qualification',
        'experience',
        'shiftStart',
        'shiftEnd',
        'dutyStatus',
        'availabilityStatus',
        'hospitalId',
    ],
    [UserModel_1.Role.Nurse]: [
        'department',
        'licenseNumber',
        'shiftStart',
        'shiftEnd',
        'dutyStatus',
        'availabilityStatus',
        'hospitalId',
    ],
    [UserModel_1.Role.Receptionist]: [
        'department',
        'shiftStart',
        'shiftEnd',
        'dutyStatus',
        'availabilityStatus',
        'hospitalId',
    ],
    [UserModel_1.Role.Patient]: [
        'gender',
        'department',
        'patientStatus',
        'doctor',
        'age',
        'admissionDate',
        'bloodGroup',
        'hospitalId',
    ],
};
/**
 * Returns only the fields relevant to a user's role — a patient's login/me
 * response shouldn't carry staff-only fields like licenseNumber/shiftStart,
 * and a doctor's shouldn't carry patient-only fields like patientStatus.
 */
const sanitizeUser = (user) => {
    const role = user.role;
    const fields = [...COMMON_FIELDS, ...(ROLE_FIELDS[role] ?? [])];
    const safeUser = { id: user._id };
    const source = user;
    for (const field of fields) {
        if (source[field] !== undefined) {
            safeUser[field] = source[field];
        }
    }
    return safeUser;
};
exports.default = sanitizeUser;
