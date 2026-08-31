"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SpecialtySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Specialty name is required'],
        unique: true,
        trim: true,
        minLength: [2, 'Specialty name must be at least 2 characters'],
        maxLength: [100, 'Specialty name must be at most 100 characters'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const SpecialtyModel = mongoose_1.models.Specialty || (0, mongoose_1.model)('Specialty', SpecialtySchema);
exports.default = SpecialtyModel;
