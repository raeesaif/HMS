"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecialty = exports.updateSpecialty = exports.getSpecialty = exports.getAllSpecialties = exports.createSpecialty = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const specialtyService_1 = require("../services/specialtyService");
const createSpecialty = (0, catchAsync_1.default)(async (req, res) => {
    const specialty = await (0, specialtyService_1.createSpecialty)(req.body);
    apiResponse_1.default.success(res, specialty, 'Specialty created successfully', 201);
});
exports.createSpecialty = createSpecialty;
const getAllSpecialties = (0, catchAsync_1.default)(async (_req, res) => {
    const specialties = await (0, specialtyService_1.getAllSpecialties)();
    apiResponse_1.default.success(res, specialties, 'Specialties fetched successfully');
});
exports.getAllSpecialties = getAllSpecialties;
const getSpecialty = (0, catchAsync_1.default)(async (req, res) => {
    const specialty = await (0, specialtyService_1.getSpecialtyById)(String(req.params.id));
    apiResponse_1.default.success(res, specialty, 'Specialty fetched successfully');
});
exports.getSpecialty = getSpecialty;
const updateSpecialty = (0, catchAsync_1.default)(async (req, res) => {
    const specialty = await (0, specialtyService_1.updateSpecialty)(String(req.params.id), req.body);
    apiResponse_1.default.success(res, specialty, 'Specialty updated successfully');
});
exports.updateSpecialty = updateSpecialty;
const deleteSpecialty = (0, catchAsync_1.default)(async (req, res) => {
    await (0, specialtyService_1.deleteSpecialty)(String(req.params.id));
    apiResponse_1.default.success(res, null, 'Specialty deleted successfully');
});
exports.deleteSpecialty = deleteSpecialty;
