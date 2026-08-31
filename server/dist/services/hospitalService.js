"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHospital = exports.getHospitalById = exports.updateHospital = exports.getAllHospital = exports.createHospital = void 0;
const HospitalModel_1 = __importDefault(require("../models/HospitalModel"));
const UserModel_1 = require("../models/UserModel");
const authService_1 = require("../services/authService");
const appError_1 = __importDefault(require("../utils/appError"));
const UserModel_2 = __importDefault(require("../models/UserModel"));
const sanitizeUser_1 = __importDefault(require("../utils/sanitizeUser"));
const TRIAL_DURATION_DAYS = 30;
const createHospital = async (hospitalData) => {
    const { admin, ...hospitalFields } = hospitalData;
    const hospitalEmail = hospitalFields.hospitalEmail.toLowerCase();
    const existingHospital = await HospitalModel_1.default.findOne({
        hospitalEmail,
    });
    if (existingHospital) {
        throw new appError_1.default(409, 'Hospital with this email already exists');
    }
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DURATION_DAYS);
    const hospital = await HospitalModel_1.default.create({
        ...hospitalFields,
        hospitalEmail,
        status: 'trial',
        trialEndsAt,
    });
    try {
        const { user: adminUser } = await (0, authService_1.registerUser)({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            phone: admin.phone,
            role: UserModel_1.Role.Admin,
            hospitalId: String(hospital._id),
        });
        return {
            hospital,
            admin: adminUser,
        };
    }
    catch (error) {
        await HospitalModel_1.default.findByIdAndDelete(hospital._id);
        throw error;
    }
};
exports.createHospital = createHospital;
const getAllHospital = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [hospitals, total] = await Promise.all([
        HospitalModel_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
        HospitalModel_1.default.countDocuments(),
    ]);
    const hospitalWithUsers = await Promise.all(hospitals.map(async (hospital) => {
        const [totalUser, adminUser] = await Promise.all([
            UserModel_2.default.countDocuments({
                hospitalId: hospital._id,
                role: { $in: ['doctor', 'nurse', 'receptionist', 'patient'] },
            }),
            UserModel_2.default.findOne({ hospitalId: hospital._id, role: UserModel_1.Role.Admin }),
        ]);
        return {
            ...hospital.toObject(),
            totalUser,
            admin: adminUser ? (0, sanitizeUser_1.default)(adminUser) : null,
        };
    }));
    return {
        hospitals: hospitalWithUsers,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getAllHospital = getAllHospital;
const updateHospital = async (id, payload) => {
    const { admin, ...hospitalFields } = payload;
    const hospital = await HospitalModel_1.default.findByIdAndUpdate(id, hospitalFields, {
        new: true,
        runValidators: true,
    });
    if (!hospital) {
        throw new appError_1.default(404, 'Hospital not found');
    }
    let adminUser = null;
    if (admin) {
        adminUser = await UserModel_2.default.findOneAndUpdate({ hospitalId: id, role: UserModel_1.Role.Admin }, admin, { new: true, runValidators: true });
    }
    return {
        hospital,
        admin: adminUser ? (0, sanitizeUser_1.default)(adminUser) : null,
    };
};
exports.updateHospital = updateHospital;
const getHospitalById = async (id) => {
    const hospital = await HospitalModel_1.default.findById(id);
    if (!hospital) {
        throw new appError_1.default(404, 'Hospital not found');
    }
    return hospital;
};
exports.getHospitalById = getHospitalById;
const deleteHospital = async (id) => {
    const hospital = await HospitalModel_1.default.findByIdAndDelete(id);
    if (!hospital) {
        throw new appError_1.default(404, "Hospital not found");
    }
};
exports.deleteHospital = deleteHospital;
