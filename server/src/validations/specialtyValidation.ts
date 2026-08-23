import { z } from 'zod';

const createSpecialtySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Specialty name must be at least 2 characters')
    .max(100, 'Specialty name must be at most 100 characters'),

  description: z
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),

  isActive: z.boolean().optional(),
});

const updateSpecialtySchema = createSpecialtySchema.partial();

export { createSpecialtySchema, updateSpecialtySchema };
