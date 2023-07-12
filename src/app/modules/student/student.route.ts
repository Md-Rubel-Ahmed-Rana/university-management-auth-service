import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const studentRouter = Router();

studentRouter.get(
  '/',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getAllStudent
);
studentRouter.get('/:id', StudentController.getSingleStudent);
studentRouter.delete('/:id', StudentController.deleteStudent);
studentRouter.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = studentRouter;
