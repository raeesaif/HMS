import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = (message: string) =>
  z
    .string({ error: message })
    .trim()
    .refine((value) => Types.ObjectId.isValid(value), { error: message });

const createAppoinmentSchema = z.object({
  patient: objectId('Valid patient id is required'),
  doctor: objectId('Valid doctor id is required'),
  hospital: objectId('Valid hospital id is required'),
  department: objectId('Valid department id is required'),

  appointmentDate: z.coerce.date({
    error: 'Valid appointment date is required',
  }),
  appoinmentTime: z
    .string()
    .trim()
    .min(1, 'Appointment time is required')
    .optional(),

  priority: z.enum(['normal', 'urgent', 'emergency']).optional(),

  appoinmentType: z
    .enum(['follow-up', 'newPaitent', 'consultation', 'check-up', 'procedure'])
    .optional(),
});

const updateAppoinmentSchema = createAppoinmentSchema.partial().extend({
  status: z
    .enum(['scheduled', 'confirmed', 'cancelled', 'rejected', 'completed'])
    .optional(),
});

const cancelAppoinmentSchema = z.object({
  cancelreason: z.string().trim().min(1, 'Cancel reason is required'),
});

export {
  createAppoinmentSchema,
  updateAppoinmentSchema,
  cancelAppoinmentSchema,
};
