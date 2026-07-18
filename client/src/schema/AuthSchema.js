import zod from 'zod';

export const LoginSchema = zod.object({
  email: zod
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters long'),
});

export const forgetSchema = zod.object({
  email: zod
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
});
