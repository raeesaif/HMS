import { Types, type Model } from 'mongoose';
import UserModel from '@src/models/UserModel';
import { Role } from '@src/models/UserModel';
import DepartmentModel from '@src/models/DepartmentModel';
import SpecialtyModel from '@src/models/SpecialtyModel';

import {
  hashPassword,
  comparePassword,
  generateRandomString,
  generateStaffId,
} from '@src/utils/helper';
import { loginAccessToken, loginRefreshToken } from '@src/utils/jwt';

import sendEmail from '@src/utils/sendEmail';
import AppError from '@src/utils/appError';
import sanitizeUser from '@src/utils/sanitizeUser';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeEmailTemplate = require('@src/emails/WelcomeEmail');

type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;

  phone?: string;

  hospitalId?: string;

  department?: string;
  specialty?: string;

  licenseNumber?: string;
  qualification?: string;
  experience?: number;

  shiftStart?: string;
  shiftEnd?: string;
  dutyStatus?: 'On Duty' | 'Off Duty';
  availabilityStatus?: 'Available' | 'Break' | 'Busy';

  gender?: 'male' | 'female';

  patientStatus?: 'stable' | 'observation' | 'critical' | 'discharged';

  age?: number;
  doctor?: string;
  admissionDate?: Date;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

};

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const resolveReference = async (
  model: Model<{ name: string }>,
  label: string,
  value?: string
): Promise<string | undefined> => {
  if (!value) return undefined;
  if (Types.ObjectId.isValid(value)) return value;

  const document = await model.findOne({
    name: new RegExp(`^${escapeRegExp(value)}$`, 'i'),
  });

  if (!document) {
    throw new AppError(400, `${label} "${value}" not found`);
  }

  return String(document._id);
};

const resolveDoctorId = async (value?: string): Promise<string | undefined> => {
  if (!value) return undefined;
  if (Types.ObjectId.isValid(value)) return value;

  const doctor = await UserModel.findOne({
    role: Role.Doctor,
    $or: [{ userId: value }, { email: value.toLowerCase() }],
  });

  if (!doctor) {
    throw new AppError(400, `Doctor "${value}" not found`);
  }

  return String(doctor._id);
};

const registerUser = async (userData: RegisterUserData) => {
  const existingUser = await UserModel.findOne({
    email: userData.email.toLowerCase(),
  });

  if (existingUser) {
    throw new AppError(409, 'User with this email already exists');
  }

  // =================================
  // Resolve department / specialty names to ids
  // =================================

  const departmentId = await resolveReference(
    DepartmentModel,
    'Department',
    userData.department
  );

  const specialtyId = await resolveReference(
    SpecialtyModel,
    'Specialty',
    userData.specialty
  );

  const doctorId = await resolveDoctorId(userData.doctor);

  // =================================
  // Generate password
  // =================================

  const rawPassword = generateRandomString(8);

  const hashedPassword = await hashPassword(rawPassword);

  // =================================
  // Generate HMS User ID
  // =================================

  const userId = generateStaffId(userData.role);

  // =================================
  // Verification Token
  // =================================

  const verificationToken = generateRandomString(32);

  const verificationTokenHash = await hashPassword(verificationToken);

  // =================================
  // Create User
  // =================================

  const user = await UserModel.create({
    ...userData,

    email: userData.email.toLowerCase(),

    department: departmentId,
    specialty: specialtyId,
    doctor: doctorId,

    password: hashedPassword,

    userId,

    verificationTokenHash,
    isFirstLogin: true,

    isActive: true,
  });

  // =================================
  // Login URL
  // =================================

  const loginUrl = `${process.env.FRONTEND_URL}/login`;

  // =================================
  // Send Welcome Email
  // =================================

  await sendEmail({
    to: user.email,
    subject: 'Welcome to HMS - Your Account is Ready',

    html: welcomeEmailTemplate(
      user.firstName,
      user.email,
      user.role,
      rawPassword,
      loginUrl
    ),
  });

  // =================================
  // Return Safe User Data
  // =================================

  return {
    user: sanitizeUser(user),
  };
};

const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new AppError(401, 'Invalid email or password');
  }

  const token = loginAccessToken({ id: user._id, role: user.role });
  const refreshToken = loginRefreshToken({ id: user._id });

  return {
    token,
    refreshToken,
    user: sanitizeUser(user),
  };
};

const updateDutyStatus = async (
  userId: string,
  dutyStatus: 'On Duty' | 'Off Duty'
) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  user.dutyStatus = dutyStatus;

  if (dutyStatus === 'Off Duty') {
    // Going off duty clears availability — "Busy"/"Break" only make sense
    // for someone who's actually clocked in.
    user.availabilityStatus = undefined;
  } else if (!user.availabilityStatus) {
    // Coming on duty with no availability set yet defaults to Available.
    user.availabilityStatus = 'Available';
  }

  await user.save();

  return sanitizeUser(user);
};

const updateAvailabilityStatus = async (
  userId: string,
  availabilityStatus: 'Available' | 'Break' | 'Busy'
) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (user.dutyStatus !== 'On Duty') {
    throw new AppError(
      400,
      'Cannot set availability while off duty. Go on duty first.'
    );
  }

  user.availabilityStatus = availabilityStatus;
  await user.save();

  return sanitizeUser(user);
};

export {
  registerUser,
  loginService,
  updateDutyStatus,
  updateAvailabilityStatus,
};
