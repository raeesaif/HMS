import { z } from 'zod';

const requiredString = (message: string) =>
  z.string({ error: message }).trim().min(1, message);

const hospitalSchema = z.object({
  hospitalName: requiredString('Hospital Name is required'),
  hospitalCode: requiredString('Hospital Code is required'),
  hospitalEmail: requiredString('Hospital Email is required').email(
    'Invalid Email'
  ),
  hospitalPhone: requiredString('Hospital Phone is required'),
  address: z.object(
    {
      addressLine1: z.string().trim().optional(),
      addressLine2: z.string().trim().optional(),
      city: requiredString('City is required'),
      state: z.string().trim().optional(),
      country: requiredString('Country is required'),
      postalCode: z.string().trim().optional(),
    },
    { error: 'Address is required' }
  ),
  admin: z.object(
    {
      firstName: requiredString('Admin first name is required'),
      lastName: requiredString('Admin last name is required'),
      email: requiredString('Admin email is required').email('Invalid admin email'),
      phone: z.string().trim().optional(),
    },
    { error: 'Admin details are required' }
  ),
});

export default hospitalSchema;
