"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HospitalSchema = new mongoose_1.Schema({
    hospitalName: {
        type: String,
        required: [true, 'Hospital Name is required'],
        trim: true,
    },
    hospitalCode: {
        type: String,
        required: [true, 'Hospital Code is required'],
        unique: true,
        trim: true,
    },
    hospitalEmail: {
        type: String,
        required: [true, 'Hospital Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    hospitalPhone: {
        type: String,
        required: [true, 'Hospital Phone Number is required'],
        unique: true,
        trim: true,
    },
    address: {
        addressLine1: String,
        addressLine2: String,
        city: {
            type: String,
            required: true,
        },
        state: String,
        country: {
            type: String,
            required: true,
        },
        postalCode: String,
    },
    status: {
        type: String,
        enum: ['trial', 'active', 'inactive', 'suspended', 'expired'],
        default: 'trial',
    },
    trialEndsAt: {
        type: Date,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const HospitalModel = mongoose_1.models.Hospital || (0, mongoose_1.model)('Hospital', HospitalSchema);
exports.default = HospitalModel;
