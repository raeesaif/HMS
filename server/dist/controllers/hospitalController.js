"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHospitalController = exports.getHospitalController = exports.updateHospitalController = exports.getAllHospitalController = exports.createHospitalController = void 0;
const hospitalService_1 = require("../services/hospitalService");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createHospitalController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, hospitalService_1.createHospital)({
        ...req.body,
        createdBy: req.user._id,
    });
    apiResponse_1.default.success(res, result, 'Hospital created successfully', 201);
});
exports.getAllHospitalController = (0, catchAsync_1.default)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await (0, hospitalService_1.getAllHospital)(page, limit);
    apiResponse_1.default.success(res, result, 'Hospitals fetched successfully', 200);
});
exports.updateHospitalController = (0, catchAsync_1.default)(async (req, res) => {
    const hospital = await (0, hospitalService_1.updateHospital)(String(req.params.id), req.body);
    apiResponse_1.default.success(res, hospital, 'Hospital updated successfully');
});
exports.getHospitalController = (0, catchAsync_1.default)(async (req, res) => {
    const hospital = await (0, hospitalService_1.getHospitalById)(String(req.params.id));
    apiResponse_1.default.success(res, hospital, 'Hospital fetched successfully');
});
exports.deleteHospitalController = (0, catchAsync_1.default)(async (req, res) => {
    const hospital = await (0, hospitalService_1.deleteHospital)(String(req.params.id));
    apiResponse_1.default.success(res, null, 'Hospital delete successfully');
});
