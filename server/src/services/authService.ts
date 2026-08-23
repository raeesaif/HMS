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

import sendEmail from '@src/utils/sendEmail';
import AppError from '@src/utils/appError';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeEmailTemplate = require('@src/emails/WelcomeEmail').default;

type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;

  phone?: string;

  department?: string;
  specialty?: string;

  licenseNumber?: string;
  qualification?: string;
  experience?: number;

  shiftStart?: string;
  shiftEnd?: string;
  isOnDuty?: boolean;

  gender?: 'male' | 'female';

  patientStatus?: 'stable' | 'observation' | 'critical' | 'discharged';
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

    password: hashedPassword,

    userId,

    verificationTokenHash,

    isVerified: false,

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
    user: {
      id: user._id,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      specialty: user.specialty,
      isFirstLogin: user.isFirstLogin,
      isActive: user.isActive,
    },
  };
};

const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export { registerUser, login };
