"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialtyController_1 = require("../controllers/specialtyController");
const specialtyValidation_1 = require("../validations/specialtyValidation");
const validateSchemaPayload_1 = __importDefault(require("../utils/validateSchemaPayload"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const restrictMiddleware_1 = require("../middleware/restrictMiddleware");
const specialtyRouter = (0, express_1.Router)();
specialtyRouter.get('/', specialtyController_1.getAllSpecialties);
specialtyRouter.get('/:id', specialtyController_1.getSpecialty);
specialtyRouter.use(authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('admin', 'superadmin'));
specialtyRouter.post('/', (0, validateSchemaPayload_1.default)(specialtyValidation_1.createSpecialtySchema), specialtyController_1.createSpecialty);
specialtyRouter.patch('/:id', (0, validateSchemaPayload_1.default)(specialtyValidation_1.updateSpecialtySchema), specialtyController_1.updateSpecialty);
specialtyRouter.delete('/:id', specialtyController_1.deleteSpecialty);
exports.default = specialtyRouter;
