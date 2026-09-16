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
    appoinmentTime: {
        type: String,
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'cancelled', 'rejected', 'completed'],
        default: 'scheduled',
    },
    priority: {
        type: String,
        enum: ['normal', 'urgent', 'emergency'],
    },
    department: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    appoinmentType: {
        type: String,
        enum: [
            'follow-up',
            'newPaitent',
            'consultation',
            'check-up',
            'procedure',
        ],
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const appoinmentModel = mongoose_1.models.appoinment || (0, mongoose_1.model)('appoinment', appointmentSchema);
exports.default = appoinmentModel;
