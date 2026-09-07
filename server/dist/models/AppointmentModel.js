"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    appointmentId: {
        type: String,
        required: true,
        unique: true,
    },
    patient: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hospital: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'rejected', 'completed'],
        default: 'pending',
    },
}, {
    timestamps: true,
});
