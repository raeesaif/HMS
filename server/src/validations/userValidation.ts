import { z } from 'zod';

export const userIdSchema = z.string().min(1, 'User ID is required');

export const emailSchema = z
  .string()
  .trim()
  .email('Please enter a valid email address')
  .toLowerCase();

export const phoneSchema = z
  .string()
  .trim()
  .min(7, 'Phone number is too short')
  .max(20, 'Phone number is too long');

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID');

export const genderSchema = z.enum(['male', 'female']);

export const patientStatusSchema = z.enum([
  'stable',
  'observation',
  'critical',
  'discharged',
]);
