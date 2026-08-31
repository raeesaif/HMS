"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaffId = exports.slugify = exports.formatDate = exports.comparePassword = exports.hashPassword = exports.generateRandomString = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const UserModel_1 = require("../models/UserModel");
const generateRandomString = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateRandomString = generateRandomString;
const hashPassword = (password) => {
    return bcryptjs_1.default.hash(password, 12);
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateStaffId = (role) => {
    const prefixMap = {
        [UserModel_1.Role.Patient]: 'P',
        [UserModel_1.Role.Doctor]: 'D',
        [UserModel_1.Role.Nurse]: 'N',
        [UserModel_1.Role.Receptionist]: 'R',
        [UserModel_1.Role.Admin]: 'A',
        [UserModel_1.Role.SuperAdmin]: 'SA',
    };
    const prefix = prefixMap[role];
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomNumber}`;
};
exports.generateStaffId = generateStaffId;
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
exports.formatDate = formatDate;
const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};
exports.slugify = slugify;
