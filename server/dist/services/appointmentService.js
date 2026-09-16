"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppoinmentService = exports.deleteAppoinmentService = exports.getAvailableSlotsService = exports.getAllappoinmentService = exports.CreateAppoinmentService = void 0;
const AppointmentModel_1 = __importDefault(require("../models/AppointmentModel"));
const UserModel_1 = __importStar(require("../models/UserModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const helper_1 = require("../utils/helper");
const appointmentSlots_1 = __importDefault(require("../utils/appointmentSlots"));
const CreateAppoinmentService = async (appoinmentData, createdBy) => {
    const { patient, doctor, appointmentDate, appoinmentTime } = appoinmentData;
    const doctorDoc = await UserModel_1.default.findOne({ _id: doctor, role: UserModel_1.Role.Doctor });
    if (!doctorDoc) {
        throw new appError_1.default(404, 'Doctor not found');
    }
    const patientDoc = await UserModel_1.default.findOne({
        _id: patient,
        role: UserModel_1.Role.Patient,
    });
    if (!patientDoc) {
        throw new appError_1.default(404, 'Patient not found');
    }
    const conflict = await AppointmentModel_1.default.findOne({
        doctor,
        appointmentDate,
        appoinmentTime,
        status: { $in: ['scheduled', 'confirmed'] },
    });
    if (conflict) {
        throw new appError_1.default(409, 'This slot is already booked for the selected doctor');
    }
    const appointmentId = `APT-${(0, helper_1.generateRandomString)(8).toUpperCase()}`;
    const appointment = await AppointmentModel_1.default.create({
        ...appoinmentData,
        appointmentId,
        createdBy,
    });
    await appointment.populate([
        { path: 'patient', select: 'firstName lastName email' },
        { path: 'doctor', select: 'firstName lastName email' },
        { path: 'department', select: 'name' },
        { path: 'createdBy', select: 'firstName lastName' },
    ]);
    return appointment;
};
exports.CreateAppoinmentService = CreateAppoinmentService;
const getAllappoinmentService = async () => {
    return AppointmentModel_1.default
        .find()
        .populate('patient', 'firstName lastName email')
        .populate('doctor', 'firstName lastName email')
        .populate('department', 'name')
        .populate('createdBy', 'firstName lastName')
        .sort({ appointmentDate: 1 });
};
exports.getAllappoinmentService = getAllappoinmentService;
const dayRange = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end };
};
const getAvailableSlotsService = async (doctorId, date) => {
    const doctorDoc = await UserModel_1.default.findOne({
        _id: doctorId,
        role: UserModel_1.Role.Doctor,
    });
    if (!doctorDoc) {
        throw new appError_1.default(404, 'Doctor not found');
    }
    if (!doctorDoc.shiftStart || !doctorDoc.shiftEnd) {
        throw new appError_1.default(400, 'Doctor has no shift timing configured');
    }
    const allSlots = (0, appointmentSlots_1.default)(doctorDoc.shiftStart, doctorDoc.shiftEnd);
    const { start, end } = dayRange(date);
    const bookedAppointments = await AppointmentModel_1.default.find({
        doctor: doctorId,
        appointmentDate: { $gte: start, $lt: end },
        status: { $in: ['scheduled', 'confirmed'] },
    });
    const bookedSlots = new Set(bookedAppointments.map((appt) => appt.appoinmentTime));
    return allSlots.filter((slot) => !bookedSlots.has(slot));
};
exports.getAvailableSlotsService = getAvailableSlotsService;
const cancelAppoinmentService = async (id, cancelreason) => {
    const appoinment = await AppointmentModel_1.default.findByIdAndUpdate(id, { status: 'cancelled', cancelreason }, { new: true });
    if (!appoinment) {
        throw new appError_1.default(404, 'Appoinment not found');
    }
    return appoinment;
};
exports.cancelAppoinmentService = cancelAppoinmentService;
const deleteAppoinmentService = async (id) => {
    const appoinment = await AppointmentModel_1.default.findByIdAndDelete(id);
    if (!appoinment) {
        throw new appError_1.default(404, 'Appoinment not found');
    }
};
exports.deleteAppoinmentService = deleteAppoinmentService;
