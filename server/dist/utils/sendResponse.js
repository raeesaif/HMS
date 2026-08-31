"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, statusCode, body) => {
    res.status(statusCode).json(body);
};
exports.default = sendResponse;
