"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse = {
    success: (res, data, message = 'Success', statusCode = 200) => {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    },
    error: (res, message = 'Error', statusCode = 400, errors = null) => {
        res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    },
};
exports.default = apiResponse;
