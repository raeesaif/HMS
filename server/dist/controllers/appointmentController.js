"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSlotsController = exports.getAppoinmentController = exports.createAppoinmentController = void 0;
const appointmentService_1 = require("../services/appointmentService");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createAppoinmentController = (0, catchAsync_1.default)(async (req, res) => {
    const createdBy = req.user?._id;
    const appoinment = await (0, appointmentService_1.CreateAppoinmentService)(req.body, createdBy);
    apiResponse_1.default.success(res, appoinment, 'Appoinment created successfully', 201);
});
exports.createAppoinmentController = createAppoinmentController;
const getAppoinmentController = (0, catchAsync_1.default)(async (req, res) => {
    const getAppoinment = await (0, appointmentService_1.getAllappoinmentService)();
    apiResponse_1.default.success(res, getAppoinment, 'Appoinment fetch successfully', 201);
});
exports.getAppoinmentController = getAppoinmentController;
const getAvailableSlotsController = (0, catchAsync_1.default)(async (req, res) => {
    const { doctor, date } = req.query;
    if (typeof doctor !== 'string' || typeof date !== 'string') {
        throw new appError_1.default(400, 'Doctor and date are required');
    }
    const slots = await (0, appointmentService_1.getAvailableSlotsService)(doctor, date);
    apiResponse_1.default.success(res, slots, 'Available slots fetched successfully', 200);
});
exports.getAvailableSlotsController = getAvailableSlotsController;
