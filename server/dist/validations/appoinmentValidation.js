"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppoinmentSchema = exports.updateAppoinmentSchema = exports.createAppoinmentSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const objectId = (message) => zod_1.z
    .string({ error: message })
    .trim()
    .refine((value) => mongoose_1.Types.ObjectId.isValid(value), { error: message });
const createAppoinmentSchema = zod_1.z.object({
    patient: objectId('Valid patient id is required'),
    doctor: objectId('Valid doctor id is required'),
    hospital: objectId('Valid hospital id is required'),
    department: objectId('Valid department id is required'),
    appointmentDate: zod_1.z.coerce.date({
        error: 'Valid appointment date is required',
    }),
    appoinmentTime: zod_1.z
        .string()
        .trim()
        .min(1, 'Appointment time is required')
        .optional(),
    priority: zod_1.z.enum(['normal', 'urgent', 'emergency']).optional(),
    appoinmentType: zod_1.z
        .enum(['follow-up', 'newPaitent', 'consultation', 'check-up', 'procedure'])
        .optional(),
});
exports.createAppoinmentSchema = createAppoinmentSchema;
const updateAppoinmentSchema = createAppoinmentSchema.partial().extend({
    status: zod_1.z
        .enum(['scheduled', 'confirmed', 'cancelled', 'rejected', 'completed'])
        .optional(),
});
exports.updateAppoinmentSchema = updateAppoinmentSchema;
const cancelAppoinmentSchema = zod_1.z.object({
    cancelreason: zod_1.z.string().trim().min(1, 'Cancel reason is required'),
});
exports.cancelAppoinmentSchema = cancelAppoinmentSchema;
