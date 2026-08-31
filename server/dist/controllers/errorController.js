"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const appError_1 = __importDefault(require("../utils/appError"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const globalErrorHandler = (error, _req, res, _next) => {
    const mongoError = error;
    if (mongoError.code === 11000) {
        const duplicateField = Object.keys(mongoError.keyPattern ?? {})[0];
        const duplicateFieldMessages = {
            email: 'Email is already registered',
            hospitalEmail: 'Hospital email is already registered',
            hospitalCode: 'Hospital code is already registered',
            hospitalPhone: 'Hospital phone number is already registered',
            licenseNumber: 'License number is already registered',
            userId: 'User ID is already registered',
        };
        const message = duplicateFieldMessages[duplicateField] ??
            `${duplicateField} is already registered`;
        (0, sendResponse_1.default)(res, 409, {
            status: 'fail',
            message,
            data: null,
        });
        return;
    }
    if (!(error instanceof appError_1.default)) {
        console.error('INTERNAL SERVER ERROR'.bgRed.white);
        console.error(error);
    }
    const appError = error instanceof appError_1.default
        ? error
        : new appError_1.default(500, 'Something went wrong. Please try again later.');
    (0, sendResponse_1.default)(res, appError.statusCode, {
        status: appError.status,
        message: appError.message,
        data: null,
    });
};
exports.default = globalErrorHandler;
