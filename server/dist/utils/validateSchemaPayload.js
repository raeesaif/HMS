"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const validateSchemaPayload = (schema) => (0, catchAsync_1.default)(async (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(", ");
        return next(new appError_1.default(400, message));
    }
    req.body = result.data;
    next();
});
exports.default = validateSchemaPayload;
