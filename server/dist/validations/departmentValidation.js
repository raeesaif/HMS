"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
const createDepartmentSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Department name must be at least 2 characters')
        .max(50, 'Department name must be at most 50 characters'),
    description: zod_1.z
        .string()
        .trim()
        .max(500, 'Department description must be at most 500 characters')
        .optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.createDepartmentSchema = createDepartmentSchema;
const updateDepartmentSchema = createDepartmentSchema.partial();
exports.updateDepartmentSchema = updateDepartmentSchema;
