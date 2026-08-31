"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.getAllDepartments = exports.createDepartment = void 0;
const mongoose_1 = require("mongoose");
const DepartmentModel_1 = __importDefault(require("../models/DepartmentModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const assertValidId = (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new appError_1.default(400, 'Invalid department id');
    }
};
const createDepartment = async (data) => {
    const existing = await DepartmentModel_1.default.findOne({ name: data.name });
    if (existing) {
        throw new appError_1.default(409, 'Department with this name already exists');
    }
    return DepartmentModel_1.default.create(data);
};
exports.createDepartment = createDepartment;
const getAllDepartments = async () => {
    return DepartmentModel_1.default.find().sort({ name: 1 });
};
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = async (id) => {
    assertValidId(id);
    const department = await DepartmentModel_1.default.findById(id);
    if (!department) {
        throw new appError_1.default(404, 'Department not found');
    }
    return department;
};
exports.getDepartmentById = getDepartmentById;
const updateDepartment = async (id, data) => {
    assertValidId(id);
    const department = await DepartmentModel_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!department) {
        throw new appError_1.default(404, 'Department not found');
    }
    return department;
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (id) => {
    assertValidId(id);
    const department = await DepartmentModel_1.default.findByIdAndDelete(id);
    if (!department) {
        throw new appError_1.default(404, 'Department not found');
    }
};
exports.deleteDepartment = deleteDepartment;
