/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { SemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/users/user.route';
import ApiError from './errors/ApiError';

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
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', SemesterRoutes);

// global error handler
app.use(globalErrorHandler);
export default app;
