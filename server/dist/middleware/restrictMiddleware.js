"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictMiddleware = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const restrictMiddleware = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            throw new appError_1.default(403, 'You do not have permission to perform this action');
        }
        next();
    };
};
exports.restrictMiddleware = restrictMiddleware;
