"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("../routes/authRoute"));
const departmentRoute_1 = __importDefault(require("../routes/departmentRoute"));
const specialtyRoute_1 = __importDefault(require("../routes/specialtyRoute"));
const hospitalRoute_1 = __importDefault(require("../routes/hospitalRoute"));
module.exports = (app) => {
    app.use('/api/v1/auth', authRoute_1.default);
    app.use('/api/v1/departments', departmentRoute_1.default);
    app.use('/api/v1/specialties', specialtyRoute_1.default);
    app.use('/api/v1', hospitalRoute_1.default);
};
