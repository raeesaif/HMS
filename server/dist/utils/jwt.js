"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.loginRefreshToken = exports.loginAccessToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '15d';
const getserect = (name) => {
    const secret = process.env[name];
    if (!secret) {
        throw new Error(`process.env.${name} is not set`);
    }
    return secret;
};
const loginAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, getserect('ACCESS_TOKEN_SECRET'), {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
};
exports.loginAccessToken = loginAccessToken;
const loginRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, getserect('REFRESH_TOKEN_SECRET'), {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        jwtid: crypto_1.default.randomUUID(),
    });
};
exports.loginRefreshToken = loginRefreshToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, getserect('ACCESS_TOKEN_SECRET'));
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, getserect('REFRESH_TOKEN_SECRET'));
};
exports.verifyRefreshToken = verifyRefreshToken;
