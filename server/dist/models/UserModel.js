"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role["SuperAdmin"] = "superadmin";
    Role["Admin"] = "admin";
    Role["Doctor"] = "doctor";
    Role["Nurse"] = "nurse";
    Role["Receptionist"] = "receptionist";
    Role["Patient"] = "patient";
})(Role || (exports.Role = Role = {}));
const UserSchema = new mongoose_1.Schema({
    // =========================
    // Basic Information
    // =========================
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minLength: [2, 'First name must be at least 2 characters'],
        maxLength: [50, 'First name must be at most 50 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minLength: [2, 'Last name must be at least 2 characters'],
        maxLength: [50, 'Last name must be at most 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    // =========================
    // Role & Identification
    // =========================
    role: {
        type: String,
        enum: {
            values: Object.values(Role),
            message: 'Role must be one of: ' + Object.values(Role).join(', '),
        },
        required: [true, 'Role is required'],
        default: Role.Patient,
    },
    userId: {
        type: String,
        unique: true,
        index: true,
        trim: true,
    },
    // =========================
    // Department & Specialty
    // =========================
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Department',
    },
    specialty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Specialty',
    },
    // =========================
    // Doctor / Nurse Information
    // =========================
    licenseNumber: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
    },
    qualification: {
        type: String,
        trim: true,
    },
    experience: {
        type: Number,
        min: [0, 'Experience cannot be negative'],
    },
    // =========================
    // Shift Information
    // =========================
    shiftStart: {
        type: String,
        trim: true,
    },
    shiftEnd: {
        type: String,
        trim: true,
    },
    // Free-text desk/area assignment for receptionists (e.g. "Front Desk",
    // "Emergency Reception") — distinct from `department`, which is a
    // reference to the hospital's Department collection.
    staffDepartment: {
        type: String,
        trim: true,
    },
    // Free-text ward/unit assignment for nurses (e.g. "ICU", "Ward 3").
    ward: {
        type: String,
        trim: true,
    },
    // Whether the staff member is clocked in at all.
    dutyStatus: {
        type: String,
        enum: {
            values: ['On Duty', 'Off Duty'],
            message: 'Duty status must be On Duty or Off Duty',
        },
        default: 'Off Duty',
    },
    // Real-time task availability while on duty. Kept separate from
    // dutyStatus on purpose — "Busy" describes what an on-duty person is
    // doing right now, not whether they're clocked in.
    availabilityStatus: {
        type: String,
        enum: {
            values: ['Available', 'Break', 'Busy'],
            message: 'Availability status must be Available, Break, or Busy',
        },
    },
    // =========================
    // Patient Information
    // =========================
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Gender must be male or female',
        },
    },
    patientStatus: {
        type: String,
        enum: {
            values: ['stable', 'observation', 'critical', 'discharged'],
            message: 'Patient status must be stable, observation, critical, or discharged',
        },
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
        },
    },
    doctor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    admissionDate: {
        type: Date,
    },
    // =========================
    // Account Status
    // =========================
    isActive: {
        type: Boolean,
        default: true,
    },
    isFirstLogin: {
        type: Boolean,
        default: true,
    },
    // =========================
    // Email Verification
    // =========================
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationTokenHash: {
        type: String,
        select: false,
    },
    verificationTokenExpiry: {
        type: Date,
        select: false,
    },
    // =========================
    // Refresh Token
    // =========================
    refreshTokenHash: {
        type: String,
        select: false,
    },
    hospitalId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Hospital",
        default: null
    }
}, {
    timestamps: true,
});
const UserModel = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
