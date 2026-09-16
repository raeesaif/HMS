"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validateSchemaPayload_1 = __importDefault(require("../utils/validateSchemaPayload"));
const appoinmentValidation_1 = require("../validations/appoinmentValidation");
const appoinmentRouter = (0, express_1.Router)();
appoinmentRouter.post('/appoinment', authMiddleware_1.authMiddleware, (0, validateSchemaPayload_1.default)(appoinmentValidation_1.createAppoinmentSchema), appointmentController_1.createAppoinmentController);
appoinmentRouter.get('/get-appoinment', authMiddleware_1.authMiddleware, appointmentController_1.getAppoinmentController);
appoinmentRouter.get('/appoinment/available-slots', authMiddleware_1.authMiddleware, appointmentController_1.getAvailableSlotsController);
appoinmentRouter.patch('/appoinment/:id/cancel', authMiddleware_1.authMiddleware, (0, validateSchemaPayload_1.default)(appoinmentValidation_1.cancelAppoinmentSchema), appointmentController_1.cancelAppoinmentController);
appoinmentRouter.delete('/appoinment/:id', authMiddleware_1.authMiddleware, appointmentController_1.deleteAppoinmentController);
exports.default = appoinmentRouter;
