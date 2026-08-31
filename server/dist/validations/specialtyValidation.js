"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSpecialtySchema = exports.createSpecialtySchema = void 0;
const zod_1 = require("zod");
const createSpecialtySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Specialty name must be at least 2 characters')
        .max(100, 'Specialty name must be at most 100 characters'),
    description: zod_1.z
        .string()
        .trim()
        .max(500, 'Description cannot exceed 500 characters')
        .optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.createSpecialtySchema = createSpecialtySchema;
const updateSpecialtySchema = createSpecialtySchema.partial();
exports.updateSpecialtySchema = updateSpecialtySchema;
