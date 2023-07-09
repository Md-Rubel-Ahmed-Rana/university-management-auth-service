import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const facultyRouter = Router();

facultyRouter.get('/', FacultyController.getAllFaculties);
facultyRouter.get('/:id', FacultyController.getSingleFaculty);
facultyRouter.delete('/:id', FacultyController.deleteFaculty);
facultyRouter.patch('/:id', FacultyController.updateFaculty);

export const FacultyRoutes = facultyRouter;
