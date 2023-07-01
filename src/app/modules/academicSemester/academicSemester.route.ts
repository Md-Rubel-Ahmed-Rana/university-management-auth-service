import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const semesterRouter = Router();

semesterRouter.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

semesterRouter.get('/:id', AcademicSemesterController.getSingleSemester);
semesterRouter.get('/', AcademicSemesterController.getAllSemester);

export const SemesterRoutes = semesterRouter;
