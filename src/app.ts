/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import routes from './app/routes';
import ApiError from './errors/ApiError';
import globalErrorHandler from './errors/globalErrorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base route
app.get('/', async (req: Request, res: Response) => {
  res.send('<h1>University server is working fine!</h1>');
});

// test route
app.get('/test', (req: Request, res: Response) => {
  throw new ApiError(400, 'From API error');
});
// Application routes
app.use('/api/v1', routes);

// global error handler
app.use(globalErrorHandler);

// 404 not found route error handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
});
export default app;
