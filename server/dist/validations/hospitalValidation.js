"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const requiredString = (message) => zod_1.z.string({ error: message }).trim().min(1, message);
const hospitalSchema = zod_1.z.object({
    hospitalName: requiredString('Hospital Name is required'),
    hospitalCode: requiredString('Hospital Code is required'),
    hospitalEmail: requiredString('Hospital Email is required').email('Invalid Email'),
    hospitalPhone: requiredString('Hospital Phone is required'),
    address: zod_1.z.object({
        addressLine1: zod_1.z.string().trim().optional(),
        addressLine2: zod_1.z.string().trim().optional(),
        city: requiredString('City is required'),
        state: zod_1.z.string().trim().optional(),
        country: requiredString('Country is required'),
        postalCode: zod_1.z.string().trim().optional(),
    }, { error: 'Address is required' }),
    admin: zod_1.z.object({
        firstName: requiredString('Admin first name is required'),
        lastName: requiredString('Admin last name is required'),
        email: requiredString('Admin email is required').email('Invalid admin email'),
        phone: zod_1.z.string().trim().optional(),
    }, { error: 'Admin details are required' }),
});
exports.default = hospitalSchema;
