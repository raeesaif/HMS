"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jwt_1 = require("../utils/jwt");
const appError_1 = __importDefault(require("../utils/appError"));
exports.authMiddleware = (0, catchAsync_1.default)(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new appError_1.default(401, 'You are not logged in! Please log in to get access.');
    }
    let decoded;
    try {
        decoded = (0, jwt_1.verifyAccessToken)(token);
    }
    catch (err) {
        throw new appError_1.default(401, 'Invalid token. Please log in again.');
    }
    const currentUser = await UserModel_1.default.findById(decoded.id);
    if (!currentUser) {
        throw new appError_1.default(401, 'The user belonging to this token does no longer exist.');
    }
    req.user = currentUser;
    next();
});
