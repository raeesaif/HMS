import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Role } from '@src/models/UserModel';

const generateRandomString = (length = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

const comparePassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const generateStaffId = (role: Role): string => {
  const prefixMap: Record<Role, string> = {
    [Role.Patient]: 'P',
    [Role.Doctor]: 'D',
    [Role.Nurse]: 'N',
    [Role.Receptionist]: 'R',
    [Role.Admin]: 'A',
    [Role.SuperAdmin]: 'SA',
  };

  const prefix = prefixMap[role];

  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  return `${prefix}-${randomNumber}`;
};

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export {
  generateRandomString,
  hashPassword,
  comparePassword,
  formatDate,
  slugify,
  generateStaffId,
};
