"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true,
        minLength: [2, 'Department name must be at least 2 characters'],
        maxLength: [50, 'Department name must be at most 50 characters'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Department description must be at most 500 characters'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const DepartmentModel = mongoose_1.models.Department || (0, mongoose_1.model)('Department', DepartmentSchema);
exports.default = DepartmentModel;
