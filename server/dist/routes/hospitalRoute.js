"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospitalController_1 = require("../controllers/hospitalController");
const validateSchemaPayload_1 = __importDefault(require("../utils/validateSchemaPayload"));
const hospitalValidation_1 = __importDefault(require("../validations/hospitalValidation"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const restrictMiddleware_1 = require("../middleware/restrictMiddleware");
const hospitalRoute = (0, express_1.Router)();
hospitalRoute.post('/hospitals', authMiddleware_1.authMiddleware, (0, validateSchemaPayload_1.default)(hospitalValidation_1.default), hospitalController_1.createHospitalController);
hospitalRoute.get('/get-hospitals', authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('superadmin'), hospitalController_1.getAllHospitalController);
hospitalRoute.patch('/hospitals/:id', authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('superadmin'), hospitalController_1.updateHospitalController);
hospitalRoute.get('/hospitals/:id', authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('superadmin'), hospitalController_1.getHospitalController);
hospitalRoute.delete('/hospitals/:id', authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('superadmin'), hospitalController_1.deleteHospitalController);
exports.default = hospitalRoute;
