"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartment = exports.getAllDepartments = exports.createDepartment = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const departmentService_1 = require("../services/departmentService");
const createDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const department = await (0, departmentService_1.createDepartment)(req.body);
    apiResponse_1.default.success(res, department, 'Department created successfully', 201);
});
exports.createDepartment = createDepartment;
const getAllDepartments = (0, catchAsync_1.default)(async (_req, res) => {
    const departments = await (0, departmentService_1.getAllDepartments)();
    apiResponse_1.default.success(res, departments, 'Departments fetched successfully');
});
exports.getAllDepartments = getAllDepartments;
const getDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const department = await (0, departmentService_1.getDepartmentById)(String(req.params.id));
    apiResponse_1.default.success(res, department, 'Department fetched successfully');
});
exports.getDepartment = getDepartment;
const updateDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const department = await (0, departmentService_1.updateDepartment)(String(req.params.id), req.body);
    apiResponse_1.default.success(res, department, 'Department updated successfully');
});
exports.updateDepartment = updateDepartment;
const deleteDepartment = (0, catchAsync_1.default)(async (req, res) => {
    await (0, departmentService_1.deleteDepartment)(String(req.params.id));
    apiResponse_1.default.success(res, null, 'Department deleted successfully');
});
exports.deleteDepartment = deleteDepartment;
