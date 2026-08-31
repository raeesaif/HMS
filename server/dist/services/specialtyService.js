"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecialty = exports.updateSpecialty = exports.getSpecialtyById = exports.getAllSpecialties = exports.createSpecialty = void 0;
const mongoose_1 = require("mongoose");
const SpecialtyModel_1 = __importDefault(require("../models/SpecialtyModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const assertValidId = (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new appError_1.default(400, 'Invalid specialty id');
    }
};
const createSpecialty = async (data) => {
    const existing = await SpecialtyModel_1.default.findOne({ name: data.name });
    if (existing) {
        throw new appError_1.default(409, 'Specialty with this name already exists');
    }
    return SpecialtyModel_1.default.create(data);
};
exports.createSpecialty = createSpecialty;
const getAllSpecialties = async () => {
    return SpecialtyModel_1.default.find().sort({ name: 1 });
};
exports.getAllSpecialties = getAllSpecialties;
const getSpecialtyById = async (id) => {
    assertValidId(id);
    const specialty = await SpecialtyModel_1.default.findById(id);
    if (!specialty) {
        throw new appError_1.default(404, 'Specialty not found');
    }
    return specialty;
};
exports.getSpecialtyById = getSpecialtyById;
const updateSpecialty = async (id, data) => {
    assertValidId(id);
    const specialty = await SpecialtyModel_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!specialty) {
        throw new appError_1.default(404, 'Specialty not found');
    }
    return specialty;
};
exports.updateSpecialty = updateSpecialty;
const deleteSpecialty = async (id) => {
    assertValidId(id);
    const specialty = await SpecialtyModel_1.default.findByIdAndDelete(id);
    if (!specialty) {
        throw new appError_1.default(404, 'Specialty not found');
    }
};
exports.deleteSpecialty = deleteSpecialty;
