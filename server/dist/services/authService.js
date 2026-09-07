"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.updatePassword = exports.updateAvailabilityStatus = exports.updateDutyStatus = exports.loginService = exports.registerUser = void 0;
const mongoose_1 = require("mongoose");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserModel_2 = require("../models/UserModel");
const DepartmentModel_1 = __importDefault(require("../models/DepartmentModel"));
const SpecialtyModel_1 = __importDefault(require("../models/SpecialtyModel"));
const helper_1 = require("../utils/helper");
const jwt_1 = require("../utils/jwt");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const appError_1 = __importDefault(require("../utils/appError"));
const sanitizeUser_1 = __importDefault(require("../utils/sanitizeUser"));
// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeEmailTemplate = require('../emails/WelcomeEmail');
const resetPasswordEmailTemplate = require('../emails/ResetPasswordEmail');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const resolveReference = async (model, label, value) => {
    if (!value)
        return undefined;
    if (mongoose_1.Types.ObjectId.isValid(value))
        return value;
    const document = await model.findOne({
        name: new RegExp(`^${escapeRegExp(value)}$`, 'i'),
    });
    if (!document) {
        throw new appError_1.default(400, `${label} "${value}" not found`);
    }
    return String(document._id);
};
const resolveDoctorId = async (value) => {
    if (!value)
        return undefined;
    if (mongoose_1.Types.ObjectId.isValid(value))
        return value;
    const doctor = await UserModel_1.default.findOne({
        role: UserModel_2.Role.Doctor,
        $or: [{ userId: value }, { email: value.toLowerCase() }],
    });
    if (!doctor) {
        throw new appError_1.default(400, `Doctor "${value}" not found`);
    }
    return String(doctor._id);
};
const registerUser = async (userData) => {
    const existingUser = await UserModel_1.default.findOne({
        email: userData.email.toLowerCase(),
    });
    if (existingUser) {
        throw new appError_1.default(409, 'User with this email already exists');
    }
    // =================================
    // Resolve department / specialty names to ids
    // =================================
    const departmentId = await resolveReference(DepartmentModel_1.default, 'Department', userData.department);
    const specialtyId = await resolveReference(SpecialtyModel_1.default, 'Specialty', userData.specialty);
    const doctorId = await resolveDoctorId(userData.doctor);
    // =================================
    // Generate password
    // =================================
    const rawPassword = (0, helper_1.generateRandomString)(8);
    const hashedPassword = await (0, helper_1.hashPassword)(rawPassword);
    // =================================
    // Generate HMS User ID
    // =================================
    const userId = (0, helper_1.generateStaffId)(userData.role);
    // =================================
    // Verification Token
    // =================================
    const verificationToken = (0, helper_1.generateRandomString)(32);
    const verificationTokenHash = await (0, helper_1.hashPassword)(verificationToken);
    // =================================
    // Create User
    // =================================
    const user = await UserModel_1.default.create({
        ...userData,
        email: userData.email.toLowerCase(),
        department: departmentId,
        specialty: specialtyId,
        doctor: doctorId,
        password: hashedPassword,
        userId,
        verificationTokenHash,
        isFirstLogin: true,
        isActive: true,
    });
    // =================================
    // Login URL
    // =================================
    const loginUrl = `${process.env.FRONTEND_URL}/login`;
    // =================================
    // Send Welcome Email
    // =================================
    await (0, sendEmail_1.default)({
        to: user.email,
        subject: 'Welcome to HMS - Your Account is Ready',
        html: welcomeEmailTemplate(user.firstName, user.lastName, user.email, user.role, rawPassword, loginUrl),
    });
    // =================================
    // Return Safe User Data
    // =================================
    return {
        user: (0, sanitizeUser_1.default)(user),
    };
};
exports.registerUser = registerUser;
const loginService = async ({ email, password, }) => {
    const user = await UserModel_1.default.findOne({
        email: email.toLowerCase(),
    }).select('+password');
    if (!user) {
        throw new appError_1.default(401, 'Invalid email or password');
    }
    const isMatch = await (0, helper_1.comparePassword)(password, user.password);
    if (!isMatch) {
        throw new appError_1.default(401, 'Invalid email or password');
    }
    const token = (0, jwt_1.loginAccessToken)({ id: user._id, role: user.role });
    const refreshToken = (0, jwt_1.loginRefreshToken)({ id: user._id });
    return {
        token,
        refreshToken,
        user: (0, sanitizeUser_1.default)(user),
    };
};
exports.loginService = loginService;
const updateDutyStatus = async (userId, dutyStatus) => {
    const user = await UserModel_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(404, 'User not found');
    }
    user.dutyStatus = dutyStatus;
    if (dutyStatus === 'Off Duty') {
        // Going off duty clears availability — "Busy"/"Break" only make sense
        // for someone who's actually clocked in.
        user.availabilityStatus = undefined;
    }
    else if (!user.availabilityStatus) {
        // Coming on duty with no availability set yet defaults to Available.
        user.availabilityStatus = 'Available';
    }
    await user.save();
    return (0, sanitizeUser_1.default)(user);
};
exports.updateDutyStatus = updateDutyStatus;
const updateAvailabilityStatus = async (userId, availabilityStatus) => {
    const user = await UserModel_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(404, 'User not found');
    }
    if (user.dutyStatus !== 'On Duty') {
        throw new appError_1.default(400, 'Cannot set availability while off duty. Go on duty first.');
    }
    user.availabilityStatus = availabilityStatus;
    await user.save();
    return (0, sanitizeUser_1.default)(user);
};
exports.updateAvailabilityStatus = updateAvailabilityStatus;
const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await UserModel_1.default.findById(userId).select('+password');
    if (!user) {
        throw new appError_1.default(404, 'User not found');
    }
    const isMatch = await (0, helper_1.comparePassword)(currentPassword, user.password);
    if (!isMatch) {
        throw new appError_1.default(400, 'Current password is incorrect');
    }
    const hashedPassword = await (0, helper_1.hashPassword)(newPassword);
    user.password = hashedPassword;
    await user.save();
    return (0, sanitizeUser_1.default)(user);
};
exports.updatePassword = updatePassword;
const forgetPassword = async (email) => {
    const user = await UserModel_1.default.findOne({
        email: email.toLowerCase(),
    });
    const genericResponse = {
        message: 'If an account exists with this email, you will receive a password reset link.',
    };
    // Never let the caller distinguish "no such email" from "email sent" —
    // return the same generic response either way.
    if (!user) {
        return genericResponse;
    }
    // =================================
    // Generate & persist reset token
    // =================================
    const resetToken = (0, helper_1.generateRandomString)(32);
    const resetTokenHash = await (0, helper_1.hashPassword)(resetToken);
    user.resetPasswordTokenHash = resetTokenHash;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();
    // =================================
    // Build reset URL
    // =================================
    const forgetUrl = `${process.env.FRONTEND_URL}/reset-password?email=${encodeURIComponent(user.email)}&token=${encodeURIComponent(resetToken)}`;
    // =================================
    // Send Reset Password Email
    // =================================
    await (0, sendEmail_1.default)({
        to: user.email,
        subject: 'Reset Your Password',
        html: resetPasswordEmailTemplate(user.firstName, user.lastName, forgetUrl),
    });
    return genericResponse;
};
exports.forgetPassword = forgetPassword;
const resetPassword = async (email, token, newPassword) => {
    const user = await UserModel_1.default.findOne({
        email: email.toLowerCase(),
    }).select('+resetPasswordTokenHash +resetPasswordTokenExpiry');
    if (!user) {
        throw new appError_1.default(404, 'User not found');
    }
    if (!user.resetPasswordTokenHash) {
        throw new appError_1.default(400, 'Invalid reset token');
    }
    const isMatch = await (0, helper_1.comparePassword)(token, user.resetPasswordTokenHash);
    if (!isMatch) {
        throw new appError_1.default(400, 'Invalid reset token');
    }
    if (user.resetPasswordTokenExpiry < new Date()) {
        throw new appError_1.default(400, 'Reset token has expired');
    }
    const hashedPassword = await (0, helper_1.hashPassword)(newPassword);
    user.password = hashedPassword;
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();
    return (0, sanitizeUser_1.default)(user);
};
exports.resetPassword = resetPassword;
