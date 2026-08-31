"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("colors");
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
// import sanitize from 'mongo-sanitize';
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
// import { xss } from 'express-xss-sanitizer';
const errorController_1 = __importDefault(require("./controllers/errorController"));
const appError_1 = __importDefault(require("./utils/appError"));
const sendResponse_1 = __importDefault(require("./utils/sendResponse"));
const routes = require('./config/Routes');
process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...'.bgRed.white);
    console.error(`${error.name}: ${error.message}`.bgRed.white);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION! Shutting down...'.bgRed.white);
    console.error(String(reason).bgRed.white);
    process.exit(1);
});
const app = (0, express_1.default)();
app.use((req, _res, next) => {
    console.log(`REQUEST RECEIVED: ${req.method} ${req.originalUrl}`.bgCyan);
    next();
});
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// app.use((req, _res, next) => {
//   req.body = sanitize(req.body);
//   req.params = sanitize(req.params);
//   next();
// });
// app.use((req, _res, next) => {
//   const sanitizeObject = (value: unknown): void => {
//     if (!value || typeof value !== 'object') return;
//     for (const key of Object.keys(value)) {
//       const record = value as Record<string, unknown>;
//       const item = record[key];
//       record[key] = typeof item === 'string' ? xss(item) : item;
//       sanitizeObject(record[key]);
//     }
//   };
//   sanitizeObject(req.body);
//   sanitizeObject(req.query);
//   sanitizeObject(req.params);
//   sanitizeObject(req.headers);
//   next();
// });
app.use((0, hpp_1.default)({ whitelist: [] }));
app.use((0, helmet_1.default)());
app.use('/api', (0, express_rate_limit_1.default)({
    limit: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
}));
routes(app);
app.get('/health', (_req, res) => {
    (0, sendResponse_1.default)(res, 200, {
        status: 'success',
        message: 'Hospital backend is running...',
        data: null,
    });
});
app.all('/{*splat}', (req, _res, next) => {
    next(new appError_1.default(404, `Cannot find ${req.method} ${req.originalUrl} on this server`));
});
app.use(errorController_1.default);
exports.default = app;
