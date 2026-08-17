import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
};
