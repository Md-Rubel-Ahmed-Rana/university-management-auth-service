import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FacultyController } from './faculty.controller';

const facultyRouter = Router();

facultyRouter.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.getAllFaculties
);
facultyRouter.get('/:id', FacultyController.getSingleFaculty);
facultyRouter.delete('/:id', FacultyController.deleteFaculty);
facultyRouter.patch('/:id', FacultyController.updateFaculty);

export const FacultyRoutes = facultyRouter;
