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
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userValidation_1 = __importStar(require("../validations/userValidation"));
const validateSchemaPayload_1 = __importDefault(require("../utils/validateSchemaPayload"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const restrictMiddleware_1 = require("../middleware/restrictMiddleware");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validateSchemaPayload_1.default)(userValidation_1.default), authController_1.register);
authRouter.post('/login', (0, validateSchemaPayload_1.default)(userValidation_1.loginSchema), authController_1.login);
authRouter.get('/me', authMiddleware_1.authMiddleware, authController_1.meController);
authRouter.patch('/duty-status', authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('doctor', 'nurse', 'receptionist'), (0, validateSchemaPayload_1.default)(userValidation_1.updateDutyStatusSchema), authController_1.updateDutyStatusController);
authRouter.patch('/availability-status', authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('doctor', 'nurse', 'receptionist'), (0, validateSchemaPayload_1.default)(userValidation_1.updateAvailabilityStatusSchema), authController_1.updateAvailabilityStatusController);
exports.default = authRouter;
