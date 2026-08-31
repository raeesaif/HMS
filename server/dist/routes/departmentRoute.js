"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departmentController_1 = require("../controllers/departmentController");
const departmentValidation_1 = require("../validations/departmentValidation");
const validateSchemaPayload_1 = __importDefault(require("../utils/validateSchemaPayload"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const restrictMiddleware_1 = require("../middleware/restrictMiddleware");
const departmentRouter = (0, express_1.Router)();
departmentRouter.get('/', departmentController_1.getAllDepartments);
departmentRouter.get('/:id', departmentController_1.getDepartment);
departmentRouter.use(authMiddleware_1.authMiddleware, (0, restrictMiddleware_1.restrictMiddleware)('admin', 'superadmin'));
departmentRouter.post('/', (0, validateSchemaPayload_1.default)(departmentValidation_1.createDepartmentSchema), departmentController_1.createDepartment);
departmentRouter.patch('/:id', (0, validateSchemaPayload_1.default)(departmentValidation_1.updateDepartmentSchema), departmentController_1.updateDepartment);
departmentRouter.delete('/:id', departmentController_1.deleteDepartment);
exports.default = departmentRouter;
