import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controllers';
import { UserValidation } from './user.validation';

const userRouter = Router();

userRouter.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
userRouter.post(
  '/create-faculty',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createFaculty
);
userRouter.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

export const UserRoutes = userRouter;
