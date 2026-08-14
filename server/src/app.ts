import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import 'colors';
import helmet from 'helmet';
import hpp from 'hpp';
// import sanitize from 'mongo-sanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
// import { xss } from 'express-xss-sanitizer';
import globalErrorHandler from '@src/controllers/errorController';
import AppError from '@src/utils/appError';
import sendResponse from './utils/sendResponse';

const routes = require('./config/Routes') as (app: Express) => void;

process.on('uncaughtException', (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...'.bgRed.white);
  console.error(`${error.name}: ${error.message}`.bgRed.white);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('UNHANDLED REJECTION! Shutting down...'.bgRed.white);
  console.error(String(reason).bgRed.white);
  process.exit(1);
});

const app = express();

app.use((req, _res, next) => {
  console.log(`REQUEST RECEIVED: ${req.method} ${req.originalUrl}`.bgCyan);
  next();
});

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

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

app.use(hpp({ whitelist: [] }));
app.use(helmet());

app.use(
  '/api',
  rateLimit({
    limit: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  })
);
routes(app);

app.get('/health', (_req: Request, res: Response) => {
  sendResponse(res, 200, {
    status: 'success',
    message: 'Hospital backend is running...',
    data: null,
  });
});

app.all('/{*splat}', (req: Request, _res: Response, next: NextFunction) => {
  next(
    new AppError(
      404,
      `Cannot find ${req.method} ${req.originalUrl} on this server`
    )
  );
});

app.use(globalErrorHandler);

export default app;
