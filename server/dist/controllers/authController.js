"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgetPasswordController = exports.getReceptionistController = exports.getNurseController = exports.getPatientController = exports.getDoctorsController = exports.updatePasswordController = exports.updateAvailabilityStatusController = exports.updateDutyStatusController = exports.meController = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sanitizeUser_1 = __importDefault(require("../utils/sanitizeUser"));
const appError_1 = __importDefault(require("../utils/appError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserModel_2 = require("../models/UserModel");
const register = (0, catchAsync_1.default)(async (req, res) => {
    const hospitalId = req.user?.hospitalId;
    const user = await (0, authService_1.registerUser)({
        ...req.body,
        ...(hospitalId && { hospitalId: String(hospitalId) }),
    });
    apiResponse_1.default.success(res, user, 'User created successfully', 201);
});
exports.register = register;
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, authService_1.loginService)(req.body);
    apiResponse_1.default.success(res, result, 'Login successful', 200);
});
exports.login = login;
const meController = (0, catchAsync_1.default)(async (req, res) => {
    if (!req.user) {
        throw new appError_1.default(401, 'You are not logged in! Please log in to get access.');
    }
    apiResponse_1.default.success(res, (0, sanitizeUser_1.default)(req.user), 'User fetched successfully', 200);
});
exports.meController = meController;
const updateDutyStatusController = (0, catchAsync_1.default)(async (req, res) => {
    if (!req.user) {
        throw new appError_1.default(401, 'You are not logged in! Please log in to get access.');
    }
    const user = await (0, authService_1.updateDutyStatus)(String(req.user._id), req.body.dutyStatus);
    apiResponse_1.default.success(res, user, 'Duty status updated successfully', 200);
});
exports.updateDutyStatusController = updateDutyStatusController;
const updateAvailabilityStatusController = (0, catchAsync_1.default)(async (req, res) => {
    if (!req.user) {
        throw new appError_1.default(401, 'You are not logged in! Please log in to get access.');
    }
    const user = await (0, authService_1.updateAvailabilityStatus)(String(req.user._id), req.body.availabilityStatus);
    apiResponse_1.default.success(res, user, 'Availability status updated successfully', 200);
});
exports.updateAvailabilityStatusController = updateAvailabilityStatusController;
const getDoctorsController = (0, catchAsync_1.default)(async (req, res) => {
    const hospitalId = req.user?.hospitalId;
    const { department } = req.query;
    const filter = { role: UserModel_2.Role.Doctor, hospitalId };
    if (department)
        filter.department = department;
    const doctors = await UserModel_1.default.find(filter).select('_id firstName lastName userId');
    apiResponse_1.default.success(res, doctors, 'Doctors fetched successfully', 200);
});
exports.getDoctorsController = getDoctorsController;
const getPatientController = (0, catchAsync_1.default)(async (req, res) => {
    const hospitalId = req.user?.hospitalId;
    const filter = { role: UserModel_2.Role.Patient, hospitalId };
    const patient = await UserModel_1.default.find(filter);
    apiResponse_1.default.success(res, patient, 'Patient fetched successfully', 200);
});
exports.getPatientController = getPatientController;
const getNurseController = (0, catchAsync_1.default)(async (req, res) => {
    const hospitalId = req.user?.hospitalId;
    const filter = { role: UserModel_2.Role.Nurse, hospitalId };
    const nurse = await UserModel_1.default.find(filter);
    apiResponse_1.default.success(res, nurse, 'Nurse fetched successfully', 200);
});
exports.getNurseController = getNurseController;
const getReceptionistController = (0, catchAsync_1.default)(async (req, res) => {
    const hospitalId = req.user?.hospitalId;
    const filter = { role: UserModel_2.Role.Receptionist, hospitalId };
    const receptionist = await UserModel_1.default.find(filter);
    apiResponse_1.default.success(res, receptionist, 'Receptionist fetched successfully', 200);
});
exports.getReceptionistController = getReceptionistController;
const updatePasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const password = await (0, authService_1.updatePassword)(String(req.user?._id), req.body.currentPassword, req.body.newPassword);
    apiResponse_1.default.success(res, password, 'Password updated successfully', 200);
});
exports.updatePasswordController = updatePasswordController;
const forgetPasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, authService_1.forgetPassword)(req.body.email);
    apiResponse_1.default.success(res, result, 'Password reset email sent successfully', 200);
});
exports.forgetPasswordController = forgetPasswordController;
const resetPasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, authService_1.resetPassword)(req.body.email, req.body.token, req.body.newPassword);
    apiResponse_1.default.success(res, result, 'Password reset successfully', 200);
});
exports.resetPasswordController = resetPasswordController;
