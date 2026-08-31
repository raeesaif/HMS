"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (handler) => {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
};
exports.default = catchAsync;
