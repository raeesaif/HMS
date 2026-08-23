import { z } from 'zod';

const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Department name must be at least 2 characters')
    .max(50, 'Department name must be at most 50 characters'),

  description: z
    .string()
    .trim()
    .max(500, 'Department description must be at most 500 characters')
    .optional(),

  isActive: z.boolean().optional(),
});

const updateDepartmentSchema = createDepartmentSchema.partial();

export { createDepartmentSchema, updateDepartmentSchema };
